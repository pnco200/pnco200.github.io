const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 3000;
var modules = require('./modules.js');

app.use(express.static('public'));
app.get('/', (req, res) => {
    
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT} `));

app.get('/submit?', (req, res) => {
    const query = req.query;
    let aux = {value: modules.getCpi(query.year1, query.year2, query.month1, query.month2, query.price1)};
    if(aux.value == -9999){
        res.status(400).json({err:'Error: Invalid Date' });
    }
    else{
        res.status(200).json(aux);
    }
    res.end();
});

app.get('/seeResults', (req,res) => {
    res.status(200).json(modules.seeSubmits());
});