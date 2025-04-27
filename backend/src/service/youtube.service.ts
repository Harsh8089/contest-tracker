// i/p: youtube playlist url
// o/p: video url

async function searchYouTubeVideos(playListURL: string) {
  try {
    const response = await fetch(playListURL);
    const html = await response.text();
    
    const ytInitialDataRegex = /var ytInitialData = (.+?);<\/script>/;
    const match = html.match(ytInitialDataRegex);
    
    if(match && match[1]) {
      const ytInitialData = JSON.parse(match[1]);
      var videos = [];

      const contents = ytInitialData
                      .contents
                      .twoColumnBrowseResultsRenderer
                      .tabs[0]
                      .tabRenderer
                      .content
                      .sectionListRenderer
                      .contents[0]
                      .itemSectionRenderer
                      .contents[0]
                      .playlistVideoListRenderer.contents;
      
      for(const item of contents) {
        if(item.playlistVideoRenderer) {
          const { videoId, title } = item.playlistVideoRenderer;
          videos.push({
            id: videoId,
            title: title.runs[0].text,
            url: `https://www.youtube.com/watch?v=${videoId}`
          });
        }
      }
      
      return videos;
    }
    return [];
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
}

// searchYouTubeVideos("https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB").then(videos => {
//   for(let i = 0; i < videos.length; i++) {
//     console.log(videos[i])
//   }
// })
