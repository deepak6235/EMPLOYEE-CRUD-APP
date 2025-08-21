



import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import './styles/update.css';
import Navbar from './Navbar';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", position: "", salary: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.log(err));
  }, [id]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/employees/${id}`, form)
    .then(() => {
      alert("Details Updated")
      navigate('/')
    })

    .catch(err => {
      alert("error")
      console.log("error",err.message)
      navigate('/')
    });
  };

  return (
    <div>
      <Navbar/>
    <div className="update-container">
      <h2 className="update-title">Update Employee</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <input
          className="update-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="update-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="update-input"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
        />
        <input
          className="update-input"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          type="number"
          required
        />
        <button type="submit" className="update-button">Update Employee</button>
      </form>
    </div>
    </div>
  );
}

export default Update;
