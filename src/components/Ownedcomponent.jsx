import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ownedcomponent = () => {
    const [data, setData] = useState([]);
    const [data1,setData1]=useState([]);
    const [roomImages, setRoomImages] = useState({});
    const [hoveredRoomId, setHoveredRoomId] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users/2");
                const rooms = response.data.rooms;
                setData(rooms);

                // Fetch images per room and organize them in an object
                const imagePromises = rooms.map(room =>
                    axios.get(`http://localhost:8080/rooms/${room.roomid}`)
                        .then(res => ({
                            roomId: room.roomid,
                            images: res.data.images
                        }))
                );

                const imageResults = await Promise.all(imagePromises);

                const imagesByRoom = {};
                imageResults.forEach(({ roomId, images }) => {
                    imagesByRoom[roomId] = images;
                });

                setRoomImages(imagesByRoom);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };

        fetch();
    }, []);
    const handleclick = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/bookings/getbyid/${id}`);
            setData1(res.data);
            setSelectedRoomId(id); // Track which room's bookings are shown
        } catch (err) {
            console.error("Error fetching room details", err);
        }
    };
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Owned Rooms</h2>

            {data.length === 0 ? (
                <p>Sorry, you don't own any rooms</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {data.map((room) => {
                        const images = roomImages[room.roomid] || [];

                        return (
                            <div key={room.roomid} 
                            onMouseEnter={() => setHoveredRoomId(room.roomid)}
                            onMouseLeave={() => setHoveredRoomId(null)}
                            style={{
                                border: "1px solid rgb(0, 174, 239)",
                                borderRadius: "8px",
                                padding: "15px",
                                width: "300px",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                backgroundColor: hoveredRoomId === room.roomid ? "rgb(0, 174, 239)" : "white", // hover color
                                color:hoveredRoomId === room.roomid ? "white" : "black",
                                transition: "background-color 0.3s ease"}}
                            >
                                {/* Room Images */}
                                {images.map((img) => (
                                    <img
                                        key={img.imgId}
                                        src={img.imgUrl}
                                        alt={`Room ${img.roomId}`}
                                        style={{ width: '100%', height: '300px', marginBottom: '10px' }}
                                    />
                                ))}
                                <h3>Room Type: {room.roomtype}</h3>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    textAlign: "left",
                                    columnGap: "50px"
                                }}>
                                    <div>
                                        <p><strong>Description:</strong><br />{room.description}</p>
                                        <p><strong>Max Occupancy:</strong> {room.maxoccupancy}</p>
                                    </div>
                                    <div>
                                        <p><strong>Location:</strong> {room.location}</p>
                                        <p><strong>Price:</strong> ₹{room.price}</p>
                                        <p><strong>AC:</strong> {room.isac ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <button onClick={()=>handleclick(room.roomid)} style={{
                                    backgroundColor: hoveredRoomId === room.roomid ? "white" : "rgb(0, 174, 239)",
                                    color: hoveredRoomId === room.roomid ? "rgb(0, 174, 239)" : "white",
                                    border: "2px solid rgb(0, 174, 239)",
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease"
                                }}>See Bookings</button>
                                {selectedRoomId === room.roomid && (
                                (() => {
                                    const confirmedBookings = data1.filter((booking) => booking.status === "Confirmed");

                                    return (
                                        <div style={{ marginTop: "10px" }}>
                                            {confirmedBookings.length > 0 ? (
                                                confirmedBookings.map((booking) => (
                                                    <div key={booking.bookingId} className="user-card">
                                                        <p><strong>Name:</strong> {booking.user?.name}</p>
                                                        <p><strong>Phone:</strong> {booking.user?.phone}</p>
                                                        <p><strong>Email:</strong> {booking.user?.email}</p>
                                                        <p><strong>Start Date:</strong> {booking.startDate}</p>
                                                        <p><strong>End Date:</strong> {booking.endDate}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>
                                                    <p><strong>No confirmed bookings found.</strong></p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()
                            )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Ownedcomponent;
