import React, {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import usclogo from '../design/USCLogo.png';
import sklogo from '../design/sklogo.png';
import ssalogo from '../design/ssalogo.png';
import anime from "animejs/lib/anime.es.js"
import vulogo from '../design/vulogo.png';
import '../design/css/utils.css';

const maxWidth = 1000;

// If you want to add a new item to the dropdown menu, specify here the title of the menu and all the pages in the array
// Pages are linked through the dutch page names, so be sure to use these in the router component
var pagesDict = {
    // "Shop": {"EN": ["merch", "tickets"], "NL": ["merch", "tickets"]},
    "Info": {
        "EN": ["sign up", "general", "commitees"],
        "NL": ["inschrijven", "algemeen", "commissies"]
    },
    // "Teams": {"EN": ["teams", "training"], "NL": ["teams", "training"]}
}


const useMediaQuery = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [sideBar, setSideBar] = useState(false);

    // Function to determine which component to render based on the window width
    const updateComponent = () => {
        if (windowWidth > maxWidth) {
            setSideBar(false);
        } else {
            setSideBar(true);
        }
    };

    // Update the window width when the component mounts and when it resizes
    useEffect(() => {
        updateComponent();
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            updateComponent(); // Re-render based on updated window width
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    return sideBar;
};


const mystyle = {
    textDecoration: "none",
    fontSize: "16px",
    textTransform: "uppercase",
    color: "white"
};

const dropDownText = {
    textAlign: "center",
    textDecoration: "none",
    color: "black",
    fontSize: "13px",
    textTransform: "uppercase",
    marginTop: "auto",
    marginBottom: "auto"
};

export function DropDown({title, buttons, children, black}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const mystyle = {
        textDecoration: "none",
        fontSize: "16px",
        textTransform: "uppercase",
        color: black ? "black" : "white",
    };

    return (
        <div
            className={`dropdown${isOpen ? ' show' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p
                type="button"
                className="dropdown-toggle"
                style={mystyle}
            >
                {title}
            </p>
            <div
                className={`dropdown-menu${isOpen ? ' show' : ''}`}
                style={{height: "max-content"}}
            >
                {children}
            </div>
        </div>
    );
}

function DropdownList({page, buttons}) {

    return (
        <>
            {buttons.map((item, index) => (
                <React.Fragment key={index}>
                    <Link to={'/' + pagesDict[page]["NL"][index]} style={dropDownText}><p>{item}</p></Link>
                    {index !== buttons.length - 1 && <div className="dropdown-divider"></div>}
                </React.Fragment>))}
        </>
    );

}

export function Header() {

    const navigate = useNavigate();
    const isBreakpoint = useMediaQuery(maxWidth)
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const lan = localStorage.getItem('language');
    const isEn = lan === "EN";

    return (
        <>
            <div className='header'>
                <Sidebar/>
                {!isBreakpoint &&
                    <>
                        <div className='headerItems'>
                            <Link to="/" style={mystyle}><p>Home</p></Link>
                            {Object.entries(pagesDict).map(([key, value], index) =>
                                <React.Fragment key={index}>
                                    <DropDown title={key}>
                                        <DropdownList page={key} buttons={value[localStorage.getItem('language')]}/>
                                    </DropDown>
                                </React.Fragment>
                            )}
                            <Link to="/contact" style={mystyle}><p>Contact</p></Link>
                            {/* <img style={{marginTop: "4px", width: "40px", height: "20px", cursor: "pointer"}}
                                 onClick={() => {
                                     localStorage.setItem('language', lan === "NL" ? "EN" : "NL");
                                     window.location.reload()
                                 }} src={require(`../design/images/${lan === "EN" ? "NL" : "EN"}.png`)}/> */}
                        </div>
                    </>
                }
                <div className="imageText">
                    Zomerkamp Heerhugowaard
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export function Overlay({children}) {

    const myComponentRef = useRef(null);

    const animation = anime({
        targets: myComponentRef.current, // Target the component with the ref
        width: '100vw', // Target width
        duration: 2000, // Animation duration in milliseconds
        easing: 'spring(1, 50, 10, 0)', // Easing function
    });

    return (
        <div className='overlay' ref={myComponentRef}>
            {children}
        </div>
    )
}

export function Sidebar() {

    const isBreakpoint = useMediaQuery(maxWidth)

    const [open, setOpen] = useState(false);

    const handleMenuClick = () => {
        console.log(open);
        setOpen(!open);
    }

    const lan = localStorage.getItem('language');
    const isEn = lan === "EN";

    return (
        <> {isBreakpoint &&
            <div className={`sidebar ${open ? 'open' : ''}`}>
                <div className="menuButton" onClick={handleMenuClick}></div>
                {open && <div className={`menuItems show`}>
                    <Link to="/" style={mystyle} onClick={() => setOpen(!open)}><p>Home</p></Link>
                    <Link to="/inschrijven" style={mystyle} onClick={() => setOpen(!open)}>
                        <p>{isEn ? "Join uvo" : "Lid worden"}</p></Link>
                    <Link to="/algemeen" style={mystyle} onClick={() => setOpen(!open)}>
                        <p>{isEn ? "For members" : "Voor leden"}</p></Link>
                    <Link to="/commissies" style={mystyle} onClick={() => setOpen(!open)}>
                        <p>{isEn ? "Commitees" : "Commissies"}</p></Link>
                    <Link to="/contact" style={mystyle} onClick={() => setOpen(!open)}><p>Contact</p></Link>
                    <img style={{marginTop: "4px", width: "40px", height: "20px", cursor: "pointer"}} onClick={() => {
                        localStorage.setItem('language', lan === "NL" ? "EN" : "NL");
                        window.location.reload()
                    }} src={require(`../design/images/${lan === "EN" ? "NL" : "EN"}.png`)}/>
                </div>
                }
            </div>
        }
        </>
    )

}

export function Footer() {
    return (
        <div className='footer'>

            <div className='footerContent'>

                <p style={{textAlign: "center"}}><b>Sponsored by:</b></p>
                {/* <div className="sponsors">
                    <a href="https://www.studentensport.amsterdam/">
	    		<img src={ssalogo}></img>
                    </a>
	    	    <img src={sklogo}></img>
	    	    <a href="https://www.uscsport.nl/">
	    		<img src={usclogo}></img>
	    	    </a>
	    	    <a href="https://sportcentrumvu.nl/">
	    		<img src={vulogo}></img>
	    	    </a>
                </div> */}
                <p>© Zomer Kamp Heerhugowaard. Alle rechten voorbehouden.</p>
            </div>
        </div>
    )
}
