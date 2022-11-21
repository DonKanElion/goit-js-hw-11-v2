const URL_BASE = 'https://pixabay.com/api/';
const API_KEY = '31409515-1e05b025820d8f08d6d70aee0';

const options ={
    
}

export function fetchImages(img) {
    return fetch(`${URL_BASE}/?key=${API_KEY}&q=${img}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if(!response.ok || response.status === 404){
            throw new Error('Oops, there is no images with that name');
        }

        console.log(response.json());
        return response.json();
    });
}