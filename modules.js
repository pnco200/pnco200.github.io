var dataBase = require('./BLS.json');
var submits = require('./submits.json');
var fs = require('fs');

exports.getCpi = function (year1, year2, month1, month2, price1) {
    let cpi1 = calculateCPI(year1, month1);
    let cpi2 = calculateCPI(year2, month2);
    if( cpi1 == -9999 || cpi2 == -9999){
        return -9999;
    }
    let finalCpi = price1/cpi1 * cpi2;
    saveToSubmits(year1, year2, month1, month2, price1, finalCpi);
    return(finalCpi);
}

function calculateCPI(year, month) {
    let arrayCpi = dataBase;
    let firstYear = arrayCpi[0].year;
    //Formula para sacar el indice(año a buscar - el primer año) * la cantidad de meses en un año +(el mes a buscar -1)
    let index = ((year - firstYear) * 12) + (month - 1); 
    if(index < 0){
        return(-9999) // fecha por debajo de la minima en el archivo
    } else if(index > arrayCpi.length){
        return(-9999) // fecha por sobre la fecha maxima en el archivo
    }
    return( arrayCpi[index].value);
}

function saveToSubmits(year1, year2, month1, month2, price1, result) {
    let arraySubmits = submits;
    
    let obj ={
        year1: year1, 
        year2: year2,
        month1: month1,
        month2: month2, 
        price1: price1,
        result: result.toString()
    }

    arraySubmits.push(obj);

    let jsonObj = JSON.stringify(arraySubmits);
    fs.writeFile("submits.json", jsonObj, function(err){
        if (err) throw err;
        console.log("File saved");
    });
    
}

exports.seeSubmits = function(){
    let arraySubmits = submits;
    return arraySubmits;
}