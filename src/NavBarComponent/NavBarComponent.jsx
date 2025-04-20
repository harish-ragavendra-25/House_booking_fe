import React from 'react';
import './NavBarComponent.css';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {

  const navigate = useNavigate();
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light px-4 py-3 rounded-bottom shadow-sm">
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand" href="/dashboard">
            <img src="src/assets/house_book_logo.jpeg" alt="Bootstrap" width="50" height="40"/>
          </a>
          <a className="navbar-brand fw-bold  text-secondary" href="/dashboard">
            24/7 hrs Room Booking
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarDropdown"
            aria-controls="navbarDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Dropdown Menu */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarDropdown">

            {/* Desktop View: Icons */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <button className="btn" title="Add" onClick={() => navigate('/AddRoomForm')}>
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/plus--v1.png" alt="Add" />
              </button>
              <button className="btn" title="Cart" onClick={() => navigate('/cart')}>
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="Cart" />
              </button>
              <button className="btn" title="Profile" onClick={() => navigate('/profile')}>
                <img width="30" height="30" src="https://img.icons8.com/fluency/50/user-male-circle--v1.png" alt="Profile" />
              </button>
              <button className="btn btn-light text-primary border border-primary px-3 py-1 rounded-pill">
                Logout
              </button>
            </div>

            {/* Mobile View: Text */}
            <div 
              className="d-flex d-lg-none flex-column align-items-center w-100 mt-3 p-3" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(80px)', borderRadius: '12px' }}
            >
              <div className="btn btn-link text-center w-100 hover-effect" onClick={() => navigate('/AddRoomForm')}>Add Room</div>
              <div className="btn btn-link text-center w-100 hover-effect" onClick={() => navigate('/Cart')} >Cart</div>
              <div className="btn btn-link text-center w-100 hover-effect" onClick={() => navigate('/profile')}>Profile</div>
              <div className="btn btn-link text-center w-100 hover-effect logout-text">
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarComponent;