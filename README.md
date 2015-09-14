This project uses [AngularJS](https://angularjs.org/), [NodeJS](https://nodejs.org/en/), [MongooseJS](http://mongoosejs.com/), [ExpressJS](http://expressjs.com/), and [MongoDB](https://www.mongodb.org/).

This project uses the application skeleton from [angular-seed](https://github.com/angular/angular-seed).

# angular-seed — the seed for AngularJS apps

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant web development gratification.

The seed app doesn't do much, just shows how to wire two controllers and views together.


## Getting Started

To get you started you can simply clone the repository, install the dependencies, and install MongoDB.

### Prerequisites

You need git to clone any git repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone the repository

Clone the repository using [git][git]:

```
git clone https://github.com/tosirisuk/simple-angularjs-login.git
cd simple-angularjs-login
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*



### Installing MongoDB

Please visit [MongoDB](https://www.mongodb.org/)

Do not forget to create the /data/db directory.
The database name used in the repository is simple-login.
`mongoose.connect('mongodb://localhost:27017/simple-login');`


### Run the Application

The server, which is NodeJS, is the server.js file.  The simplest way to start this server is:

```
node server.js
```

However, I highly recommend to use [nodemon](https://github.com/remy/nodemon) instead of `node server.js`:

To install [nodemon](https://github.com/remy/nodemon), run the command : 
```
npm install -g nodemon
```

And start the server using [nodemon](https://github.com/remy/nodemon) by: 
```
nodemon server.js
```

Now browse to the app at `http://localhost:3000/` or `http://localhost:3000/#/login`.



## Updating Angular

Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.



## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[MongooseJS]: http://mongoosejs.com/
[ExpressJS]: http://expressjs.com/
[MongoDB]: https://www.mongodb.org/
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
