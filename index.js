import cardContainer from "./card.js";

const parentElement = document.querySelector(".main");
const seachInput = document.querySelector(".input");
const movieRatings = document.querySelector("#rating-select");
const movieGenres = document.querySelector("#genre-select");

let searchValue = "";
let ratings = 0;
let genreArray=[]
let genre = "";
let filteredArrOfMovies = [];

const URL = "https://movies-app.prakashsakari.repl.co/api/movies";

let getMovies = async (url) => {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(`error found` + error);
  }
};
let movies = await getMovies(URL);
// console.log(movies);

function getGenreArray(){
  let genreArrayOfArray=movies.map(movie=>movie.genre.split(","))
  let temp=[]
  for(let arr of genreArrayOfArray){
     temp=[...temp,...arr]
  }
  let genreArr=temp.reduce((acc,cur)=>acc.includes(cur)?acc:[...acc,cur],[])
  return genreArr
}

function getFilteredData(){
    // console.log(movies)
    filteredArrOfMovies=searchValue?.trim().length>0?movies.filter(movie => searchValue.toLowerCase() === movie.name.toLowerCase()||
                  searchValue===movie.director_name.toLowerCase() ||
                  movie.cast_name.toLowerCase().split(",").includes(searchValue)||
                  movie.writter_name.toLowerCase().split(",").includes(searchValue)||
                  movie.genre.toLowerCase().split(",").includes(searchValue))
    : movies;
    if(ratings>0){
        filteredArrOfMovies=searchValue?.trim().length>0?filteredArrOfMovies:movies
        filteredArrOfMovies=filteredArrOfMovies.filter((movie)=>movie.imdb_rating>ratings)
    }
    if(genre){
      filteredArrOfMovies=searchValue?.trim().length>0 || ratings>7 ?filteredArrOfMovies:movies
      filteredArrOfMovies=filteredArrOfMovies.filter((movie)=> movie.genre.split(",").includes(genre))
    }
   return filteredArrOfMovies
}
function handleSearch(event) {
  searchValue = event.target.value;
  console.log(searchValue.toLowerCase());
  filteredArrOfMovies =getFilteredData()
  // console.log(filteredArrOfMovies);
  parentElement.innerHTML = " ";
  parentElement.innerHTML = cardContainer(filteredArrOfMovies);
}

function debounce(callback, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
const debounceInput = debounce(handleSearch, 700);
seachInput.addEventListener("keyup", debounceInput);

function handleRating(event){
    ratings=event.target.value
    filteredArrOfMovies=getFilteredData()
    parentElement.innerHTML=""
    parentElement.innerHTML=cardContainer(filteredArrOfMovies)
}
movieRatings.addEventListener("change",handleRating)


genreArray=getGenreArray()
const createElement = (element) => document.createElement(element)
for (let genre of genreArray) {
  const option = createElement("option");
  option.classList.add("option");
  option.setAttribute("value", genre);
  option.innerText = genre;
  movieGenres.appendChild(option);
}

function handlegenre(event){
  genre= event.target.value
  // console.log(genre)
  filteredArrOfMovies=getFilteredData()
  parentElement.innerHTML=""
  parentElement.innerHTML= cardContainer(filteredArrOfMovies)
}
movieGenres.addEventListener("change",handlegenre)
parentElement.innerHTML = cardContainer(movies);
