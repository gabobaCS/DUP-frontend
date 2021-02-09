import React, { useState, useEffect } from "react";
import {
  useParams,
  Redirect,
  useHistory
} from "react-router-dom";


export default function AnimalInfo(props){
    let { id } = useParams();
    let history = useHistory();

    const [animalData, setAnimalData] = useState({});

    useEffect(() => {
        let animal = props.data.filter(obj => {
            return obj.id === parseInt(id)
        });

        if(animal.length === 0){
            console.log('nout found' )
            history.push('/not-found')
        }



    },[props.data]);


    return(
        <div>
            {animalData.id}
        </div>
    )
}