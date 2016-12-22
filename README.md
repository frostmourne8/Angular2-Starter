# Angular 2 Web Kata
This is a project used to demonstrate my skills with Angular2

## Dependencies
The only required global dependency is node. All other dependencies will be installed by NPM.

## Installing
Running the command below will install all required dependencies and get you ready for launching the application
```bash
npm install
```
## Running the application
After you have installed the required dependencies you can launch the application in development mode or build it for production

### Start development mode
The command below will launch both the node backend and a webpack development server that will dynamically compile and serve the application resources.
```bash
npm start
```
You can then navigate to <http://localhost:9000/webpack-dev-server> to launch the application

### Production build
The command below will build and package the application for deployment. The production artifacts will be output to the **server/public** directory
```bash
npm run build
```

## Testing
There are three layers of testing in this project:

* _Unit tests_ - The lowest level tests. Typically tests at the function level and ignores the existence of Angular.
* _Component tests_ - Loads individual components and tests them in isolation. Tests are driven through fixture classes that manipulate the DOM.
* _Service tests_ - Tests the backend node services

All tests are always run as a single suite but can be executed in a continuous watch mode or as a single execution using one of the commands below
```bash
npm run test
npm run test:single
```
### Coverage
Test coverage will be reported in the console after each test run, and a detailed report will be output to the **coverage** directory