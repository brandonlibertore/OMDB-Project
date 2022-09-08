
let movies;
let currentPage = 1;
let moviesSlice;

async function searchMovie(event){
    currentPage = 1
    const promise = await fetch(`https://omdbapi.com/?apikey=60806666&s=${event.target.value}`)
    movies = await promise.json()
    renderMovie(movies.Search)
}

function renderMovie(movies){
    const moviesWrapper = document.querySelector(".movies")
    moviesWrapper.innerHTML = ""
    moviesWrapper.innerHTML += movies.map((movie) => {
        return `<div class="movie">
            <figure class="poster">
                <img class="poster__img" src="${movie.Poster}" alt="">
            </figure>
            <div class="left__align">
                <h3 class="movie__title">${movie.Title}</h3>
                <h3 class="movie__year">${movie.Year}</h3>
                <h3 class="movie__type">${movie.Type}</h3>
            </div>
        </div>`
    }).slice(0,6).join("")
}


function changePageLeft(){
    if (currentPage > 1){
        const nextPage = currentPage 
        currentPage -= 1
        const startIndex = currentPage == 1 ? 0 * 6 : currentPage * 6
        const EndIndex = currentPage == 1 ? 1 * 6 : nextPage * 6
        moviesSlice = movies.Search.slice(startIndex, EndIndex)
        if (moviesSlice.length > 0){
            if (moviesSlice.length > 0){
                const moviesWrapper = document.querySelector(".movies")
                moviesWrapper.innerHTML = ""
                moviesWrapper.innerHTML += moviesSlice.map((movie) => {
                    return `<div class="movie">
                        <figure class="poster">
                            <img class="poster__img" src="${movie.Poster}" alt="">
                        </figure>
                        <div class="left__align">
                            <h3 class="movie__title">${movie.Title}</h3>
                            <h3 class="movie__year">${movie.Year}</h3>
                            <h3 class="movie__type">${movie.Type}</h3>
                        </div>
                    </div>`
                }).slice(0,6).join("")
            }
        }
    }
}


function changePageRight(){
    if (currentPage >= 1){
        const lastPage = currentPage
        const startIndex = lastPage * 6
        const EndIndex = (currentPage + 1) * 6
        const moviesWrapper = document.querySelector(".movies")
        moviesSlice = movies.Search.slice(startIndex, EndIndex)
        if (moviesSlice.length > 0){
            currentPage += 1
            moviesWrapper.innerHTML = ""
            moviesWrapper.innerHTML += moviesSlice.map((movie) => {
                return `<div class="movie">
                    <figure class="poster">
                        <img class="poster__img" src="${movie.Poster}" alt="">
                    </figure>
                    <div class="left__align">
                        <h3 class="movie__title">${movie.Title}</h3>
                        <h3 class="movie__year">${movie.Year}</h3>
                        <h3 class="movie__type">${movie.Type}</h3>
                    </div>
                </div>`
            }).join("")
        }
    }
}

function filterMovies(event){
    const sort = event.target.value
    if (sort == "ASC_ALP"){
        const movieSort = movies.Search
        movieSort.sort((a, b) => (a.Title > b.Title) ? 1 : -1)
        renderMovie(movieSort)
    }
    else if (sort == "DESC_ALP"){
        const movieSort = movies.Search
        movieSort.sort((a, b) => (a.Title > b.Title) ? -1 : 1)
        renderMovie(movieSort)
    }
    else if (sort == "ASC_YEAR"){
        const movieSort = movies.Search
        movieSort.sort((a, b) => (a.Year > b.Year) ? 1 : -1)
        renderMovie(movieSort)
    }
    else{
        const movieSort = movies.Search
        movieSort.sort((a, b) => (a.Year > b.Year) ? -1 : 1)
        renderMovie(movieSort)
    }
}