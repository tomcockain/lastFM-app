import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const SearchUser = () => {
    let images = [];
    const[username, setUsername] = useState('');
    const [albumImages, setAlbumImages] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&period=overall&limit=500&api_key=6cf82d4bfbe4ce24acead4543fb24083&format=json', { params: { username: username}}).then( res =>{
            const albums =  res.data.topalbums.album;
            albums.forEach( album =>{
                images.push(album.image[2]['#text']);
            })
            setAlbumImages(images);
        })


    }


    return (
        <> 
        <div >
            <form noValidate onSubmit={handleSubmit}>
                <Grid container justifyContent="center">
                    <Grid item>
                        <TextField 
                            id="outlined-basic" 
                            label="LastFM Username" 
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} required
                            />
                    </Grid>
                    <Grid item alignItems='stretch' style={{display: 'flex'}}>
                        <Button type='submit' size='large' variant='outlined'>search</Button>
                    </Grid>  
                </Grid>
            </form>
        </div>
        <br/>
        <div>
            {
                albumImages.map(img => (
                    <img src={img} alt={img}/>
                ))

            }
        </div>
        </>
     );
}
 
export default SearchUser;