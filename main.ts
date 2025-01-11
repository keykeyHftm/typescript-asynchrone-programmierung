import fetch, { Response } from "node-fetch";
import { map, mergeMap } from "rxjs/operators";
import { get } from "./utils";
import {forkJoin, of} from "rxjs";

/*
Read data from https://swapi.py4e.com/api/people/1 (Luke Skywalker)
and dependent data from swapi to return the following object

{
    name: 'Luke Skywalker',
    height: 172,
    gender: 'male',
    homeworld: 'Tatooine',
    films: [
        {
            title: 'A New Hope',
            director: 'George Lucas',
            release_date: '1977-05-25'
        },
        ... // and all other films
    ]
}

Define an interface of the result type above and all other types as well.

*/

interface Person {
  name: string;
  height: string;
  gender: "male" | "female" | "divers";
  homeworld: string;
  films: string[];
}

interface Film{
  title: string;
  director: string;
  release_date: string;
}

export interface PersonInfo {
  name: string;
  height: string;
  gender: "male" | "female" | "divers";
  homeworld: string;
  films: Film[];
}

// Task 1: write a function using promise based fetch api
type PromiseBasedFunction = () => Promise<PersonInfo>;
export const getLukeSkywalkerInfo: PromiseBasedFunction = () => {
  return fetch("https://swapi.py4e.com/api/people/1")
      .then((response: Response) => response.json())
      .then(async (person: Person) => {
        const homeworldResponse = await fetch(person.homeworld);
        const homeworld = await homeworldResponse.json();

        const films = await Promise.all(
            person.films.map(async (filmUrl) => {
              const filmResponse = await fetch(filmUrl);
              return await filmResponse.json();
            })
        );

        return {
          name: person.name,
          height: person.height,
          gender: person.gender,
          homeworld: homeworld.name,
          films: films.map((film) => ({
            title: film.title,
            director: film.director,
            release_date: film.release_date,
          })),
        } as PersonInfo;
      });
};

// Task 2: write a function using async and await
// see also: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html
type AsyncBasedFunction = () => Promise<PersonInfo>;
export const getLukeSkywalkerInfoAsync: AsyncBasedFunction = async () => {
  const response = await fetch("https://swapi.py4e.com/api/people/1");
  const person = await response.json();

  const homeworldResponse = await fetch(person.homeworld);
  const homeworld = await homeworldResponse.json();

  const films = await Promise.all(
      person.films.map(async (filmUrl: string) => {
        const filmResponse = await fetch(filmUrl);
        return await filmResponse.json();
      })
  );

  return {
    name: person.name,
    height: person.height,
    gender: person.gender,
    homeworld: homeworld.name,
    films: films.map((film) => ({
      title: film.title,
      director: film.director,
      release_date: film.release_date,
    })),
  };
};


// Task 3: write a function using Observable based api
// see also: https://rxjs.dev/api/index/function/forkJoin
export const getLukeSkywalkerInfoObservable = () => {
  return get<Person>("https://swapi.py4e.com/api/people/1").pipe(
      mergeMap((person: Person) =>
          forkJoin({
            homeworld: get<{ name: string }>(person.homeworld).pipe(
                map((homeworld) => homeworld.name)
            ),
            films: forkJoin(
                person.films.map((filmUrl) =>
                    get<Film>(filmUrl).pipe(
                        map((film) => ({
                          title: film.title,
                          director: film.director,
                          release_date: film.release_date,
                        }))
                    )
                )
            ),
          }).pipe(
              map(({ homeworld, films }) => ({
                name: person.name,
                height: person.height,
                gender: person.gender,
                homeworld,
                films,
              }))
          )
      )
  );
};
