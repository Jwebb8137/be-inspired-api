const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))

app.use((req,res) => {
    res.send('Hello There!')
    console.log('Working')
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})