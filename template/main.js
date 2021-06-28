
const fetchRequest = () => {
    const url = 'https://www.metaweather.com';
    const api = '/api/location/search/?query=london';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    
    fetch(`${proxy}${url}${api}`, {
        headers: { 'Origin': '' }
    }).then( (respuesta) => { //respuesta es un objeto response
        if(respuesta.ok){ // Si tenemos la respuesta... 
            
            respuesta.json().then( (datos) => {
                console.log(datos); // Imprimirá el resultado de hacer el metodo text
                                    // sobre el objeto respuesta
            });

        }else{
            console.log("Error en la peticion Fetch");
        }
    });
    
}

fetchRequest();