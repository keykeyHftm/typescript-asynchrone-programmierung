# Übung asynchrome Programmierung

## Installation

Um alle Abhängigkeiten zu installieren im Terminal: `npm i` ausführen

## Tests

Um die Tests auszuführen im Terminal `npm test` ausführen

## Notice

The original API `https://swapi.dev` is currently not working due to a certificate issue. Therefore, we researched alternatives and decided to use `https://swapi.py4e.com/api/`.

This API is an exact replica of swapi.dev.
However, we had to adjust the expectedResult variable in `main.spec.ts to account for additional data from the new API (e.g., the inclusion of “The Force Awakens”). This change ensured the tests ran successfully.

### Tasks in main.ts

#### Overview
The file `main.ts` contains three tasks, each demonstrating a different approach to solving the same problem. The goal is to fetch information about Luke Skywalker from the Star Wars API (`https://swapi.py4e.com/api/`) and include related data (e.g., homeworld and films). The expected output is an object in the following format:
``` json
{
  "name": "Luke Skywalker",
  "height": "172",
  "gender": "male",
  "homeworld": "Tatooine",
  "films": [
    {
      "title": "A New Hope",
      "director": "George Lucas",
      "release_date": "1977-05-25"
    },
    ...
  ]
}
```

##### Task 1: Promise-Based Approach
- This task uses the fetch API to retrieve data with Promises.
- Dependent data like homeworld and films is fetched sequentially using Promise.all.
- Highlights:
    - Sequential data fetching with Promises.
    - Errors are handled using .catch().
- Function:
``` typescript
export const getLukeSkywalkerInfo: PromiseBasedFunction = () => { ... };
```
##### Task 2: Async/Await Approach
- This task solves the same problem as Task 1 using async/await.
- The code is cleaner and easier to read because the await syntax resolves Promises.
- Highlights:
    - Asynchronous functions with async and await.
    - Errors are handled with try...catch blocks.
- Function:
``` typescript
export const getLukeSkywalkerInfoAsync: AsyncBasedFunction = async () => { ... };
```

##### Task 3: Observable-Based Approach
- This task uses RxJS to handle API calls as Observables.
- The forkJoin operator is used to execute API calls in parallel and combine the results.
- Highlights:
    - The pipe method is used to compose operators.
    - Operators like mergeMap are used to handle dependent API calls.
    - The map operator processes the results into the required format.
    - Error handling can be done with catchError (not shown here but can be implemented for production code).
- Function:
``` typescript
export const getLukeSkywalkerInfoObservable = () => { ... };
```

This project demonstrates how to implement different asynchronous programming approaches in TypeScript. The tests ensure that each implementation works as expected.
 