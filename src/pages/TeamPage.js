import {Component} from './Index.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../design/css/index.css'
import '../App.css';


const isEn = localStorage.getItem('language') === "EN";
const rowStyle = {paddingTop: "10px", paddingBottom: "10px", fontSize: "80%"};

function TeamPage() {

    const [members, setMembers] = useState([]);
    const [team, setTeam] = useState(undefined);
    const [results, setResults] = useState([]);

    const location = useLocation()
    const {ID, IMG, TYPE, NUMBER} = location.state;

    const getMembers = () => {
        axios.get(`${localStorage.getItem('host')}/api/getMembers/${ID}`)
          .then(response => {
            setMembers(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

      const getResults = () => {
        axios.get(`${localStorage.getItem('host')}/api/getFeed/` + TYPE[0] + NUMBER)

            .then(response => {
                setResults(response.data.slice(1, 10));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


      const getTeam = () => {
        axios.get(`${localStorage.getItem('host')}/api/getTeam/${ID}`)
          .then(response => {
            setTeam(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

    useEffect(() => {
        getTeam();
        getMembers();
        getResults();
    }, []);

    useEffect(() => {
        // setTeam(response.data);
        console.log(team);
    }, [team]);


    return (
        // <div className={'is-visible'}>
        <>
        {team !== undefined &&
        <Component component={team != undefined &&
        <>
            <Row style={{ width:"100%"}}>
                <Col sm={0} md={0} lg={2}></Col>
                <Col sm={12} md={12} lg={8} style={{textAlign:"center", fontFamily:"RobotoBold"}}>
                    {IMG !== "null" ? <img className={"shadow"} src={require(`../design/images/teams/${IMG}`)} style={{width: "45vw", height:"56vh", maxWidth:"500px", minWidth:"350px", minHeight:"300px", maxHeight:"350px", borderRadius:"10px", margin:"auto"}}></img>: <></>}
                    <br/><br/>
                    <h2>{TYPE} {NUMBER}</h2>
                    <i>{team[0].quote}</i>
                </Col>
                <Col sm={0} md={0} lg={2}></Col>
            </Row>
            <Row style={{width:"100%", maxWidth:"2000px", margin:"auto", marginTop:"10vh", paddingBottom:"15vh"}}>
                <Col sm={0} md={0} lg={1}></Col>
                <Col sm={12} md={12} lg={5} style={{textAlign:"center"}}>
                    <h3>{isEn? "Players" : "Spelers"}</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr style={{fontFamily: "RobotoThin"}}>
                            <th scope="col">{isEn ? "First name" : "Voornaam"}</th>
                            <th scope="col">{isEn ? "Last name" : "Achternaam"}</th>                          
                            <th scope="col">{isEn ? "Position" : "Positie"}</th>                          
                            </tr>
                        </thead>
                        <tbody>
                        {members.map((item, index) => (
                            <tr key={index} style={{fontFamily: "LatoRegular", color: "black", backgroundColor: "#ffffff"}}>
                                <td style={rowStyle}>{item.voornaam}</td>
                                <td style={rowStyle}>{item.achternaam}</td>
                                <td style={rowStyle}>{item.positie}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
                <Col sm={12} md={12} lg={5} style={{textAlign:"center"}}>
                    <h3>{isEn? "Results" : "Uitslagen"}</h3>
                    <table className="table table-hover" style={{width: "100%"}}>
                        <thead>
                            <tr style={{fontFamily: "RobotoThin"}}>
                            <th scope="col">{isEn ? "Date" : "Datum"}</th>
                            <th scope="col">{isEn ? "Home team" : "Team thuis"}</th>
                            <th scope="col">{isEn ? "Away team" : "Team uit"}</th>
                            <th scope="col">{isEn ? "Result" : "Uitslag"}</th>                            
                            </tr>
                        </thead>
                        <tbody>
                        {results.map((item, index) => (
                            <tr key={index} style={{fontFamily: "LatoRegular", color: "black", backgroundColor: "#ffffff"}}>
                                <th style={rowStyle} scope="row">{(new Date((item[0] - 25569) * 86400000)).getDate()} / {(new Date((item[0] - 25569) * 86400000)).getMonth() + 1}</th>
                                <td style={rowStyle}>{item[2].includes("UvO") ? <b style={{color:"#75c7ff"}}>{item[2]}</b> : item[2]}</td>
                                <td style={rowStyle}>{item[3].includes("UvO") ? <b style={{color:"#75c7ff"}}>{item[3]}</b> : item[3]}</td>
                                <td style={rowStyle}>{item[4]}</td>
                                {/* <td style={rowStyle}>{item[11]}</td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Col>
                <Col sm={0} md={0} lg={1}></Col>
            </Row>
        </>}>
        </Component>}
        {team === undefined && <p>loading</p> }
        </>
    );
}


export default TeamPage;
