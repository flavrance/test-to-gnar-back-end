# TEST-TO-GNAR-BACK-END

This project was developed for test. The development challenge is (https://gist.github.com/dotpegaso/686dab1bb155ff843075c3d25839e4db)


## Available Scripts

In the project directory, you can run:

### 'npm start'

Runs the app in the production mode.\
Open your postman and import a .json file in the path './collection' to do iteraction with API's.

### 'npm test'

Launches the test runner in the interactive watch mode.


### 'npm dev run'

Builds the app for development mode.\
Open your postman and import a .json file in the path './collection' to do iteraction with API's.

## postegre data base

The postegre database hosted in the heroku platform and your credentials is randomized. To change the credentials, open the file './config/db.config.js' and chagen the values of HOST, PASSWORD, USER and DB.

## Heroku Cloud Platform
The API hosted in heroku, on (https://agile-tundra-51369.herokuapp.com), with pipeline configuration and CI test using github code analisys.
The pipeline deployment has a automatic deploy configurated with CI approved test.
