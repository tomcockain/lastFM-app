import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import * as d3 from "d3";
import cloud from "d3-cloud";

const SearchUser = () => {

  let layout; 
  let artistArray = [];
  const[username, setUsername] = useState('');
  const [artists, setArtists] = useState({});
  const [userValid, setUserValid] = useState(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&period=overall&limit=500&api_key=6cf82d4bfbe4ce24acead4543fb24083&format=json', { params: { username: username}}).then( res =>{
        const artistData =  res.data.topartists.artist;
        let totalCount = 0;
        artistData.forEach( artist =>{
            artistArray.push({name: artist.name, count: artist.playcount });
            const artistPlaycount = parseInt(artist.playcount);
            totalCount += artistPlaycount;

        })
        setArtists({totalCount: totalCount, artistArray: artistArray});
        setUserValid(true);
    }).catch( err =>{
      console.error('ERROR: ', err);
    });
  
//img: album.image[2]['#text']
}
  const generateWordCloud = ()=> {
    d3.select("svg").remove();
    layout = cloud()
      .size([595, 841])
      .words(
        artists.artistArray.map((d)=> {
        const score = 5000 * d.count / artists.totalCount;
        return {text: d.name, size: score, img: d.img};
      }))
      .padding(0.3)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);

    layout.start();
  }
    const draw = (words)=> {
      d3.select(".canvas").append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")  
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
    
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
        <div className='canvas'>
        </div>

        { userValid?
          <Button
            onClick={generateWordCloud}>
            generate  
        </Button> :
        null
        }  
        </>
     );
}
 
export default SearchUser;

