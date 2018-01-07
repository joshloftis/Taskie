const express = require('express');
const dotenv = require('dotenv').config();
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');
const rewardRoutes = require('./routes/rewards-routes');
const htmlRoutes = require('./routes/html-routes');
const passportSetup = require('./config/passport-setup');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Static directory
app.use(express.static('public'));

// set view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// set up session cookies
app.use(cookieSession({
  maxAge: 86400000, // 1 day in milliseconds
  keys: [process.env.CookieKey],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// set up routes
app.use('/auth', authRoutes);
app.use(userRoutes);
app.use('/profile/api', taskRoutes);
app.use('/rewards/api', rewardRoutes);
app.use(htmlRoutes);

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
