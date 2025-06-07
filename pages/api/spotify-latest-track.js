// Next.js API route to fetch the latest track for Marucci from Spotify and latest YouTube video

export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const artistId = '2ur81OwaZ3OwOLYlOJjzJV'; // Marucci's Spotify Artist ID
  const youtubeChannelId = 'UCu_qna2BIiOgNMB1pFzKENg'; // Marucci's YouTube Channel ID
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify credentials not set' });
  }
  if (!youtubeApiKey) {
    return res.status(500).json({ error: 'YouTube API key not set' });
  }

  // 1. Get Spotify access token
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    return res.status(500).json({ error: 'Failed to authenticate with Spotify' });
  }

  // 2. Fetch latest single/album for the artist
  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1`,
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  );
  const albumsData = await albumsRes.json();
  if (!albumsData.items || albumsData.items.length === 0) {
    return res.status(404).json({ error: 'No albums found for this artist' });
  }
  const latestAlbum = albumsData.items[0];

  // 3. Fetch tracks from the latest album
  const tracksRes = await fetch(
    `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  );
  const tracksData = await tracksRes.json();
  if (!tracksData.items || tracksData.items.length === 0) {
    return res.status(404).json({ error: 'No tracks found in this album' });
  }
  const latestTrack = tracksData.items[0];

  // 4. Fetch latest YouTube video
  let youtubeUrl = null;
  try {
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&type=video&maxResults=1&channelId=${youtubeChannelId}&key=${youtubeApiKey}`
    );
    const ytData = await ytRes.json();
    if (ytData.items && ytData.items.length > 0) {
      const videoId = ytData.items[0].id.videoId;
      youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    }
  } catch (e) {
    // If YouTube fetch fails, just leave youtubeUrl as null
    youtubeUrl = null;
  }

  // 5. Return the latest track info and latest YouTube video link
  res.status(200).json({
    name: latestTrack.name,
    album: {
      name: latestAlbum.name,
      images: latestAlbum.images,
    },
    external_urls: latestTrack.external_urls,
    id: latestTrack.id,
    youtube_url: youtubeUrl,
  });
} 