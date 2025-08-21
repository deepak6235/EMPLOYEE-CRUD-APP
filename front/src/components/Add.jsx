
import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import './styles/Add.css';
import Navbar from './Navbar';
import axios from 'axios';

function Add() {
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/employees", form)
      .then(() => navigate("/"))
      .catch(err => console.log(err));
  };

  return (
    <div>
<Navbar/>

      <div className="add-container">
        <h2 className="add-title">Add Employee</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <input className="add-input" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input className="add-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input className="add-input" name="position" value={form.position} onChange={handleChange} placeholder="Position" required />
          <input className="add-input" name="salary" type="number" value={form.salary} onChange={handleChange} placeholder="Salary" required />
          <button type="submit" className="add-button">Add Employee</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
