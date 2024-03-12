import { useEffect, useState } from 'react';
import axios from 'axios';

import '../design/css/index.css';
import '../App.css';

const TableWithoutInput = ({ even, day }) => {
    const [tableData, setTableData] = useState([
        { time: '18:00', field1: '', field2: '', field3: '', field4: '' },
        { time: '19:20', field1: '', field2: '', field3: '', field4: '' },
        { time: '20:40', field1: '', field2: '', field3: '', field4: '' },
        { time: '22:00', field1: '', field2: '', field3: '', field4: '' },
    ]);

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${localStorage.getItem('host')}/api/getSchedule`, {
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

    const getInitialTeams = data => {
        setTableData(prevTableData =>
            prevTableData.map(row => ({
                ...row,
                field1: findTeam(row.time, 1),
                field2: findTeam(row.time, 2),
                field3: findTeam(row.time, 3),
                field4: findTeam(row.time, 4),
            }))
        );
    };

    const findTeam = (time, field) => {
        const foundItem = data.find(item => item.tijd === time && item.veld === field);
        return foundItem ? foundItem.team : '';
    };

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
                    {tableData.map(row => (
                        <tr key={row.time}>
                            <th scope="row">{row.time}</th>
                            <td>{row.field1}</td>
                            <td>{row.field2}</td>
                            <td>{row.field3}</td>
                            <td>{row.field4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableWithoutInput;
