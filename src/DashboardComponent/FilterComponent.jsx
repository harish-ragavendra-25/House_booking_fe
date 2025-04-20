import React, { useState } from 'react';

const FilterComponent = ({ applyFilters }) => {
  const [roomType, setRoomType] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(10000);
  const [isAc, setIsAc] = useState(null);
  const [occupancy, setOccupancy] = useState('');
  const [available,setAvailable] = useState(null);

  const handleApplyFilters = () => {
    applyFilters({
      roomType,
      location,
      minPrice: 0,
      maxPrice: price,
      isAc,
      occupancy: occupancy ? parseInt(occupancy) : null,
      available,
    });
  };

  const handleToggleAc = () => {
    setIsAc((prev) => (prev === null ? true : !prev));
  };

  const handleToggleAvailability = () => {
    setAvailable((prev) => (prev === null ? true : !prev));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <label>Room Type:</label>
      <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
        <option value="">All</option>
        <option value="Studio">Studio</option>
        <option value="1BHK">1 BHK</option>
        <option value="2BHK">2 BHK</option>
        <option value="3BHK">3 BHK</option>
      </select>

      <label>Location:</label>
      <input
        type="text"
        placeholder="e.g. Mumbai"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label>Max Price: ₹{price}</label>
      <input
        type="range"
        min="0"
        max="10000"
        step="500"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <label>AC Available:</label>
      <button
        onClick={handleToggleAc}
        style={{
          padding: '6px 12px',
          backgroundColor: isAc === null ? '#ccc' : isAc ? '#4CAF50' : '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
      >
        {isAc === null ? 'Any' : isAc ? 'Yes' : 'No'}
      </button>

      <label>Available Rooms Only:</label>
      <button
        onClick={handleToggleAvailability}
        style={{
          padding: '6px 12px',
          backgroundColor: available === null ? '#ccc' : available ? '#4CAF50' : '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
      >
        {available === null ? 'Any' : available ? 'Yes' : 'No'}
      </button>

      <label>Max Occupancy:</label>
      <input
        type="number"
        placeholder="e.g. 2, 4"
        value={occupancy}
        onChange={(e) => setOccupancy(e.target.value)}
      />

      <button
        onClick={handleApplyFilters}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Apply Changes
      </button>
    </div>
  );
};

export default FilterComponent;
