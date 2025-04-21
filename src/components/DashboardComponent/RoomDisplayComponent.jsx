import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomDisplayComponent = ({ rooms }) => {

  const navigate = useNavigate();
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return (
      <p style={{ padding: '20px', fontWeight: 'bold', color: '#d9534f' }}>
        🚫 No rooms match your filter criteria.
      </p>
    );
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      padding: '20px'
    }}>
      {rooms.map((room, index) => {
        const isAvailable = room.availability !== false;
        return (
          <div
            key={room.roomid || `room-${index}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid #ddd',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              backgroundColor: isAvailable ? '#fff' : '#f0f0f0',
              color: isAvailable ? '#000' : '#888',
              opacity: isAvailable ? 1 : 0.6,
              pointerEvents: isAvailable ? 'auto' : 'none',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {/* Image on top */}
            <img
              src={room.img_url || 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D'}
              alt={room.roomtype}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover'
              }}
            />

            {/* Room details */}
            <div style={{ padding: '16px', flexGrow: 1 }}>
              <h3 style={{
                marginBottom: '8px',
                textTransform: 'capitalize',
                textDecoration: isAvailable ? 'none' : 'line-through',
              }}>
                {room.roomtype || 'Room'} - {room.location}
              </h3>
              <p><strong>📍 Location:</strong> {room.location || 'N/A'}</p>
              <p><strong>💰 Price:</strong> ₹{room.price?.toLocaleString() || 'N/A'}</p>
              <p><strong>🌬️ AC:</strong> {room.isac ? 'Yes' : 'No'}</p>
              <p><strong>👥 Max Occupancy:</strong> {room.maxoccupancy || 'N/A'}</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                {room.description || 'No description available.'}
              </p>
              <p style={{ fontWeight: 'bold', marginTop: '8px', color: isAvailable ? '#28a745' : '#d9534f' }}>
                {isAvailable ? '✅ Available' : '❌ Not Available'}
              </p>
            </div>

            {/* Button bottom right */}
            <div style={{
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid #eee'
            }}>
              <button
                className='primary'
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => {navigate(`/rooms/getuserroom/${room.roomid}`)}}
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomDisplayComponent;
