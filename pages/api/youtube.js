// // pages/api/youtube.js
// export default async function handler(req, res) {
//     const { channelId } = req.query;
//
//     if (!channelId) {
//         return res.status(400).json({ error: 'Channel ID is required' });
//     }
//
//     const apiKey = process.env.YOUTUBE_API_KEY;
//
//     try {
//         const response = await fetch(
//             `https://www.googleapis.com/youtube/v3/search?order=viewCount&part=snippet&type=video&maxResults=10&channelId=${channelId}&key=${apiKey}`
//         );
//         const data = await response.json();
//
//         if (data.error) {
//             return res.status(500).json({ error: data.error.message });
//         }
//         console.log(data.items[0].snippet.thumbnail);
//         const videos = data.items.map(item => {
//             const thumbnailUrl = item.snippet.thumbnails.maxres
//                 ? item.snippet.thumbnails.maxres.url
//                 : item.snippet.thumbnails.high.url;
//
//             return {
//                 videoId: item.id.videoId,
//                 title: item.snippet.title,
//                 thumbnail: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
//             };
//         });
//
//         res.status(200).json(videos);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch videos' });
//     }
// }

// pages/api/youtube.js
let cachedData = null;
let lastFetchTime = null;

export default async function handler(req, res) {
    const { channelId } = req.query;

    if (!channelId) {
        return res.status(400).json({ error: 'Channel ID is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    // Check if data is cached and the cache is less than 24 hours old
    const now = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (cachedData && lastFetchTime && now - lastFetchTime < oneDayInMillis) {
        console.log('Returning cached data');
        return res.status(200).json(cachedData);
    }

    // If no cached data or the cache is older than 24 hours, fetch fresh data
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?order=viewCount&part=snippet&type=video&maxResults=10&channelId=${channelId}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const videos = data.items.map(item => {
            const thumbnailUrl = item.snippet.thumbnails.maxres
                ? item.snippet.thumbnails.maxres.url
                : item.snippet.thumbnails.high.url;

            return {
                videoId: item.id.videoId,
                title: item.snippet.title,
                thumbnail: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
            };
        });

        // Cache the response and update the last fetch time
        cachedData = videos;
        lastFetchTime = now;

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
}
