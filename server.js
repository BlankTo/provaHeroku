const express = require('express');
const dao = require('./dao');
const morgan = require('morgan');
const session = require('express-session'); // session middleware

const {check, validationResult} = require('express-validator');

const passport = require('passport');
const passportLocal = require('passport-local');
const userDao = require('./dao-user');

const path = require('path')

const PORT = process.env.PORT || 3001;

const app = new express();
app.use(express.json());
app.use(express.static("./client/build"));
//app.use(morgan('dev'));

// initialize and configure passport
passport.use(new passportLocal.Strategy((username, password, done) => {
   userDao.getUser(username, password).then(user => {
     if (user)
       done(null, user);
     else
       done(null, false, { message: 'Username or password wrong' });
  }).catch(err => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
   done(null, user.id); // user.id
});
  
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
});

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
      return next();
    return res.status(401).json({ error: 'not authenticated' });
}


app.use(session({
  secret: 'GoogleIsMyBFF',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/** API Login **/

// login
app.post('/api/sessions', [
  check('username').isEmail(),
  check('password').isString().notEmpty()
], function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);
        
            // req.user contains the authenticated user, we send all the user info back
            // this is coming from userDao.getUser()
            return res.json(req.user);
        });
    })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.post('/api/sessions/current', (req, res) => {
    req.logout();
    res.end();
});
  
// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
    if(req.isAuthenticated()) {
        res.status(200).json(req.user);}
    else
        res.status(401).json({error: 'Unauthenticated user!'});
});

/** API Tasks **/

app.get('/api/tasks', isLoggedIn, (req, res) => {
    id_client = req.user.id;
    console.log(id_client);
    dao.listTasks(id_client)
        .then((tasks) => {res.json(tasks); })
        .catch((error) => {res.status(500).json(error)})
})

app.get('/api/tasks/:id(\\d+)', isLoggedIn, (req, res) => {
    const id = req.params.id;
    id_client = req.user.id;
    dao.getTask(id, id_client)
        .then((task) => {res.json(task); })
        .catch((error) => {res.status(500).json(error)})
})
app.get('/api/tasks/:filter([A-Za-z][A-Za-z0-9%]+)', isLoggedIn, (req, res) => {
    const filter = req.params.filter;
    id_client = req.user.id;
    dao.filterTasks(filter, id_client)
        .then((tasks) => {res.json(tasks); })
        .catch((error) => {res.status(500).json(error)})
})

app.post('/api/tasks', [
        isLoggedIn,
        check('description').isString().notEmpty(),
        check('important').isBoolean(),
        check('private').isBoolean(),
        check('deadline').isAfter(),
        check('completed').isBoolean()
    ],    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }
    const task = {
        description: req.body.description,
        important: req.body.important,
        private: req.body.private,
        deadline: req.body.deadline,
        completed: req.body.completed,
        user: req.user.id
      };
    
    dao.createTask(task)
    .then((id) => {res.status(200).end();console.log(id)})
    .catch((error) => {res.status(500).json(error)})
    
})
app.put('/api/tasks/:id', [
    isLoggedIn,
    check('description').isString().notEmpty(),
    check('important').isBoolean(),
    check('private').isBoolean(),
    check('deadline').isAfter(),
    check('completed').isBoolean()
    ],    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(422).json({errors: errors.array()});
        }
    const task = {
        id: req.params.id,
        description: req.body.description,
        important: req.body.important,
        private: req.body.private,
        deadline: req.body.deadline,
        completed: req.body.completed,
        user: req.user.id
      };
    dao.updateTask(task)
        .then((id) => {res.status(200).end();console.log(id)})
        .catch((error) => {res.status(500).json(error)})
})

app.delete('/api/tasks/:id', isLoggedIn, (req, res) => {
    id_client = req.user.id;
    dao.deleteTask(req.params.id, id_client)
        .then(()=>{res.status(200).end()})
        .catch((error) => {res.status(500).json(error)})
})

app.put('/api/tasks/:id/mark', isLoggedIn, (req, res) => {
    id_client = req.user.id;
    dao.toggleCompleted(req.params.id, id_client)
        .then(()=>{res.status(200).end();})
        .catch((error)=>{res.status(500).json(error)});
})

app.get('*', (req, res) => {
  res.redirect('index.html')
});
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));