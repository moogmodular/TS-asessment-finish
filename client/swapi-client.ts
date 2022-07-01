import axios from 'axios';
import { Film } from '../models/films';
import { Person } from '../models/person';

export const getStarWarsFilms = async (): Promise<Film[]> => {
  const films = await axios.get('https://swapi.dev/api/films');
  return films.data.results;
};

export const getStarWarsPerson = async (url: string): Promise<Person> => {
  const person = await axios.get(url);
  return person.data;
};
