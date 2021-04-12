import Http from "./httpService";
import config from "../config.json";
import logger from "./logger";

const apiEndpoint = `${config.apiEndpoint}/movies`;

export async function getMovies() {
  const { data: movies } = await Http.get(apiEndpoint).catch(() => {
    logger.log("could not download genres; error:");
    return { data: [] };
  });
  return movies;
}

export async function getMovie(id) {
  const movies = await getMovies();
  const movie = movies.find((m) => m._id === id);
  return movie ? movie : null;
}

export async function saveMovie(movie) {
  let body = { ...movie };
  let promise;
  delete body._id; // backend service expects a movie without id
  if (movie._id) {
    promise = Http.put(`${apiEndpoint}/${movie._id}`, body);
  } else {
    console.log("body:", body);
    promise = Http.post(apiEndpoint, body);
  }
  return await promise.catch(() => {
    logger.log("could not save movie");
    return null;
  });
}

export async function deleteMovie(id) {
  return await Http.delete(apiEndpoint + "/" + id).catch(() => {
    logger.log("could not delete Movie");
    return null;
  });
}
