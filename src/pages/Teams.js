import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from 'react';
import '../design/css/teams.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Component} from "./Index";

import axios from 'axios';


// Code snippet from Danziger's Stack Overflow answer:
// https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but
const FadeInSection = ({
                           children, type, number, img
                       }) => {
    const domRef = useRef();
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                observer.unobserve(domRef.current);
            }
        });

        observer.observe(domRef.current);

        return () => observer.disconnect();
    }, []);

    return (<section id={type + number} style={{
        marginBottom: "75px",
        objectFit: "fill",
        height: "40vh",
        maxHeight: "500px",
        maxWidth: "500px"
    }} ref={domRef} className={isVisible ? ' is-visible teams' : 'teams'}>{children}</section>);
};


const Teams = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getTeams`)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    const style = {
        bottom: "0",
        paddingTop: "1%",
        position: "absolute",
        backgroundColor: "rgba(55,108,210,.7)",
        fontSize: "140%",
        margin: "auto",
        textAlign: "center",
        zIndex: "10",
        color: "white",
        fontFamily: "RobotoBold",
        WebkitTextStroke: ".1px black",
        height: "content-fit",
        width: "100%",
        borderRadius: "0px 0px 10px 10px"
    };

    const items = data.map((item, index) => (
        <>
            <Col lg={4} md={6} sm={12}>
                <FadeInSection key={index} type={item.type} number={item.nummer} img={item.type[0] + item.nummer + ".png"}>
                    <Link style={{width:"100%"}} to='/team' state={{ID: `${item.ID}`, IMG: `${item.type[0] + item.nummer + ".png"}`, TYPE: `${item.type}`, NUMBER: `${item.nummer}`}}>
                        <div style={style}>{item.type}  {item.nummer}</div>
                        <img className={"imageHover"} src={require(`../design/images/teams/${imageExists(item) && item.type[0] + item.nummer + ".png" || 
                        !imageExists(item) && "UvO_logo.jpeg"}`)} style={{
                            borderRadius:"10px", 
                            width: "100%", 
                            height:"100%",
                            position:"relative"}}></img>
                    </Link>
                </FadeInSection>
            </Col>
        </>
    ));

    return (

        <Component component={
            <Row style={{margin: "auto", width: "100vw", height: "fit-content", minHeight: "55vh"}}>
                {items}
            </Row>}/>
    );


}

function imageExists(team) {

    try {
        require(`../design/images/teams/${team.type[0] + team.nummer + ".png"}`);
        return true;
    } catch (error) {
        return false;
    }
}

export default Teams;
