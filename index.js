const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('TikTok Downloader Proxy is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});