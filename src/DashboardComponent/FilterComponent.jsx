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
    <div className="d-flex flex-column gap-3 p-3 border rounded shadow-sm bg-light">
      <div>
        <label className="form-label">Room Type:</label>
        <select
          className="form-select"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Studio">Studio</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
        </select>
      </div>

      <div>
        <label className="form-label">Location:</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Mumbai"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div>
        <label className="form-label">Max Price: ₹{price}</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="10000"
          step="500"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="acSwitch"
            checked={isAc === true}
            onChange={handleToggleAc}
          />
          <label className="form-check-label" htmlFor="acSwitch">
            AC Available
          </label>
        </div>
      </div>

      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="availableSwitch"
            checked={available === true}
            onChange={handleToggleAvailability}
          />
          <label className="form-check-label" htmlFor="availableSwitch">
            Available Rooms Only
          </label>
        </div>
      </div>

      <div>
        <label className="form-label">Max Occupancy:</label>
        <input
          type="number"
          className="form-control"
          placeholder="e.g. 2, 4"
          value={occupancy}
          onChange={(e) => setOccupancy(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-2" onClick={handleApplyFilters}>
        Apply Changes
      </button>
    </div>
  );
};

export default FilterComponent;
