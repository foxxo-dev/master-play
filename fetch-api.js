import axios from 'axios';

async function search(query) {
  const options = {
    method: 'GET',
    url: 'https://spotify81.p.rapidapi.com/search',
    params: {
      q: query,
      type: 'multi',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
    headers: {
      'X-RapidAPI-Key': '6f0e580618msh62f4d72ea78d41dp1f48b3jsnd8199558d9bf',
      'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    response.data = {};
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getDownloadSong(id) {
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
    params: {
      track: id
    },
    headers: {
      'X-RapidAPI-Key': '6f0e580618msh62f4d72ea78d41dp1f48b3jsnd8199558d9bf',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.youtubeVideo.audio[0];
  } catch (error) {
    console.error(error);
  }
}
export { search, getDownloadSong };
