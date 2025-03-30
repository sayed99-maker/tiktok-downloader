let currentVideoData = null;

async function downloadVideo() {
  const url = document.getElementById("videoUrl").value.trim();
  const loading = document.getElementById("loading");
  const resultContainer = document.getElementById("resultContainer");
  const videoPlayer = document.getElementById("videoPlayer");

  if (!url) return alert("الرجاء إدخال الرابط أولاً");

  loading.style.display = "block";
  resultContainer.style.display = "none";

  try {
    // استدعاء السيرفر الخاص بك على Vercel
    const response = await fetch(`https://YOUR_VERCEL_APP.vercel.app/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (!data.videoUrl) throw new Error("لم يتم العثور على الفيديو");

    currentVideoData = { url: data.videoUrl, id: data.videoId };
    videoPlayer.src = currentVideoData.url;
    resultContainer.style.display = "block";
  } catch (error) {
    alert(`حدث خطأ: ${error.message}`);
  } finally {
    loading.style.display = "none";
  }
}

function downloadCurrentVideo() {
  if (!currentVideoData) return alert("لا يوجد فيديو جاهز");
  const a = document.createElement("a");
  a.href = currentVideoData.url;
  a.download = `tiktok_${currentVideoData.id}.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
