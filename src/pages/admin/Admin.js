import {useEffect, useState} from 'react';
import axios from 'axios';

import Uploads from './Uploads.js';
import Pages from './Pages.js';
import TeamSettings from './TeamSettings.js';
import TrainSchedule from './Schedule.js'

import '../../design/css/index.css';
import '../../App.css';


const Home = () => {

    const components = [<Pages/>, <Uploads/>, <TeamSettings/>, <TrainSchedule/>];
    const names = ["Edit a page's text", "Upload a file", "Change teams", "Change training schedule"];

    const [name, setName] = useState("");
    const [passWord, setPassWord] = useState("");

    const [active, setActive] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);

    const [credentials, setCredentials] = useState([]);

    useEffect(() => {

        // Check if there is a stored login status in local storage
        const storedLoginStatus = localStorage.getItem('isLoggedIn');

        if (storedLoginStatus) {
            // If there is a stored status, update the state
            setLoggedIn(JSON.parse(storedLoginStatus));
        }

        if (!loggedIn) {
            axios.get(`${localStorage.getItem('host')}/api/getCredentials`)
            .then(response => {
                setCredentials(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
        else {

        }
    }, []);

    const showCredentials = () => {
        if (passWord === credentials.geheim && name === credentials.gebruiker) {
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            setLoggedIn(true);
        }
    }

    return (

        <div className="admin">
            <section className={'is-visible standard'} style={{backgroundColor: "rgba(255,255,255,0"}}>
                {/* <img style={{position:"absolute", width:"500px", height:"400px", margin:"auto", zIndex:"1"}} src={construction}></img> */}
                {loggedIn &&
                    <div class="container">
                        <div class="row">
                            <div className="col-md-4"><img style={{width: "100px"}}
                                                           src={require(`../../design/UvO_logo.jpeg`)}></img></div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4"></div>

                        </div>
                        <div class="row">
                            <div className="col-md-12">
                                <p>Questions or wanting to ask about my day? Email dennis2703@hotmail.nl</p>
                                <p>Use the buttons below to navigate through different website functionalities</p>
                            </div>
                            <div className="col-md-12">
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    {components.map((item, index) => (
                                        <button type="button" class="btn btn-dark" key={index}
                                                onClick={() => setActive(index)}>{names[index]}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-12" style={{paddingTop: "5vh"}}>
                                {components[active]}
                            </div>
                        </div>
                    </div>
                }
                {!loggedIn &&
                    <div style={{width: "100vw", height: "100vh"}} className="loginContainer">
                        <div style={{
                            width: "10vw",
                            height: "10vh",
                            position: "absolute",
                            marginRight: "auto",
                            marginLeft: "auto"
                        }} className="enter">
                            <p>Login</p>
                            <input onChange={e => setName(e.target.value)}/>
                            <input type="password" onChange={e => setPassWord(e.target.value)}/>
                            <input type="submit" value="Submit" onClick={() => showCredentials()}/>
                        </div>
                    </div>
                }
            </section>
        </div>
    );
}


export default Home;
