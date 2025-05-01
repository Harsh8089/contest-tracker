import { Platform } from "../types/contest";

// For past contest only
export async function getYoutubeURL(platform: Platform) {
  const playListId = (platform === Platform.CODECHEF)? "PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr" : 
                      (platform === Platform.CODEFORCES)? "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB" : 
                      "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr";

  const ytPlayListURL = `https://www.youtube.com/playlist?list=${playListId}`;
  
  try {
    const response = await fetch(ytPlayListURL);
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
  } catch (error) {
    console.log(error);   
  }
  return [];  
}

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
            title: title.runs[0].text.split(" "),
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

// searchYouTubeVideos("https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr").then(videos => {
//   for(let i = 0; i < 1; i++) {
//     console.log(videos[i])
//   }
// })
