import React, { useState } from "react";

function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    // Profil verilerini kaydet veya API'ye gönder
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
      />
      <select name="gender" onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />
      <input type="file" name="profilePicture" onChange={handleChange} />
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default Profile;
