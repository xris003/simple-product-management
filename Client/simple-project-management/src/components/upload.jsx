import React, { useState } from 'react';
import {db} from "../firebase/config"
import './upload.css';


const UploadForm = () => {
    const sendData = (event) => {
        event.preventDefault();

        const elementsArray = [...event.target.elements];

        console.log(elementsArray)

        const formData = elementsArray.reduce((accumulator, currentValue) => {
            if (currentValue.id) {
                accumulator[currentValue.id] = currentValue.value;
            }

            return accumulator;

        }, {});

        db.collection("SimpleProject").add(formData)
    }


// const UploadForm = () => {
//   const [name, setName] = useState('');
//   const [image, setImage] = useState(null);
//   const [location, setLocation] = useState('');

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can add your logic for handling form submission here
//     console.log({ name, image, location });
//   };

  return (
    <div className="upload-form">
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name}  />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*"  />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" value={location}  />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
 };

export default UploadForm;
