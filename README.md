# Todo app

Clone of Microsoft todo list.

## Demo version

https://todo.houseof.software/login

## Goals

1. Create full stack app frontend & backend
2. Monorepo
3. Sharing types between frontend and backend
4. Real-time data update
5. Strong typing
6. Try React Query and Recoill
7. Try TailwindCss
8. Offline mode
9. Cypress and Jest
10. Storybook
11. Deploy app on render.com

## Tech Stack

**Client:** React, Typescript, React Query, Recoil, TailwindCSS, Storybook, Jest, Cypress, Docker

**Server:** Node, Express

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
- [ ] tests in cypress
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
3. Add docker

   - You can dowloand docker here: https://www.docker.com/products/docker-desktop/
   - Install docker
   - Add docker extension to your code editor
   - Run command `Compose start`

4. Build global types
   - Go to common folder and in terminal type command:
   ```sh
   yarn build
   ```
5. Run frontend
   - Go to client folder
   - Create `.env` file and add environment variables:
   ```sh
   REACT_APP_API_URL_LOCAL=http://localhost:8080
   REACT_APP_LOCAL_BACKEND=http://localhost:3000
   REACT_APP_SOCKET_LOCAL_URL=http://localhost:3000
   ```
   - Type in terminal:
   ```js
   yarn start
   ```
6. Run backend
   - Go to server folder
   - Create `.env` file and add environment variables:
   ```sh
   SECRET_KEY=.Ge~!!Wcv|vREPrmRrm.p3m$pm.5.$
   PORT=3000
   FRONTEND=http://localhost:8080
   FRONTEND_DOMAIN=localhost
   MONGODB_CONNECTION=mongodb://localhost:/todo
   ```
   - Type in terminal:
   ```js
   yarn start
   ```
7. And that's it! Go to browser and check the url `http://localhost:8080`

## License

[MIT](https://choosealicense.com/licenses/mit/)
