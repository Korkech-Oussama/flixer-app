const global  = {
   currentPage:  window.location.pathname,
   search:{
        type:'',
        term:'',
        page:1,
        totalPages:1,
        totalResults:0,
   },
   api:{
       key:'1812d50e38ebc8692638634e2236890b',
       api_url:'https://api.themoviedb.org/3/' 
   }
}

// display movie Details
    async function displayMovieDetails() {
        const params = new URLSearchParams(window.location.search)
        const MovieId = params.get('id')
        const movie = await fetchApiData(`movie/${MovieId}`)
        //display backdro image 
        console.log(movie)
        
        const wraper = document.getElementById('movie-details')
        wraper.innerHTML = `
        <div class="details-top">
            <div>
                ${
                   movie.poster_path ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />  `
                }
            </div>
            <div>
                <h1>${movie.title}</h1>
                <p>
                <i class="fas fa-star text-primary"></i>
                ${parseFloat(movie.vote_average.toFixed(2))} / 10
                </p>
                <p>${movie.vote_count} VOTED</p>
                <p class="text-muted">Release Date : ${movie.release_date}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                </br>
                ${
                    movie.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('')}
                </ul>
                <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> ${movie.budget!== 0 ?'$'+movie.budget.toLocaleString('en-US'): 'Budget Not Provided'}</li>
                <li><span class="text-secondary">Revenue:</span> ${movie.revenue !== 0 ?'$'+movie.revenue.toLocaleString('en-US'):'Revenue Not Provided'}</li>
                <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
                <li><span class="text-secondary">Status:</span> ${movie.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${movie.production_companies.map((company) => company.name).join('&nbsp;&nbsp; , &nbsp;&nbsp;')}</div>
        </div>
        
        `
        diplayBackgroundImage('movie',movie.backdrop_path)
    }

// display  Popular Movies 

async function displayPopularMovies() {
    const {results} = await fetchApiData('movie/popular')
    const wraper = document.getElementById('popular-movies')
    results.forEach((movie) =>{
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
                <a href="movie-details.html?id=${movie.id}">
                ${
                   movie.poster_path ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />  `
                }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                    <small class="text-muted">${movie.release_date}</small>
                    </p>
                </div>
        `
        wraper.appendChild(div)
    })
}
//display tv Show details 

async function displayTvShowDetails() {
    const params = new URLSearchParams(window.location.search)
    const tv_id = params.get('id')
    const tvShow = await fetchApiData(`tv/${tv_id}`)
    console.log(tvShow)
    const wraper = document.getElementById('show-details')
    wraper.innerHTML = `
        <div class="details-top">
            <div>
                ${
                   tvShow.poster_path ? `<img
                    src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />`
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />  `
                }
            </div>
            <div>
                <h1>${tvShow.name}</h1>
                <p>
                <i class="fas fa-star text-primary"></i>
                ${parseFloat(tvShow.vote_average.toFixed(2))} / 10
                </p>
                <p>${tvShow.vote_count} VOTED</p>
                <p class="text-muted">Release Date : ${tvShow.first_air_date}</p>
                <p>${tvShow.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                </br>
                ${
                    tvShow.genres
                    .map((genre) => `<li>${genre.name}</li>`)
                    .join('')
                    }
                </ul>
                <a href="${tvShow.homepage?tvShow.homepage:'#'}" target="_blank" class="btn">Visit tvShow Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>tvShow Info</h2>
            <ul>
                <li><span class="text-secondary">Number Of Episodes:</span> ${tvShow.number_of_episodes}</li>
                <li><span class="text-secondary">Number Of Seasons:</span> ${tvShow.number_of_seasons}</li>
                <li><span class="text-secondary">Last Episode To Air:</span> ${tvShow.last_air_date}</li>
                <li><span class="text-secondary">Status:</span> ${tvShow.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${tvShow.production_companies.map((company) => company.name).join('&nbsp;&nbsp; , &nbsp;&nbsp;')}</div>
        </div>
    
    `
    diplayBackgroundImage('show',tvShow.backdrop_path)
}


// display Popular Tv shows

async function displayPopularTvShows(){
    const {results} = await fetchApiData('tv/popular')
    const wraper = document.getElementById('popular-shows')
    results.forEach((tvShow) =>{
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
                <a href="tv-details.html?id=${tvShow.id}">
                ${
                   tvShow.poster_path ? `<img
                    src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />`
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${tvShow.name}"
                    />  `
                }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${tvShow.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">${tvShow.first_air_date}</small>
                    </p>
                </div>
        
        `
        wraper.appendChild(div)
    })
}



// fetch api data 

async function fetchApiData(endPoint) {
    const API_KEY = global.api.key 
    const API_URL = global.api.api_url
    showSpinner()
    const res = await fetch(`${API_URL}${endPoint}?api_key=${API_KEY}&include_adult=true&language=en-US`)
    const data = await res.json()
    hideSpinner()
    return data;
}
// search api data 

async function searchApiData() {
    const API_KEY = global.api.key 
    const API_URL = global.api.api_url
    showSpinner()
    const res = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&include_adult=true&language=en-US&query=${global.search.term}&page=${global.search.page}`)
    const data = await res.json()
    hideSpinner()
    return data;
}


// hightlight Active links 

function hightlightActiveLink(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) =>{
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
}
// display background Image 
function diplayBackgroundImage(type,path){
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`
    overlayDiv.style.backgroundSize = 'cover'
    overlayDiv.style.backgroundPosition = 'center'
    overlayDiv.style.backgroundRepeat = 'no-repeat'
    overlayDiv.style.height = '100vh'
    overlayDiv.style.width = '100vw'
    overlayDiv.style.position = 'absolute'
    overlayDiv.style.top = '0'
    overlayDiv.style.zIndex = '-1'
    overlayDiv.style.opacity = '0.2'

    if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv)
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv)
    }
}

