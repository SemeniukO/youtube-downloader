let express = require('express');
let server = express();

const ytdl = require('ytdl-core');
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

server.get('/download360', (req, res) => {
  let URL = req.query.URL;

  const download360p = async () => {

    const info = await ytdl.getInfo(URL);
    let contentLength = 0;
    let formats = info.formats;
    let title = 'attachment; filename="' + info.videoDetails.title + '".mp4"';
    for (let i = 0; i < formats.length; i++) {
      if (formats[i].quality === 'medium' && formats[i].audioBitrate) {
        contentLength = formats[i].contentLength
      }
    }

    res.header('Content-Disposition', encode_utf8(title));
    res.header('Content-Length', contentLength);
    res.header('Content-Type', 'video/mp4');
    ytdl(URL, { filter: format => format.quality === "medium" }).pipe(res);
  }

  download360p();

})


server.get('/download', (req, res) => {
  let URL = req.query.URL;
  getInfoFromUrl(res, URL)

});

const getInfoFromUrl = async (res, URL) => {
  try {
    const info = await ytdl.getInfo(URL);

    let thumbnail_url = info.player_response.videoDetails.thumbnail.thumbnails[0].url;
    thumbnail_url = info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
    let formats = info.formats;
    let video = [];

    for (let i = 0; i < formats.length; i++) {
      if (formats[i].audioBitrate != null && formats[i].qualityLabel != null) {
        video.push(formats[i])
      }
    }

    res.json({
      title: info.videoDetails.title,
      thumbnail: thumbnail_url,
      time: info.videoDetails.lengthSeconds,
      video: video,
      url: URL
    })
  } catch (err) {
    res.json({ error: 'video ID not fou' })
  }
}

server.listen(3001, () => {
  console.log('Server Works !!! At port 3001');
});
