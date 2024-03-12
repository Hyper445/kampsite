import {useParallax} from "react-scroll-parallax";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Markup} from 'interweave';
import {useCallback, useEffect, useRef, useState} from 'react';
import placeholder from '../design/images/natuur.jpeg';
import axios from 'axios';
import {HashLink} from "react-router-hash-link";
import {Overlay} from "./Utils";

import {Link} from "react-router-dom";
import anime from "animejs/lib/anime.es.js"
import Divider from '@mui/material/Divider';

import '../design/css/index.css'
import '../App.css';

const isEn = localStorage.getItem('language') === "EN";
localStorage.setItem('host', process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : "http://localhost:3001");

const rowStyle = {paddingTop: "10px", paddingBottom: "10px", fontSize: "80%"};

const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addListener(updateTarget);

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
};

// Code snippet from Danziger's Stack Overflow answer:
// https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but
export function FadeInSection({children, name}) {

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

    return (<div ref={domRef} className={isVisible ? ' is-visible ' + name : name}>
        {children}
    </div>);
}


const Feed = () => {

    const [feedData, setFeedData] = useState([]);

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getFeed/all`)

            .then(response => {

                setFeedData(response.data.slice(1, 12));

            })
            .catch(error => {
                console.error('Error fetching RSS data:', error);
            });
    }, []);

    const lan = localStorage.getItem('language');

    return (
        <>
            <Col sm={7} style={{overflow: "auto"}}>
                <h2>{isEn ? "Matches " : "Wedstrijden"}</h2>
                <table className="table table-hover" style={{width: "100%"}}>
                    <thead>
                    <tr style={{fontFamily: "RobotoThin"}}>
                        <th scope="col">{lan === "EN" ? "Date" : "Datum"}</th>
                        <th scope="col">{lan === "EN" ? "Time" : "Tijd"}</th>
                        <th scope="col">{lan === "EN" ? "Home team" : "Team thuis"}</th>
                        <th scope="col">{lan === "EN" ? "Away team" : "Team uit"}</th>
                        <th scope="col">{lan === "EN" ? "Hall" : "Zaal"}</th>
                        <th scope="col">{lan === "EN" ? "Place" : "Plaats"}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedData.map((item, index) => (
                        <tr key={index} style={{fontFamily: "LatoRegular", color: "black", backgroundColor: "#ffffff"}}>
                            <th style={rowStyle}
                                scope="row">{(new Date((item[0] - 25569) * 86400000)).getDate()} / {(new Date((item[0] - 25569) * 86400000)).getMonth() + 1}</th>
                            <td style={rowStyle}>{convHours(item[1]) === -1 ? "Moved" : convHours(item[1]) + " : " + (new Date((item[1] - 25569) * 86400000)).getMinutes().toString().padStart(2, '0')}</td>
                            <td style={rowStyle}>{item[2].includes("UvO") ?
                                <b style={{color: "#75c7ff"}}>{item[2]}</b> : item[2]}</td>
                            <td style={rowStyle}>{item[3].includes("UvO") ?
                                <b style={{color: "#75c7ff"}}>{item[3]}</b> : item[3]}</td>
                            <td style={rowStyle}>{item[10]}</td>
                            <td style={rowStyle}>{item[11]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Col>
            <Col sm={5} style={{overflow: "auto"}}>
                <h2>Training</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9747.371666685542!2d4.949885660266133!3d52.355134224690815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x416539ba7d6c7dc7%3A0xc11838c18d279568!2sUvO%20Amsterdam!5e0!3m2!1snl!2snl!4v1692011334878!5m2!1snl!2snl"
                    style={{width: "100%", height: "75%", position: "relative", marginTop: "10%"}} allowFullScreen=""
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <br/><br/><b>Science Park 306, Amsterdam</b>
            </Col>
        </>
    );
}

const convHours = (hours) => {

    const calculated = new Date((hours - 25569) * 86400000).getHours() - 1;
    return calculated;

}

const Activities = () => {

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getActivities`)

            .then(response => {
                setActivityData(response.data.slice(1, 5));
            })
            .catch(error => {
                console.error('Error fetching RSS data:', error);
            });
    }, []);

    const [showMore, setShowMore] = useState(false);

    const handleSeeMoreClick = () => {
        setShowMore(true);
    };

    return (
        <Col sm={12}>
            {activityData.map((item, index) => (
                <div
                    key={index}
                    style={{
                        background: index === activityData.length - 1 ? "linear-gradient(180deg, rgba(55, 108, 210, .8) 0%, rgba(255, 255, 255, 0) 100%)" : "#376cd2",
                        color: "white",
                        fontFamily: "LatoRegular",
                        fontSize: "16px",
                        textAlign: "center",
                        borderRadius: "5px",
                        padding: "15px",
                        marginTop: "15px",
                        transition: "opacity 0.5s ease",
                        position: "relative",
                    }}
                >
                    {item.text}
                    @ {item.locatie}
                    on {item.datum.slice(0, 10)}
                </div>
            ))}
            <div style={{
                width: "max-content",
                height: "10%",
                position: "relative",
                marginLeft: "auto",
                marginRight: "auto",
                bottom: "0",
                color: "black",
                textAlign: "center"
            }}>
                <Link style={{color: "#75c7ff", fontFamily: "LatoBold", textDecoration: "none"}} to="Calendar">
                    Click to see more!
                </Link>
            </div>
        </Col>
    );
}

