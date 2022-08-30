# Todo app

Clone of Microsoft todo list.

<img width="1440" alt="Zrzut ekranu 2022-08-19 o 13 40 21" src="https://user-images.githubusercontent.com/16631618/185629635-0c5cf098-a630-4232-87cc-6b7f9431abd6.png">

## Demo version

https://todo.houseof.software/login

## Goals

- Create full stack app frontend & backend
- Monorepo
- Sharing types between frontend and backend
- Real-time data update
- Strong typing
- Try React Query and Recoill
- Try TailwindCss
- Offline mode
- Playwright and Jest
- Storybook
- Deploy app on render.com

## Tech Stack

**Client:** React, Typescript, React-Query, Recoil, TailwindCSS, Storybook, Jest, Playwright, Docker, Socket.io

**Server:** Node, Express, Socket.io, MongoDB

## Node version

v16.0.0

## Roadmap

- [x] Login and Register
- [x] Create / Delete group
- [x] Create / Update / Delete list
- [x] Move list to group
- [x] List sharing
- [x] App themes
- [x] Create / Update / Delete task
- [x] Task assigment
- [x] Task importance
- [x] Task status (IN PROGRESS / DONE)
- [x] Global searching
- [ ] Task sorting
- [ ] Task printing
- [ ] Task reminder
- [ ] Planned task
- [ ] Remember / reset password
- [x] tests in playwright
- [ ] offline mode

### Installation

Short instruction step by step how install and run the app.

1. Clone the repo
   ```sh
   git clone git@github.com:klimekkatarzyna/todo-app.git
   ```
2. Install packages
   ```sh
   yarn install
   ```
3. Run database via docker

   - You can dowloand docker here: https://www.docker.com/products/docker-desktop/
   - Install docker
   - Run command `docker-compose up -d`

4. Build global types
   ```sh
   cd common && yarn build
   ```
5. Run frontend
   - Create `.env` file in `./client` folder and add environment variables:
   ```sh
   REACT_APP_API_URL_LOCAL=http://localhost:8080
   REACT_APP_LOCAL_BACKEND=http://localhost:3000
   REACT_APP_SOCKET_LOCAL_URL=http://localhost:3000
   ```
   - Type in terminal:
   ```sh
   cd client && yarn start
   ```
6. Run backend
   - Create `.env` file in `./server` folder and add environment variables:
   ```sh
   SECRET_KEY=.Ge~!!Wcv|vREPrmRrm.p3m$pm.5.$
   PORT=3000
   FRONTEND=http://localhost:8080
   FRONTEND_DOMAIN=localhost
   MONGODB_CONNECTION=mongodb://localhost:/todo
   ```
   - Type in terminal:
   ```js
   cd server && yarn start
   ```
7. And that's it! Go to browser and check the url `http://localhost:8080`

## License

[MIT](https://choosealicense.com/licenses/mit/)