// display slider 
async function displaySlider() {
    const {results} = await fetchApiData('movie/now_playing')
    const slide_wrapper = document.querySelector('.swiper-wrapper')
    results.forEach(movie =>{
        const div = document.createElement('div')
        div.classList.add('swiper-slide')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              ${
                   movie.poster_path ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                   : `<img
                    src="../images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                    />  `
                }
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        
        `
        slide_wrapper.appendChild(div)
    });
    initSwiper()
}

// initializing swiper 

function initSwiper(){
    const swiper = new Swiper('.swiper',{
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode:true,
    loop:true,
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
        pauseOnMouseEnter: true,
    }
    ,
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        500: {
        slidesPerView: 1,
        spaceBetween: 20
        },
        // when window width is >= 480px
        600: {
        slidesPerView: 2,
        spaceBetween: 30
        },
        // when window width is >= 640px
        700: {
        slidesPerView: 3,
        spaceBetween: 40
        },
        1200: {
        slidesPerView: 4,
        spaceBetween: 40
        }
    }
    })

}
// search function
async function search(){
    const params = new URLSearchParams(window.location.search)
    global.search.type = params.get('type')
    global.search.term = params.get('search-term')
    
    if(global.search.term !== '' && global.search.term !== null){
        // make request and display movies
        const {results,total_pages,total_results,page} = await searchApiData()
        global.search.page = page ;
        global.search.totalPages = total_pages ;
        global.search.totalResults = total_results ;

        if(results.length === 0){
            showAlert('no results found')
        }
        displaySearchResults(results)
    }else{
        showAlert('Please enter a term')
    }
}

// display search results
function displaySearchResults(results){
        document.getElementById('search-results').innerHTML = ``
        document.getElementById('search-results-heading').innerHTML = ``
        document.getElementById('pagination').innerHTML = ``
        results.forEach(result =>{
            const div = document.createElement('div')
            div.classList.add('card')
            div.innerHTML = `
                    <a href="${global.search.type}-details.html?id=${result.id}">
                    ${
                    result.poster_path ? `<img
                        src="https://image.tmdb.org/t/p/w500${result.poster_path}
                        class="card-img-top"
                        alt="${global.search.type === 'movie'? result.title:result.name}"
                        />`
                    : `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${global.search.type === 'movie'? result.title:result.name}"
                        />  `
                    }
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${global.search.type === 'movie'? result.title:result.name}</h5>
                        <p class="card-text">
                        <small class="text-muted">${global.search.type === 'movie'? result.release_date:result.first_air_date }</small>
                        </p>
                    </div>
            `
            document.getElementById('search-results-heading').innerHTML =
            `
                <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
            `
            document.getElementById('search-results').appendChild(div)
        })
        displayPagination()
    
}
// display pagination function 
function displayPagination(){
    const div = document.createElement('div')
    div.classList.add('pagination')
    div.innerHTML =`
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">${global.search.page} of ${global.search.totalPages} Pages</div>
    `
    document.getElementById('pagination').appendChild(div)

    // disable prev button if the user on the first page
    if(global.search.page === 1){
        document.getElementById('prev').disabled = true
    }
    // disable next button if the user on the last page
    if(global.search.page === global.search.totalPages){
        document.getElementById('next').disabled = true
    }
    // Next page
    document.getElementById('next').addEventListener('click',async () =>{
        global.search.page++;
        const {results, total_pages} = await searchApiData()
        displaySearchResults(results)
    })
    // Prev Page 
    document.getElementById('prev').addEventListener('click',async () =>{
        global.search.page--;
        const {results, total_pages} = await searchApiData()
        displaySearchResults(results)
    })
}

// the Alert FUnction 

function showAlert(message,className='error'){
    const alertEl = document.createElement('div')
    alertEl.classList.add('alert',className)
    alertEl.appendChild(document.createTextNode(message))
    document.getElementById('alert').appendChild(alertEl)
    setTimeout(() => alertEl.remove('alert'),3000)
}

// show spinner 
 function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
 }
// hide spinner 
 function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
 }

// Init App 

function init(){
    switch(global.currentPage){
        case '/index.html':
        case '/':
            displaySlider()
            displayPopularMovies()
            break
        case '/movie-details.html':
            displayMovieDetails()
            break
        case '/shows.html':
            displayPopularTvShows()
            break
        case '/tv-details.html':
            displayTvShowDetails()
            break
        case '/search.html':
            search()
            break
    }

    hightlightActiveLink();
}

document.addEventListener('DOMContentLoaded',init)