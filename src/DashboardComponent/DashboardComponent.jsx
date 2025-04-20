import React, { useState,useEffect } from 'react'
import axios from "axios";

import "./DashboardComponent.css";

import NavBarComponent from '../NavBarComponent/NavBarComponent'
import FilterComponent from './FilterComponent'
import RoomDisplayComponent from './RoomDisplayComponent'

const DashboardComponent = () => {
  const [rooms,setRooms] = useState([]);
  const [filteredRooms,setFilteredRooms] = useState([]);
  const [filters,setFilters] = useState(
    {
      roomType: '',
      location:'',
      minPrice:'',
      maxPrice:'',
      isAc:'',
      availability:'',
      occupancy:''
    }
  );

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  }

  useEffect(() => {
    const fetchRoomsAndImages = async() => {
      try {
        const roomRes = await axios.get('http://localhost:8080/rooms/');
        const rooms = roomRes.data;
        const roomWithImages = await Promise.all(
          rooms.map(async (room) => {
            try {
              const imgRes = await axios.get(`http://localhost:8080/images/room/${room.roomid}`);
              const imgUrl = imgRes.data[0].imgUrl; // assuming single image
              return { ...room, img_url: imgUrl };
            } catch (imgErr) {
              console.error(`Image fetch failed for room ${room.room_id}:`, imgErr);
              return { ...room, img_url: null }; // fallback
            }
          })
        );
        setRooms(roomWithImages);
        setFilteredRooms(roomWithImages);
      } catch (error) {
        console.log("Room fetch error: ",error);
      }
    }
    fetchRoomsAndImages();
  },[])

  useEffect(() => {
    const results = rooms.filter((room) => {
      const matchType = filters.roomType
        ? room.roomtype.toLowerCase() === filters.roomType.toLowerCase()
        : true;
  
      const matchLocation = filters.location
        ? room.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
  
      const minPrice = filters.minPrice !== '' ? parseInt(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice !== '' ? parseInt(filters.maxPrice) : 100000;
      const matchPrice = room.price >= minPrice && room.price <= maxPrice;
  
      const matchAc = filters.isAc !== null
      ? room.isac === filters.isAc
      : true;
  
      const matchOccupancy = filters.occupancy !== null
      ? room.maxoccupancy >= parseInt(filters.occupancy)
      : true;

      const matchAvailability = filters.available !== null
      ? room.availability === filters.available
      : true;

      return matchType && matchLocation && matchPrice && matchAc && matchOccupancy && matchAvailability;
    });
    setFilteredRooms(results);
  }, [filters]);

  return (
    <>
      <NavBarComponent />

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <FilterComponent applyFilters={applyFilters} />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <RoomDisplayComponent rooms={filteredRooms} />
        </div>
      </div>

    </>
  );
}

export default DashboardComponent
