# Telos RFP
The goal of Telos RFP are to improve the efficiency of community funds by creating a community driven bounty system that protects those funds by creating an accountability system.

## Roles
### Administrator
- Set the bonus rate for projects that meet milestone deadlines
- Set the bond amounts required for submitting project ideas
- Assign / remove accounts assigned to Program Manager role
### Program Manager
- Create new projects
- Double checks quality of proposals sent to a project before community voting
- Selects between the most voted who will develop the project
- Gives feedback for each delivered milestone
- Decides if milestone was met and allows the bonus to be distributed

## Getting started
In the project directory, you can run:

```js
yarn dev
// or next dev
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

```js
yarn build
// or next build
```
Builds the app for production to the `.next` folder.

```js
yarn start
// or next start
```
Starts the application in production mode.
The application should be compiled with `yarn build` first.
Open http://localhost:3000 to view it in the browser.
## Testing
Due to the time required for testing the system, some actions were created for testing the whole system without having to wait. There are three actions that can be used to make a project from one status to another. Only the owner of the project has the authority to execute them.
### Project from receiving proposals to voting
- Select a project that has at least 2 proposals in order for us to create a ballot
- `skpstartvote`
- `retunbond` for each of the proposals. Mark `return_bond` as `false` the ones that should be considered spam.
- `beginvoting`
### Testnet link
https://telos-works.test.eosdetroit.io/

27 project
38, 39, 40 proposals
