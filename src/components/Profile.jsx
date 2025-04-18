
import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'booked' | 'posted'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/users/1')
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone
        });
      })
      .catch(err => console.error("Failed to fetch user data", err));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/users/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Update failed');
      })
      .then(updatedUser => {
        setUserData(updatedUser);
        setEditMode(false);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="profileNavbar">
        <button onClick={() => setActiveTab('profile')}>My Profile</button>
        <button onClick={() => setActiveTab('booked')}>Booked Rooms</button>
        <button onClick={() => setActiveTab('posted')}>Posted Rooms</button>
      </nav>

      <div className="profileContainer">
        {activeTab === 'profile' && (
          <>
            <h2 className="heading">My Profile</h2>
            {userData && !editMode && (
              <div className="card">
                <img
                  className="avatar"
                  src={userData.profilePicture || '/default-avatar.png'}
                  alt="Profile"
                />
                <h3>{userData.name}</h3>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
                <button onClick={() => setEditMode(true)} className="editBtn">Edit Profile</button>
              </div>
            )}

            {userData && editMode && (
              <form onSubmit={handleUpdate} className="card">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
                <div className="buttonRow">
                  <button type="submit" className="saveBtn">Save</button>
                  <button type="button" onClick={() => setEditMode(false)} className="cancelBtn">Cancel</button>
                </div>
              </form>
            )}
          </>
        )}

        {activeTab === 'booked' && (
          <div className="card">
            <h2>Booked Rooms</h2>
            <p>Show user's booked rooms here...</p>
            {/* Add logic to fetch and list booked rooms */}
          </div>
        )}

        {activeTab === 'posted' && (
          <div className="card">
            <h2>Posted Rooms</h2>
            <p>Show rooms posted by user here...</p>
            {/* Add logic to fetch and list posted rooms */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


// // this is checked using a dummy data
// // export default Profile;
// import React, { useEffect, useState } from 'react';
// import '../styles/Profile.css';

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   // Load user data (dummy data used here)
//   useEffect(() => {
//     // Simulate fetch with dummy user
//     const dummyUser = {
//       id: 1,
//       name: 'Sandy Balamurali',
//       email: 'sandy@example.com',
//       phone: '9876543210',
//      //  profilePicture: 'https://i.pravatar.cc/150?img=32',
//       createdAt: '2023-05-12T10:00:00Z',
//     };

//     setUserData(dummyUser);
//     setFormData({
//       name: dummyUser.name,
//       email: dummyUser.email,
//       phone: dummyUser.phone,
//     });
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // Submit updated data (just updates state here)
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     // Simulate a backend update
//     const updatedUser = { ...userData, ...formData };
//     setUserData(updatedUser);
//     setEditMode(false);
//     alert('Profile updated (dummy)');
//   };

//   return (
//     <div className="profileContainer">
//       <h2 className="heading">My Profile</h2>

//       {userData && !editMode && (
//         <div className="card">
//           <img
//             className="avatar"
//             src={userData.profilePicture || '/default-avatar.png'}
//             alt="Profile"
//           />
//           <h3>{userData.name}</h3>
//           <p><strong>Email:</strong> {userData.email}</p>
//           <p><strong>Phone:</strong> {userData.phone}</p>
//           <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
//           <button onClick={() => setEditMode(true)} className="editBtn">Edit Profile</button>
//         </div>
//       )}

//       {userData && editMode && (
//         <form onSubmit={handleUpdate} className="card">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your name"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone number"
//           />
//           <div className="buttonRow">
//             <button type="submit" className="saveBtn">Save</button>
//             <button type="button" onClick={() => setEditMode(false)} className="cancelBtn">Cancel</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Profile;
