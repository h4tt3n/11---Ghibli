
// Consts
const baseUrl = 'https://ghibliapi.herokuapp.com/';
const filmsUrl = baseUrl + `films`;
const peopleUrl = baseUrl + `people`;
const vehicleUrl = baseUrl + `vehicles`;
const tomatoeUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/757px-Rotten_Tomatoes.svg.png';

// Bootstrap boilerplate
const options = {
    backdrop: true,
    keyboard: false,
    focus: false
};

const movieModalElement = document.querySelector('#movie-modal');
const movieModal = new bootstrap.Modal(movieModalElement, options);

const modalContent = movieModalElement.querySelector('.modal-content');
const modalHeader = modalContent.querySelector('.modal-header');
const modalTitle = modalContent.querySelector('.modal-title');
const modalBody = modalContent.querySelector('.modal-body');


// Index page
const app = document.querySelector('#app');
const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

fetch(filmsUrl)
.then(blob => blob.json())
.then(movies => {
        movies.forEach(createMovieCard);
    })
    .catch(console.error);


// Functions
function createTomatoeRow(n, modal){
    
    const tomatoeRowDiv = document.createElement('div');
    tomatoeRowDiv.setAttribute('class', 'tomatoerow');

    for (let i = 0; i < n; i++) {
        
        const tomatoeDiv = document.createElement('div');
        tomatoeDiv.setAttribute('class', 'tomatoe');

        const tomatoeImg = document.createElement('img');
        tomatoeImg.src = tomatoeUrl;
        
        tomatoeDiv.appendChild(tomatoeImg);
        tomatoeRowDiv.appendChild(tomatoeDiv);
    }

    modal.appendChild(tomatoeRowDiv);
}

function createMovieCard(movie){

    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');

    const titleDiv = document.createElement('h1');
    titleDiv.textContent = movie.title;

    const bannerImg = document.createElement('img');
    bannerImg.src = movie.movie_banner;

    const bannerDiv = document.createElement('div');
    bannerDiv.setAttribute('class', 'movieImage');

    container.appendChild(cardDiv);
    cardDiv.appendChild(titleDiv);
    bannerDiv.appendChild(bannerImg);
    cardDiv.appendChild(bannerDiv);

    cardDiv.addEventListener('click', _ => createMovieDetailsModal(movie));
}

function createMovieDetailsModal(movie){
    
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'movieTitle');
    modalTitle.textContent = `${movie.title} ( ${movie.original_title} )`;

    const bannerImg = document.createElement('img');
    bannerImg.src = movie.image;

    const bannerDiv = document.createElement('div');
    bannerDiv.setAttribute('class', 'movieBanner');
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.setAttribute('class', 'movieDescription');
    descriptionDiv.textContent = `"${movie.description}"`;

    const releaseDiv = document.createElement('div');
    releaseDiv.setAttribute('class', 'movieFacts');
    releaseDiv.textContent = `Released in ${movie.release_date}`;

    const directorDiv = document.createElement('div');
    directorDiv.setAttribute('class', 'movieFacts');
    directorDiv.textContent = `Directed by ${movie.director}`;

    const rtDiv = document.createElement('div');
    rtDiv.setAttribute('class', 'movieFacts');
    const score = movie.rt_score/10.0;
    const numTomatoes = (movie.rt_score/20.0).toFixed(0);
    rtDiv.textContent = `Rotten Tomatoes score: ${score} (${numTomatoes} of 5)`;

    modalTitle.appendChild(titleDiv);
    bannerDiv.appendChild(bannerImg);
    modalTitle.appendChild(bannerDiv);
    modalTitle.appendChild(descriptionDiv);
    modalTitle.appendChild(releaseDiv);
    modalTitle.appendChild(directorDiv);
    modalTitle.appendChild(rtDiv);
    
    createTomatoeRow(numTomatoes, modalTitle);

    movieModal.show();
}


// Functions for experiments, not in use
function createMovieDetailsCard(movie){
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    //card.setAttribute('onclick', displayModal);

    const h1 = document.createElement('h1');
    h1.textContent = movie.title

    const logo = document.createElement('img');
    logo.src = movie.movie_banner;

    const p = document.createElement('p');
    //movie.description = movie.description.substring(0, 300);
    p.textContent = `${movie.description}...`

    const p1 = document.createElement('p');
    p1.textContent = `Directed by ${movie.director}`;

    const p2 = document.createElement('p');
    p2.textContent = `Release date: ${movie.release_date}`;

    const p3 = document.createElement('p');
    const score = movie.rt_score/10.0;
    p3.textContent = `Rotten Tomatoes score: ${score}`;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(logo);  
    card.appendChild(p);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);

    createTomatoeRow(movie.rt_score/20.0, card);

    card.addEventListener('click', _ => createMovieDetailsModal(movie));
}

function createPersonCard(person){
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h1 = document.createElement('h1');
    h1.textContent = person.name

    const p1 = document.createElement('p');
    p1.textContent = `Age: ${person.age} Gender: ${person.gender}`

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p1);
}

// fetch(`${baseUrl}people`)
// .then(blob => blob.json())
// .then(people => {
//     people.forEach(createPersonCard);
//     })
//     .catch(console.error);