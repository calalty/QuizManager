# QuizManager

## 1) Zip

Download the zip folder and open it up in `VSCODE`.

## 2) Development server

Run `cd quiz-master` within the terminal of `VSCODE`.

Run `npm i` within the terminal to install all the necessary dependencies. 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 3) Backend Server 

Open up another terminal within `VSCODE`.

Run `cd server`.

Run `nodemon server.js` for a the backend server.

## 4) MongoDB 

Download mongo at => `https://www.mongodb.com/try/download/community`.

Once downloaded `cd User` in a new terminal, then: 1) `mkdir data`, 2) `cd data`, 3) `mkdir db`, 4) `cd db` and finally, 5) `mongod --dbpath ~/data/db`.

After that open another new terminal and run `mongo`.

Watch this video if you struggle to help set up your Mongo server and database:

`https://www.youtube.com/watch?v=FwMwO8pXfq0`

There is also a video of me doing it called `MongoDBTutorial` that should be with you.

## 5) MongoDB Compass 

Download at => `https://www.mongodb.com/try/download/compass`.

Open up and click `fill in connection fields individually`, then add `Hostname: 127.0.0.1`, `Port: 27017` and click `Connect`. 

There is also a video of me doing it called `CompassTutorial` that should be with you.


## 6) Add Users to DB

Go to the server file in the Quiz Manager Project.

And then go to this route: `/QuizManagerProject/server/middlewares/auth.js`

Uncomment `// preConfig()` on line 33 and then comment it back again so it only runs once. 

There is also a video of me doing it called `AddUsers` that should be with you.









