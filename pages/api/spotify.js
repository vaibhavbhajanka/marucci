
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { artistId } = req.query;

    if (!artistId) {
        return res.status(400).json({ error: 'Artist ID is required' });
    }

    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

    try {
        // Fetch the latest albums or singles
        const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1&order=release_date&sort=desc`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!albumsResponse.ok) {
            throw new Error('Failed to fetch albums from Spotify');
        }

        const albumsData = await albumsResponse.json();

        if (albumsData.items.length === 0) {
            return res.status(404).json({ error: 'No albums found for this artist' });
        }

        const latestAlbum = albumsData.items[0]; // Get the latest album or single

        // Fetch tracks from the latest album
        const tracksResponse = await fetch(
            `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!tracksResponse.ok) {
            throw new Error('Failed to fetch tracks from Spotify');
        }

        const tracksData = await tracksResponse.json();

        if (tracksData.items.length === 0) {
            return res.status(404).json({ error: 'No tracks found in this album' });
        }

        const latestTrack = tracksData.items[0]; // Get the first track from the latest album

        res.status(200).json({
            name: latestTrack.name,
            album: {
                name: latestAlbum.name,
                images: latestAlbum.images,
            },
            external_urls: latestTrack.external_urls,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//
// pages/api/spotify.js
// import { refreshToken, currentToken } from '@/app/spotifyAuth';
//
// export default async function handler(req, res) {
//     if (req.method !== "GET") {
//         res.setHeader("Allow", ["GET"]);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//
//     const { artistId } = req.query;
//
//     if (!artistId) {
//         return res.status(400).json({ error: "Artist ID is required" });
//     }
//
//     try {
//         currentToken.load();
//
//         // Refresh token if expired
//         if (currentToken.isExpired()) {
//             const refreshedToken = await refreshToken();
//             currentToken.save(refreshedToken);
//         }
//
//         const accessToken = currentToken.access_token;
//         const albumsResponse = await fetch(
//             `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1&order=release_date&sort=desc`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (!albumsResponse.ok) {
//             throw new Error("Failed to fetch albums from Spotify");
//         }
//
//         const albumsData = await albumsResponse.json();
//
//         if (albumsData.items.length === 0) {
//             return res.status(404).json({ error: "No albums found for this artist" });
//         }
//
//         const latestAlbum = albumsData.items[0];
//
//         const tracksResponse = await fetch(
//             `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (!tracksResponse.ok) {
//             throw new Error("Failed to fetch tracks from Spotify");
//         }
//
//         const tracksData = await tracksResponse.json();
//
//         if (tracksData.items.length === 0) {
//             return res.status(404).json({ error: "No tracks found in this album" });
//         }
//
//         const latestTrack = tracksData.items[0];
//
//         res.status(200).json({
//             name: latestTrack.name,
//             album: {
//                 name: latestAlbum.name,
//                 images: latestAlbum.images,
//             },
//             external_urls: latestTrack.external_urls,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// pages/api/spotify.js
// import { useSpotifyAuth } from '@/app/spotifyAuth'; // Import the auth logic
//
// export default async function handler(req, res) {
//     if (req.method !== 'GET') {
//         res.setHeader('Allow', ['GET']);
//         return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//
//     const { artistId } = req.query;
//
//     if (!artistId) {
//         return res.status(400).json({ error: 'Artist ID is required' });
//     }
//
//     try {
//         // Get the access token using PKCE flow
//         const accessToken = await useSpotifyAuth();
//         console.log('Access token:', accessToken);
//
//         // Fetch the latest albums or singles for the artist
//         const albumsResponse = await fetch(
//             `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=single,album&market=US&limit=1&order=release_date&sort=desc`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (!albumsResponse.ok) {
//             throw new Error('Failed to fetch albums from Spotify');
//         }
//
//         const albumsData = await albumsResponse.json();
//
//         if (albumsData.items.length === 0) {
//             return res.status(404).json({ error: 'No albums found for this artist' });
//         }
//
//         const latestAlbum = albumsData.items[0]; // Get the latest album or single
//
//         // Fetch tracks from the latest album
//         const tracksResponse = await fetch(
//             `https://api.spotify.com/v1/albums/${latestAlbum.id}/tracks?market=US&limit=1`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//
//         if (!tracksResponse.ok) {
//             throw new Error('Failed to fetch tracks from Spotify');
//         }
//
//         const tracksData = await tracksResponse.json();
//
//         if (tracksData.items.length === 0) {
//             return res.status(404).json({ error: 'No tracks found in this album' });
//         }
//
//         const latestTrack = tracksData.items[0]; // Get the first track from the latest album
//
//         // Respond with the latest track details
//         res.status(200).json({
//             name: latestTrack.name,
//             album: {
//                 name: latestAlbum.name,
//                 images: latestAlbum.images,
//             },
//             external_urls: latestTrack.external_urls,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

