import {useEffect, useState} from 'react';
import {Component} from './Index.js';
import {CButton, CCard, CCardBody, CCollapse} from '@coreui/react';
import axios from 'axios';
import {Markup} from 'interweave';

import img2 from '../design/images/frontpage/impression/img2.jpeg';

import '../design/css/leden.css'


const Collapse = ({children, title, page}) => {
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getText/${page + localStorage.getItem('language')}`)
          .then(response => {
            setText(response.data[0].text);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    return (
    <>
        <CButton style={{backgroundColor:"#376cd2", marginTop:"3vh", maxWidth:"90%", margin:"auto", marginTop:"10px"}} onClick={(event) => {event.preventDefault(); setVisible(!visible)}}>{title}</CButton>
        {/* <CCollapse visible={visible} style={{overflow:"scroll"}}> */}
        <CCollapse visible={visible}>
        <CCard style={{maxWidth:"90%", margin:"auto"}} className="mt-3">
            <CCardBody>
                <Markup content={text}></Markup>
            </CCardBody>
        </CCard>
        </CCollapse>
    </>
    );
}


const Leden = () => {
    return (
        <Component img={img2} component={<>
            <Collapse title={"Zaaldienst"} page={"zaaldienst"}/>
            <Collapse title={"DWF"} page={"dwf"}/>
            <Collapse title={"Wedstrijd verzetten"} page={"verzetten"}/>
            <Collapse title={"Vertrouwenspersoon"} page={"vertrouwenspersoon"}/>
            <Collapse title={"Declaratieformulier"} page={"declaratielink"}/>
            <Collapse title={"Fluitschema"} page={"fluitschema"}/>
        </>}/>

    );
}


export default Leden;