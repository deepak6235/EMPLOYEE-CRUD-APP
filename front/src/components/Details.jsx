


import React, { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import './styles/details.css';
import Navbar from './Navbar';
import axios from 'axios';

function Details() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);


 useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);


  if (!employee) return <p>Loading...</p>;

  return (
    <div>
    <Navbar/>
    <div className="container">
      <h2 className="title">{employee.name}</h2>
      <p className="detail"><strong>Email:</strong> {employee.email}</p>
      <p className="detail"><strong>Position:</strong> {employee.position}</p>
      <p className="detail"><strong>Salary:</strong> ${employee.salary}</p>

      <div className="buttonGroup">
        <Link to={`/update/${employee.id}`} className="button editButton">Edit</Link>
        <Link to="/" className="button backButton">Back</Link>
      </div>
    </div>
    </div>
  );
}

export default Details;
