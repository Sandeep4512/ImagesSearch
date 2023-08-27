 const accessKey =  'yINSFjP5JUUMgnRVrW9TJaHogqTcyLTelDpQA3k5_QY';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadBtn = document.querySelector('.loadBtn');
 let page = 1;

 // function to fetch images query Unsplash API 
const fetchImages = async (query) => {
     
     imagesContainer.innerHTML = "";
     
     const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=1&client_id=${accessKey}`;

     const response = await fetch(url);
     const data =  await response.json();

   //   console.log(data.results);
     data.results.forEach(photo =>{
       
        // creating images div 
        const imagesElement = document.createElement('div');
        imagesElement.classList.add('imageDiv');
        imagesElement.innerHTML = `<img src ="${photo.urls.regular}" />` ;

        // create overlay div 
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        // creating overlay text
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${ photo.alt_description}`;

        overlayElement.appendChild(overlayText);

        imagesElement.appendChild(overlayElement);
        imagesContainer.appendChild(imagesElement);
     });

 }


// adding event listner to search form  form 

searchForm.addEventListener('submit',(e) =>{ 
    e.preventDefault();
     const inputText = searchInput.value.trim();
     if(inputText !== ''){
        
        fetchImages(inputText);
     }
     else{
        imagesContainer.innerHTML = `<h2>Please enter a Search query.</h2>`
     }
});

