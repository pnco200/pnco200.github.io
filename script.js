async function validation(){
    const year1 = document.getElementById("year1").value;
    const year2 = document.getElementById("year2").value;
    const month1 = document.getElementById("month1").value;
    const month2 = document.getElementById("month2").value;
    const price1 = document.getElementById("price1").value;
    const price2 = document.getElementById("price2");

    var URL = '/submit?year1=' + year1 + '&year2=' + year2 + '&month1=' 
    + month1 + '&month2='+ month2 +'&price1=' + price1; 
    if(validParameters(price1, year1, year2)){
        await fetch(URL)
        .then(response => response.json())
        .then(res =>  {           
            if(res.value == null){
                throw Error('Error, no se dispone informacion de la fecha ingresada');
            }
            else{
                price2.value = Math.floor(res.value*100)/100;
            }
        })
        .catch(x => alert(x));
    }
    
}
function validParameters(precio, year1, year2) {

    if((year1 < "0" || year2 < "0" || precio < "0" )){
        alert('Error, ni los años ni el precio pueden ser menores a 0');
        return false;
    }
    else{
        return true;
    }
}
function showResults() {
    window.location.href = "http://localhost:3000/seeResults"
}