import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Postform.css';

const PostRoom = () => {
  const [roomData, setRoomData] = useState({
    roomtype: '',
    location: '',
    price: '',
    isac: false,
    description: '',
    availability: true,
    maxoccupancy: '',
    oid: 1  // Direct oid property, no nested owner object
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData({
      ...roomData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...roomData,
      price: parseFloat(roomData.price),
      maxoccupancy: parseInt(roomData.maxoccupancy, 10),
      oid: parseInt(roomData.oid, 10)
    };

    try {
      // console.log("Sending room data:", formattedData); // Debug log
      
      // 1. Post room data to create the room
      const roomResponse = await axios.post("http://localhost:8080/rooms/addroom", formattedData);
      const newRoomId = roomResponse.data.roomid;
      console.log(newRoomId);
     

      // 2. Upload images separately
      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("roomId", newRoomId);

// Log the FormData contents
imageFormData.forEach((value, key) => {
    console.log(key, value);
});


        await axios.post("http://localhost:8080/api/photos", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(`Image uploaded for room ${newRoomId}`);
      }

      console.log("Room created and images uploaded successfully");
      // Reset form or redirect as needed
      
    } catch (error) {
      console.error("Error creating room or uploading images:", error);
      // Show error message to user
    }
  };
  
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Room Type:
        <input type="text" name="roomtype" value={roomData.roomtype} onChange={handleChange} required />
      </label><br />
      <label>
        Location:
        <input type="text" name="location" value={roomData.location} onChange={handleChange} required />
      </label><br />
      <label>
        Price:
        <input type="number" name="price" value={roomData.price} onChange={handleChange} required />
      </label><br />
      <label>
        AC Room:
        <input type="checkbox" name="isac" checked={roomData.isac} onChange={handleChange} />
      </label><br />
      <label>
        Description:
        <textarea name="description" value={roomData.description} onChange={handleChange} required />
      </label><br />
      <label>
        Available:
        <input type="checkbox" name="availability" checked={roomData.availability} onChange={handleChange} />
      </label><br />
      <label>
        Max Occupancy:
        <input type="number" name="maxoccupancy" value={roomData.maxoccupancy} onChange={handleChange} required />
      </label><br />
      <label>
        Upload Images:
        <input type="file" name="images" multiple accept="image/*" onChange={handleImageChange} />
      </label><br />
      <button type="submit">Post Room</button>
    </form>
  );
};

export default PostRoom;