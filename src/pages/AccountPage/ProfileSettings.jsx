import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfileSettings.css'; // We'll create this
import { FaUserEdit, FaSave } from 'react-icons/fa';

const ProfileSettings = () => {
  const { currentUser, // We might need an updateUser function in AuthContext later
        } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // For success/error messages

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Simulate API call - In a real app, call an updateUser function from AuthContext
    // that makes an API request.
    console.log("Updating profile with:", { name, email });
    // For simulation, we can update localStorage if AuthContext reads from it for name display
    // but AuthContext needs a way to update its internal currentUser and localStorage.
    // For now, just a success message.
    
    setTimeout(() => { // Simulate API delay
      // This part needs to be handled in AuthContext if you want to see changes reflected immediately
      // e.g., AuthContext.updateUser({ name, email });
      if (currentUser && currentUser.email === email) { // Simple check
         // Update user in localStorage (if your AuthContext reads name from there)
        const updatedUser = { ...currentUser, name: name };
        localStorage.setItem('amaJoyUser', JSON.stringify(updatedUser));
        // Ideally, AuthContext would then re-read this or have a dedicated update function
        // For now, this won't update the Navbar name immediately without an AuthContext update function.
      }

      setMessage({ type: 'success', text: 'Profile updated successfully! (Simulated)' });
      setLoading(false);
    }, 1500);
  };

  // const handleChangePassword = async (e) => { /* ... similar logic ... */ };

  if (!currentUser) {
    return <p>Loading profile...</p>; // Or redirect
  }

  return (
    <div className="profile-settings-section" data-aos="fade-up">
      <h2 className="section-title-account"><FaUserEdit /> Edit Profile</h2>
      
      {message.text && <p className={`form-message ${message.type}`}>{message.text}</p>}

      <form onSubmit={handleProfileUpdate} className="profile-form">
        <div className="form-group">
          <label htmlFor="profileName">Full Name</label>
          <input 
            type="text" 
            id="profileName" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileEmail">Email Address</label>
          <input 
            type="email" 
            id="profileEmail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="your.email@example.com"
            // disabled // Typically email is not easily changed or requires verification
          />
        </div>
        <button type="submit" className="submit-btn-profile" disabled={loading}>
          {loading ? 'Saving...' : <><FaSave /> Save Changes</>}
        </button>
      </form>

      {/* Placeholder for Change Password Form 
      <h2 className="section-title-account" style={{marginTop: '40px'}}>Change Password</h2>
      <form onSubmit={handleChangePassword} className="profile-form">
         ... password fields ...
        <button type="submit" className="submit-btn-profile" disabled={loading}>
          {loading ? 'Saving...' : 'Update Password'}
        </button>
      </form>
      */}
    </div>
  );
};

export default ProfileSettings;