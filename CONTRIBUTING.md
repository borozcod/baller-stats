# Contributing
First and foremost, thank you for helping. Baller Stats is a simple application for a small basketball league. It uses data from a google sheet. The app is split into two parts, the API and the front end. Before anything, make sure to clone this project.

## API
Everything inside the `/api` directory. In here is a node app used to get data from a google sheet and return it as json. To get working on the API there are a few steps. Before running any of these steps make sure you are in the api directory by running `cd api`.


1. Create a `config.js` file inside the root of the `api` directory. Paste in the following:
```
const PORT = 8083;

module.exports = {
    PORT
};
```
Feel free to change the port to a different one if needed.

2. You will need a `secret.json` file. Since some of that information is tied to my Google account you will have to reach out to [me](mailto:bryanorozcoweb@gmail.com "me") to get it. 
3. Install the npm packages. Run `npm install`.
4. Run `npm run start`.

## Client
The client is found in the root of this project. It is basically a `create-react-app` with some small configurations. Here are the steps to get the client running.

1. Create a `config.js` file inside the `/src` directory. From the root of the project you can run `cd src/ && vim config.js`. Inside the vim editor you can paste this in `export const API_URL = 'http://localhost:8082';`. Shift + Insert to paste then press esc to make sure you are not on editing mode and save and exit by typing `:x`, click enter.
2. From the project root directory run `yarn install`.
3. Start the app by running `yarn start`. 

Make sure you have your api server running on the port specified inside `/api/config.js`. If it is more convenient you can also change `API_URL` to the live api of `https://api.ballerstats.com`.

### Components
To keep things consistent, each component should have its own folder inside the components folder. Look at the `card` folder for example.

### Styles
For most of the styles, I use classes from the https://tachyons.io library. You can find any style you need from the [table of style](https://tachyons.io/docs/table-of-styles/ "table of style").  If your component needs custom styles that fall outside of the tachyons library then create a `scss` file inside that component directory. To utilize all of the base sass variables make sure to add an `@import` statement that refers to `_base.scss` found in the `/styles` directory.
Example:
```
@import "./../../styles/base";
```
Even with custom styles, try and keep things consistent with tachyons.

### Functions
If you think you might use some piece of logic twice, odds are you will. Just add it to the `functions.js` file found inside `/src`,  add an export statement at the beginning of it. You can take a look at some of the functions that are already in there.

## Your First Issue
You got the app running now what. Pick an [issue](https://github.com/borozcod/baller-stats/issues "issue") and lets get to work. Make sure to assign the issue to yourself. Make a branch for that specific issue with your two initials and the issue number. Example `bo/issue-1`. Once you think your branch is ready to be merged, create a pull request and make sure to add `Fixes #1` on the pull request description, with the issue number being your own. This is important since it will help us keep track of things and link issues with pull request. 
