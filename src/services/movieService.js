import Http from "./httpService";
import { apiUrl } from "../config.json";
import logger from "./logger";
import notice from "../components/notificationService";

const apiEndpoint = `${apiUrl}/movies`;

function url(...rest) {
  return rest.reduce((acc, curr) => `${acc}/${curr}`, apiEndpoint);
}

function error(type) {
  notice.error(`ERROR: ${type} movie(s) was not successful`);
  logger.log(`ERROR: ${type} movie(s) was not successful in movieService.jsx`);
}

function success(type) {
  notice.success(`${type} movie(s) was successful`);
}

export async function getMovies() {
  const { data: movies } = await Http.get(apiEndpoint).catch(() => {
    logger.log("could not download genres; error:");
    error("loading");
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
    promise = Http.put(url(movie._id), body);
  } else {
    promise = Http.post(apiEndpoint, body);
  }
  return await promise.then(
    (value) => {
      success("saving");
      return value;
    },
    (value) => {
      error("saving");
      return null;
    }
  );
}

export async function deleteMovie(id) {
  return await Http.delete(url(id)).then(
    (value) => {
      success("deleting");
      return value;
    },
    (value) => {
      error("deleting");
      return null;
    }
  );
}
