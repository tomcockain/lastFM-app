import React from 'react';
import axios from 'axios';

const getLastFM = () =>{
    axios.get('/getLastFM').then( res =>{
      const albumImages =  res.data.topalbums.album;
      console.log( albumImages );
    })
}

const AlbumArray = () => {
    getLastFM();

    return ( 
        <p> test </p>
     );
}
 
export default AlbumArray;