import {useEffect, useState} from 'react';
import axios from 'axios';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../design/css/index.css';
import '../../App.css';

function DropDown({title, buttons, children}) {
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
        color: "black",
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
                style={{marginTop: "-20px", width: "20%"}}
            >
                {children}
            </div>
        </div>
    );
}


function Pages() {

    const [page, setPage] = useState("");
    const [data, setData] = useState("");
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get(`${localStorage.getItem('host')}/api/getText/all`)
          .then(response => {
            setPages(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);


    const handleClick = (page) => {

        axios.get(`${localStorage.getItem('host')}/api/getText/${page}`)
        .then(response => {
            console.log(response)
            setData(response.data[0].text);
            setPage(page);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        }); 
    }

    const handleSubmit = async (e) => {

        try {
          const response = await fetch(`${localStorage.getItem('host')}/api/setText`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ page, data }),
            });

            if (response.ok) {
                alert('Text updated successfully');
            } else {
                alert('Failed to update text');
            }
        } catch (error) {
            console.error('Error updating text:', error);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-3">
                    <DropDown title={"Select page to change text"}>
                        {pages.map((item, index) => (
                            <button key={index} onClick={() => handleClick(item.page)}>{item.page}</button>
                        ))}
                    </DropDown>

                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                    <button onClick={handleSubmit}>Click to update <b>{page}</b></button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <CKEditor
                        editor={ClassicEditor}
                        data={data}
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            setData(editor.getData());
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
            </div>
        </>

    )
}

export default Pages;