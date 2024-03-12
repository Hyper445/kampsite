import {Component} from './Index.js';
import '../design/css/index.css'
import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import img6 from '../design/images/slide6.jpg';
import { height } from '@mui/system';

import Divider from '@mui/material/Divider';


function TicketsPage() {


    return (
        <Component img={img6} component=
        { <>
            <iframe src="https://uvo-amsterdam.weticket.com/" style={{height: "100vh"}}></iframe>

            </>}
        
        />
    );
}


export default TicketsPage;