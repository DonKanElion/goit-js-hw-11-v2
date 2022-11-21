import axios from 'axios';

const axios = require('axios').default;
const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '31409515-1e05b025820d8f08d6d70aee0';

export async function fetchImages(searchQuery, page) {
  const response = await axios.get(
    `${URL_BASE}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  console.log(response.data);
  return response.data;
}