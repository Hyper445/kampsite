import {Component} from './Index.js';
import {useEffect, useState} from 'react';
// import { Collapse } from './Utils.js';
import '../design/css/leden.css'
import TableWithoutInput from './NoinputTable.js';
import axios from 'axios';

import img7 from '../design/img7.jpeg';


export default function Index() {

    function iso_week_number(date) {

        const year = date.getFullYear();
        const beginYear = new Date(year, 0, 1);
        let week = Math.floor((date - beginYear) / (7 * 24 * 60 * 60 * 1000)) + 1;

        if (week === 0) {
            const lastYear = year - 1;
            const prevBeginYear = new Date(lastYear, 0, 1);
            week = Math.floor((date - prevBeginYear) / (7 * 24 * 60 * 60 * 1000)) + 1;
        }

        if (week === 1 && beginYear.getDay() !== 1)
            return 52;
        else
            return week;
    }

    const currentDate = new Date();
    const weekNumber = iso_week_number(currentDate);
  
    const evenWeeks = (
        <>
            <h3>Even weken</h3>
            <p>Maandag</p>
            <TableWithoutInput even={1} day={"Maandag"}/>

            <p>Donderdag</p>
            <TableWithoutInput even={1} day={"Donderdag"}/>
        </>
    )

    const unevenWeeks = (
        <>
            <h3>Oneven weken</h3>
            <p>Maandag</p>
            <TableWithoutInput even={0} day={"Maandag"}/>

            <p>Donderdag</p>
            <TableWithoutInput even={0} day={"Donderdag"}/>
        </>
    )

    return (

        <Component img={img7} component={<>


            <h4>The schedule of the current week is displayed on top! Currently it's
                an {weekNumber % 2 === 0 ? "even" : "uneven"} week!</h4>

            {weekNumber % 2 === 0 ? <>{evenWeeks}{unevenWeeks}</> : <>{unevenWeeks}{evenWeeks}</>}
        </>
        }/>

    )


}
