const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { mongodb } = require('./database');

app.set('port', process.env.PORT || 3001);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/maps', require('./routes/map.routes'));

app.listen(app.get('port'), () => {
    console.log('"Server on port', app.get('port'));
})