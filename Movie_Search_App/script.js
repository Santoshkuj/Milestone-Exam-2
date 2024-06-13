const searchForm = document.querySelector('form')
const movieContainer = document.querySelector('.Movie-container')
const inputBox = document.querySelector('.inputBox')

const getMovieInfo = async (movie)=>{
    const apiKey = 'ef193596';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data)
    } catch (error) {
        showError('No movie Found')
    }
}

const showMovies = (data)=>{
    movieContainer.innerHTML ='';
    data.Search.forEach(el => {
        const div = document.createElement('div')
        div.className = 'movie'
        div.innerHTML =`<img src="${el.Poster}" alt="moviePoster"/>
        <p>${el.Title}</p>
        <button>Watch Now</button>`
        movieContainer.appendChild(div)
    });
}

function showError(message) {
        movieContainer.innerHTML = `<h2>${message}</h2>`
        movieContainer.classList.add('no-background')
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName){
        getMovieInfo(movieName)
        inputBox.value = ''
    }else{
        showError("Please Enter movie name")
    }
})