Baller Stats &middot; [![ballin?](https://img.shields.io/badge/are%20we%20ballin%3F-ya%20%F0%9F%8F%80-orange)](https://shields.io/)
[![tag](https://img.shields.io/github/v/tag/borozcod/baller-stats?sort=date)](https://shields.io/)
=====
A dashboard for displaying your team's basketball data.

## Running it locally

> NOTE: Baller stats requires an api from where the data is read. [Baller Stats Parser](https://github.com/borozcod/baller-stats-parser) is a script that will generate a json output from a google sheet. The output from the parser is what is used as the api.

#### Environment Variables
Create a file named `.env` in the project's root directory. Set the following environment variable to your api's endpoint.
```sh
#!/bin/bash
export REACT_APP_API_URL=YOUR_API_URL
```
Source the file
```sh
source .env
```
Install npm packages and run the app
```
npm install
npm run start
```

## Additional Information
### Rollup JS
Rollup is used to bundle our application. It bundles everything from the `src` and copies the `public` directory into `dist`. The `dist` directory can serve as the homepage of the application. When you run `npm run build` rollup will use your `PUBLIC_URL` environment variable and replace the string `%PUBLIC_URL%` with this.

### Styling
#### Tachyons
As a general rule of thumb, try and use the classes from [https://tachyons.io/](https://tachyons.io/) before trying to create your own css style.

#### CSS
Each component can include its own `.css` file. For example, if you are working on a `Table.js` component, you would add a `Table.css` in the same location as your component. You will then import the css as follows.
```js
import './Table.css';
...
```