import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rentedcomponent = () => {
    const [data, setData] = useState([]);
    const [roomImages, setRoomImages] = useState({});
    const [data1, setData1] = useState([]);
    const [hoveredRoomId, setHoveredRoomId] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users/2");
                const bookings = response.data.booking;
                setData(bookings);

                // Fetch room images for each booking
                const imagePromises = bookings.map(book =>
                    axios.get(`http://localhost:8080/rooms/${book.room.roomid}`)
                        .then(res => ({
                            roomId: book.room.roomid,
                            images: res.data.images
                        }))
                );

                const imageData = await Promise.all(imagePromises);

                // Convert to object: { roomId: images }
                const imageMap = {};
                imageData.forEach(item => {
                    imageMap[item.roomId] = item.images;
                });

                setRoomImages(imageMap);

            } catch (err) {
                console.error("Error fetching data", err);
            }
        };

        fetch();
    }, []);

    const handleclick = async (val) => {
        try {
            const res = await axios.get(`http://localhost:8080/rooms/${val}`);
            setData1([res.data.owner]);
        } catch (err) {
            console.error("Error fetching room details", err);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Rented House</h2>

            {data.length === 0 ? (
                <p>Sorry, you didn't rent any room</p>
            ) : (
                data.map((book) => {
                    const images = roomImages[book.room.roomid] || [];

                    return (
                        <div key={book.room.roomid} 
                        onMouseEnter={() => setHoveredRoomId(book.room.roomid)}
                        onMouseLeave={() => setHoveredRoomId(null)}
                        style={{
                            border: "1px solid rgb(0, 174, 239)",
                            borderRadius: "8px",
                            padding: "15px",
                            width: "300px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            backgroundColor: hoveredRoomId === book.room.roomid ? "rgb(0, 174, 239)" : "white", // hover color
                            color:hoveredRoomId === book.room.roomid ? "white" : "black",
                            transition: "background-color 0.3s ease"}}
                        >
                            {/* Images above room type */}
                            {images.map((img) => (
                                <img
                                    key={img.imgId}
                                    src={img.imgUrl}
                                    alt={`Room ${img.roomId}`}
                                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                />
                            ))}

                            <h3>{book.room.roomtype}</h3>

                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                textAlign: "left",
                                columnGap: "50px"
                            }}>
                                <div>
                                    <p><strong>Description:</strong> {book.room.description}</p>
                                    <p><strong>Max Occupancy:</strong> {book.room.maxoccupancy}</p>
                                </div>
                                <div>
                                    <p><strong>Location:</strong> {book.room.location}</p>
                                    <p><strong>Price:</strong> ₹{book.room.price}</p>
                                    <p><strong>AC:</strong> {book.room.isac ? "Yes" : "No"}</p>
                                </div>
                            </div>

                            <button onClick={()=>handleclick(book.room.roomid)} style={{
                                    backgroundColor: hoveredRoomId === book.room.roomid ? "white" : "rgb(0, 174, 239)",
                                    color: hoveredRoomId === book.room.roomid ? "rgb(0, 174, 239)" : "white",
                                    border: "2px solid rgb(0, 174, 239)",
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease"
                                }}>
                                See Owner Details
                            </button>

                            {data1.length === 0 ? null : (
                                data1.map((udetails) => (
                                    <div key={udetails.user_id}>
                                        <p><strong>Name</strong>: {udetails.name}</p>
                                        <p><strong>Phone</strong>: {udetails.phone}</p>
                                        <p><strong>Email</strong>: {udetails.email}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Rentedcomponent;
