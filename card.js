export default function cardContainer(movies) {
  let movieArray = movies.map((movie) => {
       return ` <div class="card shadow">
       <div class="card-image-container">
         <img
           class="card-image"
           src=${movie.img_link}
           alt=${movie.name}
         />
       </div>
       <div class="movie-details">
         <p class="title">${movie.name}</p>
         <p class="genre">Genre:${movie.genre}</p>
         <div class="ratings">
           <div class="star-rating">
             <span class="material-icons-outlined">star</span><span>${movie.imdb_rating}</span>
           </div>
           <p>${movie.duration} mins</p>
         </div>
       </div>
     </div>
       `
  });
  movieArray= movieArray.join("")
  return movieArray
}
