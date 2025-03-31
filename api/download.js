const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const { url } = req.query;
    if (!url?.includes('tiktok.com')) {
      return res.status(400).json({ error: 'رابط تيك توك غير صحيح' });
    }

    // استخدم هذه الواجهة البديلة الأكثر ثباتًا
    const apiUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    
    res.json({
      videoUrl: response.data.videoUrl,
      videoId: response.data.videoId || Date.now().toString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'حدث خطأ في الخادم',
      details: error.message 
    });
  }
};
