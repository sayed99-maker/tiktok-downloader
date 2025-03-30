const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/download', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const response = await axios.get(`https://tikwm.com/api/`, {
      params: {
        url: url,
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Tikwm API' });
  }
});

app.get('/', (req, res) => {
  res.send('TikTok Downloader Proxy is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
