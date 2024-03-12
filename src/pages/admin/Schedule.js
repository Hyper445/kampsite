import {useEffect, useState} from 'react';
import axios from 'axios';

import TableWithInput from './InputTable';

import '../../design/css/index.css';
import '../../App.css';

function TrainSchedule() {

    const [members, setMembers] = useState([]);
    const [team, setTeam] = useState("");
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


    const handleClick = (ID) => {

        axios.get(`${localStorage.getItem('host')}/api/getMembers/${ID}`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-3"></div>
                {/* <div className="col-md-3"><button onClick={handleSubmit}>Click to update <b>{team}</b></button></div> */}
            </div>
            <div className="row">
                <div className="col-md-12">

                    <h3>Even weken</h3>
                    <p>Maandag</p>
                    <TableWithInput even={1} day={"Maandag"}/>

                    <p>Donderdag</p>
                    <TableWithInput even={1} day={"Donderdag"}/>

                    <h3>Oneven weken</h3>
                    <p>Maandag</p>
                    <TableWithInput even={0} day={"Maandag"}/>

                    <p>Donderdag</p>
                    <TableWithInput even={0} day={"Donderdag"}/>

                </div>
            </div>
        </>

    )
}

export default TrainSchedule;