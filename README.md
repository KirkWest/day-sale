# DaySale Front-end

 The front-end of this application works in tandem with the [DaySaleBackend](https://github.com/KirkWest/DaySaleBackend) and controls the user interface components of the app using the MERN stack in particular React.

 The function of the site is to supply the user with a calendar page that is populated with sell buttons and buy buttons if applicable. A guest can click on a sell day to email the Admin about a wish to sell that day, or if a buy button is clicked it will allow them to email the admin about their wish to buy that day. Admin will use these same buttons to open modals to add children to a days if it was a sell button or to manipulate the database data to add or remove children from days that have a buy button. Removing the last child from a day will also remove the button from the calendar page.

## List of dependencies

    "@babel/plugin-proposal-private-property-in-object": "^7.21.0",
    "@fortawesome/fontawesome-svg-core": "^6.5.1",
    "@fortawesome/free-brands-svg-icons": "^6.5.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.3.2",
    "js-cookie": "^3.0.5",
    "moment": "^2.30.1",
    "react": "^18.2.0",
    "react-big-calendar": "^1.8.5",
    "react-bootstrap": "^2.9.2",
    "react-dom": "^18.2.0",
    "react-modal": "^3.16.1",
    "react-router-dom": "^6.21.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"

## Components

### Footer

contains a simple footer for the home page only with links to the users facebook, instagram, and website.

### Header

The header contains the logo for ACELP as well as a link to the calendar page and a login button.

### LoginModal

This controls the modal to login as an admin user. Utilises react modal as well as custom styling.

### AddChildModal

This controls the modal that pops up when wanting to add a child to the database in connection with that day. It calls the Add child function contained in the apiFunctions.js. Utilises react modal as well as custom styling.

### ManageChildrenModal

This controls the modal that opens when an admin clicks on the buy button, it shows a list of the children from the database on that day with a remove button next to their names to remove them as well as a section unneath to add a name in as well if the admin wanted, this calls the addCalendarChild and removeCalendarChild functions from the apiFunctions.js. Utilises react modal as well as custom styling.

## Contexts

### GlobalStateContext

Contains logic to allow the login modal to open on all pages.

### UserContext

Contains our user context, such as the login logout functions. It has two useEffects one to handle opeing the loginmodal after a token expires as well as one to check if there is an existing auth token.

## Pages

### HomePage

Simple holds as the landing page for the app, contains the header and footer as well as a brief welcome message.

### CalendarPage

The calendar page uses React-big-calendar to format the basics of the calendar, then using functions "CustomDayCellSell" and bootstrap to create the buy and sell buttons. Using a fetchEvents function it checks if there are any dates/children saved in the database, if there are it will add a buy button to any of those days. We have a refreshEvents function to update the modal if there are any changes made. Handle buy and sell click logic both will first check if the user is authenticated, if not they both open emails using "mailto" from the users end and self populates the date and the type of button that was clicked into the subject and into the body of email, it also adds ACELPs email automatically. Uses moment, react-big-calendar, moment, and bootstrap along with custom styling.

## services

### apiFunctions

FetchWithToken and storing the token in session storage, as well as removing the token once it expries and refreshing it.
FetchWithoutToken operates similar but can run a fetch without the authentication, this was necessary to populate the buy buttons.
The addCalendarChild acts as the api function to add a child to the calendar through the manageChildNames functions in the backend.
TheremoveCalendarChild is the same also calling this manageChildNames function bit with an action of remove instead of add

## Reacts auto readne below

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
