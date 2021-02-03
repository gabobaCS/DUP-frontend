function distance(a, b){
    return Math.sqrt((a.latitud - b.latitud)**2 + (a.longitud - b.longitud)**2)
}

function compareCloseness(center, a, b){
    if (distance(center, a) < distance(center, b)) {
        return -1;
      }
      if (distance(center, a) > distance(center, b)) {
        return 1;
      }
      return 0;
}

// {latitud: center.lat, longitud: center.lng}

//Receives center coordinates and array of Animal objects
export const sortByDistance = (coordinates, center) => {
    const formattedCenter ={latitud: center.lat, longitud: center.lng}
    const sorter = (a, b) => distance(a, formattedCenter) - distance(b, formattedCenter);
    return [...coordinates].sort(sorter);
};