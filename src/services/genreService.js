import Http from "./httpService";
import config from "../config.json";
import logger from "./logger";

export async function getGenres() {
  const { data: genres } = await Http.get(`${config.apiEndpoint}/genres`).catch(
    () => {
      logger.log("could not download genres; error:");
      return { data: [] };
    }
  );
  return genres;
}
