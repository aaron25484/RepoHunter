

# RepoHunter - Your GitHub searcher

Made with **React, Typescript, Tailwind CSS, GraphQl, Jest** and deployed with **Netlify**

Due February 16 2024  
Made by [Aaron de los Santos](https://github.com/aaron25484)

## Table of Contents

- [RepoHunter - Your GitHub searcher](#RepoHunter---Your-GitHub-searcher)
  - [About the Project](#about-the-project)
  - [Visit the Page](#visit-the-page)
  - [Installation and Setup](#installation-and-setup)
  - [Running the Test Suite](#running-the-test-suite)

  - [Tecnologies Used](#tecnologies-used)
  - [Future Improvements](#future-improvements)

## About the Project

The main objective of this project is to reach every repository hosted in GitHub using its v4 GraphQl API. You can search for GitHub users all across the platform and display every public repository they have on their profile. Also it's possible to add to favorites the repositories that you like the most.
The app is available in English, Spanish and German.

## Visit the Page

The page is deployed on Netlify. You can visit it on this URL:

[RepoHunter](https://repo-hunter.netlify.app/)

## Installation and Setup

Clone the repository. You will need **[node](https://nodejs.org/es)** and **[pnpm](https://pnpm.io/)** installed globally on your machine.

```
https://github.com/aaron25484/RepoHunter.git
```

Go to the project folder:

````
cd RepoHunter
````

Install dependencies via pnpm:
 

``````
pnpm install
``````


Start the development server:
``````
pnpm run dev
``````


Visit the app:

[http://localhost:5173/](http://localhost:5173/)

## Running the Test Suite

Execute the following command to run the test suite:

````
pnpm test
````
The test suite will execute, and the results will be displayed in the terminal. You'll see information about which tests passed, failed, or encountered errors.

Also, if you want to run a specific test file or focus on a particular test suite, you can use the following command:

`````
pnpm test <name-of-the-file>
``````


## Tecnologies Used

- [React](https://es.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify](https://www.netlify.com/)
- [Jest](https://jestjs.io/es-ES/)
- [GraphQl](https://graphql.org/)

## Future Improvements

I would like to expand the possibilities of the search engine by adding more fields of searched data, such as searching by the name of the repository, by tech stack.
I would also like to improve the style of the application and give it a more modern touch.

I would like to expand the possibilities of the search engine by adding more fields of exploration for the user, such as searching by repository name or tech stack used. Also I would like the app to be able to handle pull requests and send private messages to users
I would also like to improve the style of the application and give it a modern touch.

# Have fun with RepoHunter!!!