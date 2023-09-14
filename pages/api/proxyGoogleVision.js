// pages/api/proxyGoogleVision.js
import axios from 'axios';

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const imageBase64 = req.body.image;
    const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestPayload = {
        requests: [
            {
                image: { content: imageBase64 },
                features: [{ type: 'LABEL_DETECTION', maxResults: 50 }],
            },
        ],
    };

    try {
        const { data } = await axios.post(url, requestPayload);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Error analyzing image' });
    }
};
