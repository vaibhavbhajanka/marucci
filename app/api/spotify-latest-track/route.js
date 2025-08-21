export const revalidate = 60;
export const runtime = 'nodejs';

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const artistId = '2ur81OwaZ3OwOLYlOJjzJV';
  const youtubeChannelId = 'UCu_qna2BIiOgNMB1pFzKENg';

  if (!clientId || !clientSecret) {
    return new Response(JSON.stringify({ error: 'Spotify credentials not set' }), { status: 500 });
  }
  if (!youtubeApiKey) {
    // YouTube is optional for this response; return without youtube if missing
  }

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: 'grant_type=client_credentials',
      // Token endpoint shouldn't be cached
      cache: 'no-store',
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return new Response(JSON.stringify({ error: 'Failed to authenticate with Spotify' }), { status: 500 });
    }

    const albumsRes = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        next: { revalidate },
      }
    );
    const albumsData = await albumsRes.json();
    if (!albumsData.items || albumsData.items.length === 0) {
      return new Response(JSON.stringify({ error: 'No albums found for this artist' }), { status: 404 });
    }
    const latestAlbum = albumsData.items[0];

    const tracksRes = await fetch(
      `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
        next: { revalidate },
      }
    );
    const tracksData = await tracksRes.json();
    if (!tracksData.items || tracksData.items.length === 0) {
      return new Response(JSON.stringify({ error: 'No tracks found in this album' }), { status: 404 });
    }
    const latestTrack = tracksData.items[0];

    let youtubeUrl = null;
    try {
      if (youtubeApiKey) {
        const ytRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&type=video&maxResults=1&channelId=${youtubeChannelId}&key=${youtubeApiKey}`,
          { next: { revalidate } }
        );
        const ytData = await ytRes.json();
        if (ytData.items && ytData.items.length > 0) {
          const videoId = ytData.items[0].id.videoId;
          youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }
      }
    } catch {
      youtubeUrl = null;
    }

    const body = {
      name: latestTrack.name,
      album: {
        name: latestAlbum.name,
        images: latestAlbum.images,
      },
      external_urls: latestTrack.external_urls,
      id: latestTrack.id,
      youtube_url: youtubeUrl,
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error' }), { status: 500 });
  }
}


