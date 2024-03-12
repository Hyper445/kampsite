import {Component} from './Index.js';
import {Markup} from 'interweave';
import {useEffect, useState} from 'react';
import '../design/css/index.css'
import '../App.css';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import Whoops from './NotFound';

import img6 from '../design/images/slide6.jpg';


function GeneralPage() {

    const [error, setError] = useState(false);
    const [data, setData] = useState("");
    const {pathname} = useLocation();

    var name = pathname.split("/")[1];

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getText/${name + localStorage.getItem('language')}`)
          .then(response => {
            setData(response.data[0].text);
            setError(false);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setError(true);
          });
    }, [pathname]);

    return (
        <Component img={img6} component=
            {error === false ?
                <Markup content={data}/>
                :
                <Whoops/>}/>
    );
}


export default GeneralPage;