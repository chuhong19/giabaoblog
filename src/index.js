const express = require('express');
const {engine} = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const sortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');
const { setPriority } = require('os');

// Connect to DB
db.connect();

app.use(methodOverride('_method'));

// Custom middlewares
app.use(sortMiddleware);

// HTTP logger
//app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'bi bi-funnel',
          asc: 'bi bi-sort-up',
          desc: 'bi bi-sort-down',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }; 

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
        <i class="${icon}"></i>
      </a>`;

    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})