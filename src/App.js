// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {HashRouter, Route, Routes} from "react-router-dom";

// import Layout from "./pages/Layout";
import Index from './pages/Index.js';
import Teams from './pages/Teams.js';
import Leden from './pages/Leden.js';
import Training from "./pages/Training";
import TeamPage from "./pages/TeamPage";
import GeneralPage from "./pages/GeneralPage";
import MerchPage from "./pages/MerchPage.js";
import TicketsPage from "./pages/TicketsPage.js";
import Home from "./pages/admin/Admin";
import {Footer, Header} from './pages/Utils.js';

function App() {

    if (localStorage.getItem('language') === null) localStorage.setItem('language', "NL");

    return (

        // <BrowserRouter scrollToTop={true}>
        <HashRouter scrollToTop={true}>
            <Routes>
                <Route path="admin" element={<Home/>}/>
                <Route path="/" element={<HeaderAndFooter/>}>
                    <Route index element={<Index/>}/>
                    <Route path="teams" element={<Teams/>}/>
                    <Route path="algemeen" element={<Leden/>}/>
                    <Route path="training" element={<Training/>}/>
                    <Route path="team" element={<TeamPage/>}/>
                    <Route path="merch" element={<MerchPage/>}/>
                    <Route path="tickets" element={<TicketsPage/>}/>
                    <Route path="*" element={<GeneralPage/>}/>
                </Route>
            </Routes>
            {/* </BrowserRouter> */}
        </HashRouter>
    );
}

function HeaderAndFooter({children}) {

    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}

export default App;