const SignUp = () => {
    return (
        <>
            <Col sm={7}>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeWLaAr0S6cBgUI3lWOJ9vA24qMP_DlUwF0DseY4vlHkaLl3A/viewform?embedded=true"
                    style={{
                        minHeight: "300px",
                        width: "100%",
                        height: "100%",
                        frameBorder: "0",
                        marginHeight: "0",
                        marginWidth: "0"
                    }}>Laden…
                </iframe>
            </Col>
            <Col sm={3}>
                <br/>
                <div id={"signup"} className="fb-page" data-href="https://www.facebook.com/UvO.Amsterdam/?locale=nl_NL"
                     data-tabs="timeline"
                     data-width=""
                     data-height=""
                     data-small-header="false"
                     data-adapt-container-width="true"
                     data-hide-cover="false"
                     data-show-facepile="true">
                    <blockquote cite="https://www.facebook.com/UvO.Amsterdam/?locale=nl_NL"
                                className="fb-xfbml-parse-ignore">
                        <a href="https://www.facebook.com/UvO.Amsterdam/?locale=nl_NL">UvO Amsterdam</a>
                    </blockquote>
                </div>
            </Col>
        </>
    );
}

const AboutUs = () => {

    // const [data, setData] = useState("");

    // useEffect(() => {
    //     axios.get(`${localStorage.getItem('host')}/api/getText/home${localStorage.getItem('language')}`)
    //       .then(response => {
    //         setData(response.data[0].text);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    // }, []);

    return (
        <>
            <Col sm={12} style={{textAlign: "center"}}>
                <Markup content={"*ZomerKamp in het kort*"}/>
            </Col>
            {/* <Col sm={2} style={{textAlign: "center"}}>
                <h2>Links</h2>
                <Link to="/training" style={{textDecoration: "none"}}><p>Training schedule</p></Link>
            </Col> */}

        </>
    );
}

const Atmosphere = () => {

    return (
        <>
            {[...Array(6)].map((e, i) =>
                <Col sm={6} md={4}>
                    <img src={require(`../design/images/frontpage/impression/img${i + 1}.jpeg`)}
                         style={{
                             paddingBottom: "10px", maxHeight: "300px", objectFit: "cover",
                             objectPosition: "center",
                             width: "100%",
                             height: "100%",
                             position: "relative",
                             borderRadius: "10px"
                         }}></img>
                    {console.log(`../design/images/frontpage/impression/img${i + 1}.jpeg`)}
                </Col>)}
        </>
    );
}


const components = [<AboutUs/>, <Activities/>, <SignUp/>, <Feed/>, <Atmosphere/>]

export const Component = ({text, img, component}) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <Row style={{minHeight: "50vh", width: "100vw", backgroundColor: "white", marginLeft: "0px"}}>
            {img ? <>
                    <div style={{height: "8vh", backgroundColor: "white"}}></div>
                    <div
                        className={`imageFade ${isVisible ? "show" : ""}`}
                        style={{
                            height: "30vh",
                            backgroundImage: `url(${img})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}></div>
                    <div style={{height: "5vh", backgroundColor: "white"}}></div>
                </>
                : <div style={{backgroundColor: "white", height: "15vh"}}></div>}
            <FadeInSection name={"component"}>
                {text ? <div>
                    <Divider style={{
                        width: "75%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        position: "relative",
                        top: "0",
                        fontSize: "25px",
                        color: "#090157",
                        fontFamily: "RobotoBold",
                        textTransform: "uppercase"
                    }}>
                        {text}
                    </Divider>
                    <div style={{height: "5vh"}}></div>
                </div> : <></>}
                <div className="row no-gutters">
                    {component}
                </div>
            </FadeInSection>
        </Row>
    );
};


export default function Index() {

    const myComponentRef = useRef(null);

    const animation = anime({
        targets: myComponentRef.current,
        scale: 4,
        duration: 2000,
        easing: 'spring(1, 100, 15, 0)',
    });

    const [index, setIndex] = useState(0);

    const parallax = useParallax({
        translateY: [-50, 50],
    });

    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -300;
        window.scrollTo({top: yCoordinate + yOffset, behavior: 'smooth'});
    }
    const isBreakpoint = useMediaQuery(300)

    console.log(localStorage.getItem('host'));

    return (
        <>
            <div className='slider' ref={parallax.ref}>
                <div
                    className='image' ref={myComponentRef}
                    style={{
                        backgroundImage: `url(${placeholder})`,
                        backgroundSize: 'cover',
                        // width:'100vw', 
                        height: '100%',
                        backgroundPosition: 'center',
                        filter: "brightness(85%)",
                        scale: ".25"
                    }}>
                </div>
            </div>

            <div className="textSections" style={{fontFamily: "RobotoRegular", textAlign: "center"}}>
                <Overlay>
                    <div className="tryoutsdiv">
                        <p style={{fontSize: "30px"}}>{"Ga jij mee op dit gezellige kamp?"}</p>
                        <HashLink smooth to={`/#signup`} style=
                            {{
                                color: "white",
                                textDecoration: "none",
                                backgroundColor: "#388B1B",
                                borderRadius: "5px",
                                padding: ".1%",
                                width: "170px",
                                maxWidth: "170px",
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "auto",
                                marginRight: "auto",
                                fontSize: "75%"
                            }} scroll={el => scrollWithOffset(el)}> {"Schrijf je nu in!"} </HashLink>
                    </div>
                </Overlay>
            </div>

            <Component component={components[0]}/>
            <Component text={isEn ? "Pictures" : "Foto's"} component={components[4]}/>
            {/* <Component text={isEn ? "Where to find us?" : "Waar vind je ons?"} component={components[3]}/> */}
            {/* <Component text={isEn ? "Sign up!" : "Schrijf je in!"} component={components[2]}/> */}
        </>
    );


}
