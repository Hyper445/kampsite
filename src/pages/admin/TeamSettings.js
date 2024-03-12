import {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../../design/css/index.css';
import '../../App.css';


const GenderSelector = ({selectedGender, onGenderChange}) => {
    const handleCheckboxChange = (gender) => {
        onGenderChange(gender);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", marginTop: "10px"}}>
            <label>
                <input
                    type="checkbox"
                    checked={selectedGender === "Dames"}
                    onChange={() => handleCheckboxChange("Dames")}
                />
                Dames
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={selectedGender === "Heren"}
                    onChange={() => handleCheckboxChange("Heren")}
                />
                Heren
            </label>

	    <label>
	    	<input
	    		type="checkbox"
	    		checked={selectedGender === "Beginners"}
	    		onChange={() => handleCheckboxChange("Beginners")}
	    	/>
	    	Beginners
	    </label>
        </div>
    );
};

function FormDialog({type, handleClick, team}) {
    const [open, setOpen] = useState(false);

    const [klasse, setKlasse] = useState("");
    const [teamNumber, setTeamNumber] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
    };

    const createNewTeam = () => {
      const apiUrl = `${localStorage.getItem('host')}/api/saveTeam`;
  
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: selectedGender, nummer: teamNumber, klasse:klasse }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const addMember = () => {


        const apiUrl = `${localStorage.getItem('host')}/api/addMember`;
  
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_ID: team.ID,
                voornaam: firstName,
                achternaam: lastName,
                positie: position,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                handleClick(team.ID);
                handleClose();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <button
                style={{marginRight: "10px", marginBottom: "10px"}}
                className="btn btn-success"
                onClick={handleClickOpen}
            >
                Add {type}
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add {type}</DialogTitle>
                <>
                    {type === "team" ?
                        <>
                            <DialogContent>
                                <DialogContentText>
                                    Specify which team you want to add :)
                                </DialogContentText>
                                <GenderSelector
                                    selectedGender={selectedGender}
                                    onGenderChange={handleGenderChange}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Team number"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setTeamNumber(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Class (f.e. 4e klasse)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setKlasse(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={createNewTeam}>Submit</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </>

                        :
                        <>
                            <DialogContent>
                                <DialogContentText>
                                    Who do you want to add?
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="First name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Last name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Position (leave open if not known)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => setPosition(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={addMember}>Submit</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </>
                    }
                </>
            </Dialog>
        </>
    );
}


function TeamSettings() {

    const [members, setMembers] = useState([]);
    const [team, setTeam] = useState(null);
    const [data, setData] = useState([]);
    const [quote, setQuote] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  

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

    const updateTeam = () => {

        const apiUrl = `${localStorage.getItem('host')}/api/updateTeam`;
    
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({members: members, quote: quote, team: team}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!file) {
          alert('Please choose a file to upload');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
	    console.log(localStorage.getItem('host'));

        const url = `${localStorage.getItem('host')}/upload/${'teams'}/${team.type[0] + team.nummer}`;

        console.log(`Debug: ${url}`);
	
        try {
  
          const response = await fetch(url, {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            alert('File uploaded successfully');
          } else {
            alert('Failed to upload file');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };


    const deleteMember = (ID) => {
        axios.delete(`${localStorage.getItem('host')}/api/deleteMember/${ID}`)
            .then(response => {
                console.log("Goedzo");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        handleClick(ID);
    }

    const handleInputChange = (index, name, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = {...updatedMembers[index], [name]: value};
        setMembers(updatedMembers);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    {data.map((item, index) => (
                        <button className="btn btn-primary" style={{marginRight:"10px", marginBottom:"10px"}} key={index} onClick={() => {handleClick(item.ID); setTeam(item); setQuote(item.quote)}}>
                            {item.type + item.nummer}
                        </button>
                    ))}
                    <FormDialog type={"team"}/>
                    <br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1 col-sm-12"/>
                <div className="col-md-6 col-sm-12" style={{overflowX: "auto"}}>
                    <form style={{color: 'black', fontFamily: 'Arial', fontSize: '18px'}}>
                        {members.length !== 0 && members.map((item, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                name="first name"
                                value={item.voornaam || ''}
                                onChange={(e) => handleInputChange(index, 'voornaam', e.target.value)}
                            />
                            <input
                                name="last name"
                                value={item.achternaam || ''}
                                onChange={(e) => handleInputChange(index, 'achternaam', e.target.value)}
                            />
                            <input
                                name="position"
                                placeholder="position"
                                value={item.positie || ''}
                                onChange={(e) => handleInputChange(index, 'positie', e.target.value)}
                            />
                            <button onClick={() => {console.log("1"); deleteMember(item.ID);}} className='btn btn-danger'>X</button>
                            </div>
                        ))}
                    </form>
                    {team !== null &&
                        <FormDialog type={"member"} handleClick={handleClick} team={team}/>

                    }
                </div>
                <div className="col-md-3 col-sm-12">
                    {team !== null && team.foto !== null &&
                    <> {imageExists(team) &&
                        <img src={require(`../../design/images/teams/${team.type[0] + team.nummer + ".png"}`)} style={{
                            borderRadius:"10px", 
                            width: "100%", 
                            height:"50%",
                            position:"relative"}}
                            >
                        </img>}
                        <br/>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleSubmit}>Upload</button> 
                        <br/>
                        <textarea style={{width:"100%", height:"200px", textAlign:"top"}} name="quote" value={quote} placeholder="This team does not have a quote yet!" onChange={(e) => setQuote(e.target.value)}/>
                    </> }

                    {team !== null && team.foto === null &&
                    <>
                        <br/>
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleSubmit}>Upload</button> 
                        <br/>
                        <textarea style={{width:"100%", height:"200px", textAlign:"top"}} name="quote" placeholder="This team does not have a quote yet!" onChange={(e) => setQuote(e.target.value)}/>
                    </>
                    }
                </div>
            </div>
            <br/>
            <div className='row'>
                <div className="col-md-5"/>
                <div className="col-md-3">
                    <button onClick={updateTeam}>Click to update <b>{team !== null ? team.type + team.nummer : ""}</b>
                    </button>
                </div>
                <div className="col-md-4"/>
            </div>
            <br/>
        </>

    )
}

function imageExists(team) {

    try {
        require(`../../design/images/teams/${team.type[0] + team.nummer + ".png"}`);
        return true;
    } catch (error) {
        return false;
    }
}


export default TeamSettings;
