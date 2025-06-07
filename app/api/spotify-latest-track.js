// Next.js API route to fetch the latest track for Marucci from Spotify

export default async function handler(req, res) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const artistId = '2ur81OwaZ3OwOLYlOJjzJV'; // Marucci's Spotify Artist ID

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify credentials not set' });
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
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1&order=release_date&sort=desc`,
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

  // 4. Return the latest track info
  res.status(200).json({
    name: latestTrack.name,
    album: {
      name: latestAlbum.name,
      images: latestAlbum.images,
    },
    external_urls: latestTrack.external_urls,
    id: latestTrack.id,
  });
} 