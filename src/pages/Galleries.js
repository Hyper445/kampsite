import {FadeInSection} from './Index.js';
import {useEffect, useState} from 'react';
import '../design/css/index.css'
import '../App.css';
import axios from 'axios';
import {Link} from "react-router-dom";


const Galleries = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getGalleries`)
          .then(response => {
            setData(response.data);
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    return (
        <div className="main">
            <FadeInSection name={"standard"}>
                <div class="container">
                    <div class="row">
                        {data.map((item, index) => (
                            <div class="col-md-4">
                                <Link to='/team' state={{ID: `${item.ID}`}}>
                                    {/* <img className={"imageHover"}src={require(`../design/images/${item.thumb}`)} style={{width: "100%", height:"100%"}}></img> */}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <Markup content={data} /> */}
            </FadeInSection>

        </div>
    );

}


export default Galleries;