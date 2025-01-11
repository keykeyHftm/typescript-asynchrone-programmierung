import { of, throwError } from "rxjs";
import {
  getLukeSkywalkerInfo,
  getLukeSkywalkerInfoAsync,
  getLukeSkywalkerInfoObservable,
} from "./main";
jest.mock("node-fetch");
jest.mock("./utils");
import fetch from "node-fetch";
import { get } from "./utils";

// promise based
test("getLukeSkywalkerInfo when https://swapi.py4e.com/api/people/1 api call fails, should return people error", (done) => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.reject(new Error("People call failed"));
    }
  });

  getLukeSkywalkerInfo().catch((error) => {
    expect(error.message).toBe("People call failed");
    done();
  });
});

test("getLukeSkywalkerInfo when https://swapi.py4e.com/api/planets/1/ api call fails, should return homeworld error", (done) => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.reject(new Error("Homeworld call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  getLukeSkywalkerInfo().catch((error) => {
    expect(error.message).toBe("Homeworld call failed");
    done();
  });
});

test("getLukeSkywalkerInfo when https://swapi.py4e.com/api/films/1/ api call fails, should return Film 1 error", (done) => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.resolve({
        json: () => Promise.resolve(homeworldCallback),
      });
    }

    if (url === "https://swapi.py4e.com/api/films/1/") {
      return Promise.reject(new Error("Film 1 call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  getLukeSkywalkerInfo().catch((error) => {
    expect(error.message).toBe("Film 1 call failed");
    done();
  });
});

test("getLukeSkywalkerInfo when https://swapi.py4e.com/api/films/6/ api call fails, should return Film 6 error", (done) => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.resolve({
        json: () => Promise.resolve(homeworldCallback),
      });
    }

    if (url === "https://swapi.py4e.com/api/films/6/") {
      return Promise.reject(new Error("Film 6 call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  getLukeSkywalkerInfo().catch((error) => {
    expect(error.message).toBe("Film 6 call failed");
    done();
  });
});

// async based
test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/people/1 api call fails, should return people error", async () => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.reject(new Error("People call failed"));
    }
  });

  await expect(getLukeSkywalkerInfoAsync()).rejects.toThrow(
    "People call failed"
  );
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/planets/1/ api call fails, should return homeworld error", async () => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.reject(new Error("Homeworld call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  await expect(getLukeSkywalkerInfoAsync()).rejects.toThrow(
    "Homeworld call failed"
  );
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/films/1/ api call fails, should return Film 1 error", async () => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.resolve({
        json: () => Promise.resolve(homeworldCallback),
      });
    }

    if (url === "https://swapi.py4e.com/api/films/1/") {
      return Promise.reject(new Error("Film 1 call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  await expect(getLukeSkywalkerInfoAsync()).rejects.toThrow(
    "Film 1 call failed"
  );
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/films/6/ api call fails, should return Film 6 error", async () => {
  (fetch as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return Promise.resolve({ json: () => Promise.resolve(peopleCallback) });
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return Promise.resolve({
        json: () => Promise.resolve(homeworldCallback),
      });
    }

    if (url === "https://swapi.py4e.com/api/films/6/") {
      return Promise.reject(new Error("Film 6 call failed"));
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return Promise.resolve({ json: () => Promise.resolve(filmCallback) });
    }
  });

  await expect(getLukeSkywalkerInfoAsync()).rejects.toThrow(
    "Film 6 call failed"
  );
});

// observable based
test("getLukeSkywalkerInfoObservable when https://swapi.py4e.com/api/people/1 api call fails, should return people error", (done) => {
  (get as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return throwError(() => "People call failed");
    }
  });

  getLukeSkywalkerInfoObservable().subscribe({
    next: () => {},
    error: (error) => {
      expect(error).toBe("People call failed");
      done();
    },
  });
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/planets/1/ api call fails, should return homeworld error", (done) => {
  (get as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return of(peopleCallback);
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return throwError(() => "Homeworld call failed");
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return of(filmCallback);
    }
  });

  getLukeSkywalkerInfoObservable().subscribe({
    next: () => {},
    error: (error) => {
      expect(error).toBe("Homeworld call failed");
      done();
    },
  });
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/films/1/ api call fails, should return Film 1 error", (done) => {
  (get as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return of(peopleCallback);
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return of(homeworldCallback);
    }

    if (url === "https://swapi.py4e.com/api/films/1/") {
      return throwError(() => "Film 1 call failed");
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return of(filmCallback);
    }
  });

  getLukeSkywalkerInfoObservable().subscribe({
    next: () => {},
    error: (error) => {
      expect(error).toBe("Film 1 call failed");
      done();
    },
  });
});

test("getLukeSkywalkerInfoAsync when https://swapi.py4e.com/api/films/6/ api call fails, should return Film 6 error", (done) => {
  (get as unknown as jest.Mock<any, any>).mockImplementation((url) => {
    if (url === "https://swapi.py4e.com/api/people/1") {
      return of(peopleCallback);
    }

    if (url === "https://swapi.py4e.com/api/planets/1/") {
      return of(homeworldCallback);
    }

    if (url === "https://swapi.py4e.com/api/films/6/") {
      return throwError(() => "Film 6 call failed");
    }

    if (url.startsWith("https://swapi.py4e.com/api/films/")) {
      return of(filmCallback);
    }
  });

  getLukeSkywalkerInfoObservable().subscribe({
    next: () => {},
    error: (error) => {
      expect(error).toBe("Film 6 call failed");
      done();
    },
  });
});

const peopleCallback = {
  name: "Luke Skywalker",
  height: "172",
  gender: "male",
  homeworld: "https://swapi.py4e.com/api/planets/1/",
  films: [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/2/",
    "https://swapi.py4e.com/api/films/3/",
    "https://swapi.py4e.com/api/films/6/",
  ],
};

const homeworldCallback = {
  name: "Tatooine",
};

const filmCallback = {
  title: "A New Hope",
  director: "George Lucas",
  release_date: "1977-05-25",
};
