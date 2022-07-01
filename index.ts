import axios from 'axios';
import { getStarWarsFilms, getStarWarsPerson } from './client/swapi-client';
import { FilmWithPeopleNames } from './models/films';
import './style.css';

const resolveFilms = async () => {
  console.log('HELLO');

  const swapiFilms = await getStarWarsFilms();

  const filmsWithPeople = await swapiFilms.map(async (resolvedFilm) => {
    const personsInFilm = resolvedFilm.characters.map(async (characterUrl) => {
      const character = await getStarWarsPerson(characterUrl);
      return character.name;
    });

    return {
      ...resolvedFilm,
      characterNames: await Promise.all(personsInFilm),
    } as FilmWithPeopleNames;
  });

  return await Promise.all(filmsWithPeople);
};

resolveFilms().then((films: FilmWithPeopleNames[]) => {
  const appDiv: HTMLElement = document.getElementById('app');
  const titles = films.map((film) => {
    return `
      <h2>${film.title}</h2>
      <ul>
        ${film.characterNames.map((name) => `<li>${name}</li>`).join(' ')}
      </ul>
    `;
  });

  appDiv.innerHTML = titles.join(' ');
});
