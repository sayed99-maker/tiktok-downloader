const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: "رابط غير صحيح" });
  }

  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    res.json({
      videoUrl: response.data.data.play,
      videoId: response.data.data.id
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ في السيرفر" });
  }
};
