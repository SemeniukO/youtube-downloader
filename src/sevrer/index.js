let express = require('express');
let server = express();
const ytdl = require('ytdl-core');

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

server.get('/download360', (req, res) => {
  let URL = req.query.URL;
  ytdl.getInfo(URL, (err, info) => {
    if (err) {
      throw err,
      res.json({ error: 'some error' })
    }

    let contentLength = null;
    let formats = info.formats;
    let title = 'attachment; filename="' + info.title + '".mp4"';
    for (let i = 0; i < formats.length; i++) {
      if (formats[i].quality == 'medium' && formats[i].audioBitrate) {
        contentLength = formats[i].contentLength
      }
    }

    res.header('Content-Disposition', encode_utf8(title));
    res.header('Content-Length', contentLength);
    res.header('Content-Type', 'video/mp4');
    ytdl(URL, { filter: format => format.quality === "medium" }).pipe(res);
  })
})


server.get('/download', (req, res) => {
  let URL = req.query.URL;
  ytdl.getInfo(URL, (err, info) => {
    if (err) {
      throw err,
      res.json({error:'some error'})
    }    
    let thumbnail_url = info.player_response.videoDetails.thumbnail.thumbnails[0].url;
        thumbnail_url = info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
    let formats = info.formats;
    let video = [];
    let audio = [];
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  
    for (let i=0;i<formats.length;i++){
        if (formats[i].audioBitrate!=null && formats[i].qualityLabel!=null){
          video.push(formats[i])
        }
        if (formats[i].audioBitrate!=null && formats[i].qualityLabel==null){
          audio.push(formats[i])
        }
    }

    res.json(
      {
        title: info.title,
        thumbnail: thumbnail_url,
        time:info.length_seconds,
        video:video,
        url:info.video_url,
        //audio:audio,
        //info:[audioFormats,audioFormats.length],
        //fullInfo:info
      }
    )
  })
});


server.listen(3001, () => {
  console.log('Server Works !!! At port 3001');
});
