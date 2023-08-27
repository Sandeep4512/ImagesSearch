const accessKey = 'yINSFjP5JUUMgnRVrW9TJaHogqTcyLTelDpQA3k5_QY';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadBtn = document.querySelector('.loadBtn');
let page = 1;

// function to fetch images query Unsplash API 
const fetchImages = async (query, pageNo) => {
   try{

      if (pageNo === 1) {
         imagesContainer.innerHTML = "";
      }
   
      const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
   
      const response = await fetch(url);
      const data = await response.json();
   
      //   console.log(data.results);
      if(data.results.length > 0){
         data.results.forEach(photo => {
   
            // creating images div 
            const imagesElement = document.createElement('div');
            imagesElement.classList.add('imageDiv');
            imagesElement.innerHTML = `<img src ="${photo.urls.regular}" />`;
      
            // create overlay div 
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');
      
            // creating overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;
      
            overlayElement.appendChild(overlayText);
      
            imagesElement.appendChild(overlayElement);
            imagesContainer.appendChild(imagesElement);
         });
      
         if (data.total_page === pageNo) {
            loadBtn.style.display = "none";
         } else {
            loadBtn.style.display = "block";
         }
      }else{
         imagesContainer.innerHTML = `<h2>No images found <h2/>`
      }
     
   
   }

   catch(error){
      imagesContainer.innerHTML = `<h2>${error}images . Please try again later <h2/>`
      if(loadBtn.style.display === "block"){
         loadBtn.style.display ==="none";
      }
   }

}



// adding event listner to search form  form 

searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const inputText = searchInput.value.trim();

   if (inputText !== '') {
      page = 1;
      fetchImages(inputText, page);
   }
   else {
      imagesContainer.innerHTML = `<h2>Please enter a Search query.</h2>`
   }
});

// adding event listner to load more btn 

loadBtn.addEventListener('click', () => {
   fetchImages(searchInput.value.trim(), ++page);
})