import {Component} from './Index.js';
import '../design/css/index.css'
import '../App.css';
// import image1 from '../design/images/shop/1.jpeg';
// import image2 from '../design/images/shop/2.jpeg';
// import image3 from '../design/images/shop/3.jpeg';
// import image4 from '../design/images/shop/4.jpeg';
// import image5 from '../design/images/shop/5.jpeg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import img6 from '../design/images/slide6.jpg';
import { height } from '@mui/system';

import Divider from '@mui/material/Divider';


const mystyle = {

    borderRadius:"10px", 
    width: "100%", 
    height:"100%",
    position:"relative", 
    objectFit:"cover", 
    objectPosition:"center",

}

function MerchPage() {

    const openURL = () => {
        window.location.href = 'https://clubs.deventrade.com/nl/uvo-amsterdam/clubcollectie';
    };

    return (
        <Component img={img6} component=
        { <>
        <Row style={{height:"10vh"}}>
            <Col sm={4}></Col>
            <Col style={{textAlign:"center", fontSize:"30px"}}sm={4}><p>Webshop</p></Col>
            <Col sm={4}></Col>
        </Row>
        <Row style={{height:"auto"}}>
            <Col sm={2}></Col>
            <Col style={{textAlign:"center", fontSize:"15px"}}sm={12} md={8}><p>
                <Divider/>
                <br></br>
                Babe wake up, UvO merch just dropped! 🚨
                <br></br>
                <br></br>
                - New shirts, new shorts, new track jackets and bottoms, new jackets and softshell, new sports bags
                <br></br>
                ALL custom with the UvO logo (Except womens shorts and socks)! 🤩
                <br></br>
                <br></br>
                UvO also receives a 10% cashback on every purchase, so your purchase will even help out the association!
                <br></br>
                <br></br>
                Lastly, take into account:
                <br></br>
                - Since the items are custom printed, they can’t be returned!
                <br></br>
                - The printed items shouldn’t be washed with softener and shouldn’t go in the dryer!
                <br></br>

                - The sizes fall a bit small, so I’d recommend taking a size larger than normal!
                <br></br>
                <br></br>
                The website is already live and ready for your orders! What are you waiting for? Go and get your UvO-wear now! 🤩
                <br></br>
                <button type="button" class="btn btn-dark" onClick={openURL}>Click here!</button>
                <br></br>
                <br></br>
                <br></br>

            </p></Col>
            <Col sm={2}></Col>
        </Row>
        <Row style={{height:"auto", maxWidth:"80vw", overflow:"hidden", margin:"auto"}} className="justify-content-between">
            <Col md={4} sm={12}>
                <img
                src={image1}
                alt="Image 1"
                style={mystyle}
                />
            </Col>
            <Col md={4} sm={12}>
                <img
                src={image2}
                alt="Image 2"
                style={mystyle}
                />
            </Col>
            <Col md={4} sm={12}>
                <img
                src={image3}
                alt="Image 3"
                style={mystyle}
                />
            </Col>
        </Row>
        <Row style={{paddingTop:"5vh", height:"auto", maxWidth:"80vw", overflow:"hidden", margin:"auto"}} className="justify-content-between">
            <Col md={2} sm={0}/>
            <Col md={4} sm={12}>
                <img
                src={image4}
                alt="Image 4"
                style={mystyle}
                />
            </Col>
            <Col md={4} sm={12}>
                <img
                src={image5}
                alt="Image 5"
                style={mystyle}
                />
            </Col>
            <Col md={2} sm={0}/>
        </Row>

            </>}
        
        />
    );
}


export default MerchPage;