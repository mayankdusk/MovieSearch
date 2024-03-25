let API_KEY = "6d6fa72";
let searchMovie = "Avengers";
const container = document.getElementById("container");
const input = document.getElementById("input");

const loadMovies = () => {
  //   console.log("res");
  searchMovie = input.value || searchMovie;
  let api = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${searchMovie}&page=1`;
  fetch(api)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data.Search);
      if (data.Search == undefined) {
        container.innerHTML = `<h1>No Result found for ${searchMovie} </h1>`;
      } else {
        displayMovies(data.Search);
      }

      return data;
    })
    .catch((err) => console.error(err));
};

const displayMovies = (data) => {
  container.innerHTML = "";
  //   console.log(data);

  data.forEach((ele) => {
    let div = document.createElement("div");
    // console.log(ele);
    div.innerHTML = `
        <h2>${ele.Title}</h2>
        <img src="${ele.Poster}" alt="${ele.Title}"/>
    `;

    container.append(div);
  });
};

loadMovies();

const debounce = (fn, delay) => {
  let timer;

  return () => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

input.addEventListener("input", debounce(loadMovies, 1000));
