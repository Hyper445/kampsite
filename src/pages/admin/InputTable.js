import {useEffect, useState} from 'react';
import axios from 'axios';

import '../../design/css/index.css';
import '../../App.css';


const TableWithInput = ({even, day}) => {
    // Initial state for table data
    const [tableData, setTableData] = useState([
        {time: '18:00', field1: '', field2: '', field3: '', field4: ''},
        {time: '19:20', field1: '', field2: '', field3: '', field4: ''},
        {time: '20:40', field1: '', field2: '', field3: '', field4: ''},
        {time: '22:00', field1: '', field2: '', field3: '', field4: ''},
    ]);
    const [data, setData] = useState([]);
    const [initialTeams, setInitialTeams] = useState({});

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getSchedule`, {
          params: {
            week: even,
            day: day,
          },
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [even, day]);

    useEffect(() => {

        getInitialTeams(data);

    }, [data]);

    const saveSchedule = () => {
        const apiUrl = `${localStorage.getItem('host')}/api/saveSchedule`;
    
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({tableData, even: even, day: day}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // Function to update the table data
    const handleInputChange = (time, field, value) => {
        setTableData((prevData) =>
            prevData.map((row) =>
                row.time === time ? {...row, [field]: value} : row
            )
        );
    };

    const getInitialTeams = (data) => {

        tableData.forEach(row => {

            for (let i = 1; i < 5; i++) {

                row['field' + i] = findTeam(row.time, i);

            }
        });

        console.log(tableData);
    };

    const findTeam = (time, field) => {

        console.log(data, time, field);

        const foundItem = data.find(item => item.tijd === time && item.veld === field);
        let team = "";
        foundItem === undefined ? team = "" : team = foundItem.team;
        return team;

    }

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Veld 1</th>
                    <th scope="col">Veld 2</th>
                    <th scope="col">Veld 3</th>
                    <th scope="col">Veld 4</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((row) => (
                    <tr key={row.time}>
                        <th scope="row">{row.time}</th>
                        <td>
                            <input
                                type="text"
                                value={row.field1}
                                onChange={(e) =>
                                    handleInputChange(row.time, 'field1', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.field2}
                                onChange={(e) =>
                                    handleInputChange(row.time, 'field2', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.field3}
                                onChange={(e) =>
                                    handleInputChange(row.time, 'field3', e.target.value)
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.field4}
                                onChange={(e) =>
                                    handleInputChange(row.time, 'field4', e.target.value)
                                }
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className="btn btn-dark " onClick={saveSchedule}>Update</button>
            <br/><br/>
        </div>
    );
};

export default TableWithInput;
