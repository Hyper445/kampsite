import {useState} from 'react';
import '../../design/css/index.css';
import '../../App.css';

function Uploads() {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!file) {
        alert('Please choose a file to upload');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {

        const response = await fetch(`${localStorage.getItem('host')}/upload/${'frontpage'}`, {
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
    }}

    return (
        <div>
            <h2>File Upload</h2>
            <h3>Slides</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}

export default Uploads;