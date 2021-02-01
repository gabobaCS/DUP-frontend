import moment from 'moment';

//API POST call.
export async function apiPost(data, successResponse){
                        
    const formData = new FormData();
    formData.append("email_usuario", data.email);
    formData.append("estado", data.estado);
    formData.append("fecha_publicado", moment().format('YYYY-MM-DD HH:mm') );
    formData.append("longitud", data.lng);
    formData.append("latitud", data.lat);
    formData.append("fecha_perdido", "2020-12-22");
    formData.append("descripcion_lugar", data.descripcionEncuentro);
    formData.append("descripcion_animal", data.descripcionAnimal);
    formData.append("nombre_animal", "''");
    formData.append("raza", data.raza);
    formData.append("microchip", data.microchip);
    // formData.append("imagen_1", data.imagenes[0]);
    // formData.append("imagen_2", data.imagenes[1]);
    // formData.append("imagen_3", data.imagenes[2]);
    // formData.append("imagen_4", data.imagenes[3]);
    // formData.append("imagen_5", data.imagenes[4]);
    for (let i = 0; i < data.imagenes.length; i++){
        formData.append("imagen_"+ (i+1), data.imagenes[i])
    }
    formData.append("nombre_contacto", data.nombreContacto);
    formData.append("email_contacto", data.email);
    formData.append("numero_contacto", data.teléfono);
    formData.append("pais", data.pais);

    let res = await fetch("https://dupbackend.herokuapp.com/animales/", { 
  
        // Adding method type 
        method: "POST", 
          
        // Adding body or contents to send 
        body: formData, 
          
        // Adding headers to the request 

    }) 

     
    // Converting to JSON 
    .then(response => {
        console.log(response.status)
        if (response.status == 201){
            successResponse(true);
        }
        else{
            setTimeout(window.location.reload(), 3000)
            alert('Ha sucedido un error');

        }

    }) 
    


}

export function emailChecker(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//Getting user Geolocation.
export function getUserGeolocation(setLocation){

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    
    function success(pos) {
        var crd = pos.coords;
        setLocation({lat: parseFloat(crd.latitude), lng: parseFloat(crd.longitude)});
        
    }
    
    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    if(navigator.geolocation){
        navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result){
            if (result.state === "granted") {
                navigator.geolocation.getCurrentPosition(success);

            } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(success, errors, options);

            } else if (result.state === "denied") {
                setLocation({lat: 8.983333, lng: -79.516670})
            //If denied then you have to show instructions to enable location.
            //TODO
            }
        })
    } 
}

