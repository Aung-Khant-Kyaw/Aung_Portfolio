
# Jobs4Interns - Job Application Platform

A highly scalable web application that assists interns connect with potential employers and land on internships with ease.

# Getting Started

## Requirement

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)
- [MongoDB Community Edtion](https://www.mongodb.com/docs/v4.4/installation/)
- [Mongo Compass](https://www.mongodb.com/docs/compass/master/install/) || [Robo3T](https://studio3t.com/download-studio3t-free) || [MongoDB Shell](https://www.mongodb.com/docs/mongodb-shell/install/)
- [Visual Studio Code](https://code.visualstudio.com/Download)

## Quickstart

```
git clone https://duser4@bitbucket.org/duser4/jobs4intern-j4i.git
cd jobs4intern-j4i
npm update --force
```

## Running the project

### Configuration

1. Create a `.env` file using the `.example.env` as the template.
2. Configure `Visual Studio Code` in order to format code better and avoid `merge conflict` amongst teammates

   a. Make sure [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is installed

   b. Open `VSCode Command Palette` (`command+shift+p` for MacOS or `control+shift+p` for Windows) and search for `User Settings`, add this two attributes if you don't have it already.

   ```
    "prettier.jsxSingleQuote": true,
   ```

   ```
    "editor.formatOnSave": true,
   ```

### Backend - Database

3. Start `MongoDB Community Edition`

- Visit [MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition) for more information on how to start `MongoDB service` locally on your `macOS` machine.

- Visit [MongoDB Community Edition on Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition) for more information on how to start `MongoDB service` locally on your `Ubuntu` machine.

- Visit [MongoDB Community Edition on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition-as-a-windows-service) for more information on how to start `MongoDB service` locally on your `Windows` machine.

4. Connect `MongoDB Community Edition service`

   a. `MongoDB Compass` (recommended)

   - Open `MongoDB Compass` and paste the url `mongodb://localhost:27017` to the URI input box.

   - Click `Connect` button to connect to local `MongoDB Community Edition service`

   b. `MongoDB Robo3T`

   - Open `MongoDB Robo3T` (`Studio 3T`) and click `Connect` -> `New Connection`

   - Paste the url `mongodb://localhost:27017` to the URI input box.

   - Click `OK`, type in a name for the connection and `Save` it

   - Back in the `Connection Manager` wizzard, make sure your the connection is chosen

   - Click `Connect` button to connect to local `MongoDB Community Edition service`

### Run the Application

5.  Open the new cloned `jobs4intern-j4i` repository in `VSCode`, navigate to the built-in terminal inside `VSCode`

6.  Run the `Express Server` and `React Client Application` concurrently

        `npm run start`

`VSCode` will automatically open a new tab in your default browser to go to `localhost` IP address and port `3000` (default port for `React`)

7. To stop the program in the terminal, press `CTRL + C` or `command + C`.

### Test the Application

1.  First thing we need a mock-data to compare the unit test cases with. Run:

        `npm run test-mock-data`

2.  Go to `MongoDB compass`, find the `mock record` just got added to the databse. Copy the `ObjectId` in `_id` field.

3.  Navigate to the unit test file located at `test/api/users/user.test.js`

4.  Scroll far down and find the test case `User should be updated successfully`. Replace the `_id` with the `copied ObjectId`

5.  Finally, to test the user APIs. Run:

        `npm run test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build the Application

    `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Eject the Application

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

    `npm run eject`

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Documentation

    `npm run docs`

Generates HTML documentation under the ./docs directory.

## Link to Full Developer Setup Documentation (confluence)

This [J4I Developer Configuration Documentation](https://reltech.atlassian.net/wiki/spaces/RTI/pages/1508606026/J4I+Developers+Configuration) can be referenced to setup and install the required software.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Git Test
