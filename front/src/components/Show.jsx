
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import './styles/show.css';
import axios from 'axios';

function Show() {
  const [employees,setEmployees] = useState([]);

  const [search, setSearch] = useState("");







    useEffect(() => {
    axios.get("http://localhost:5000/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
      .catch(err => console.log(err));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) || emp.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="show-container">
      <nav className="show-navbar">
        <h1 className="show-logo">Employee Manager</h1>
        <div className="show-search-container">
          <input
            type="text"
            placeholder="Search by name or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="show-search"
          />
          <Link to="/add" className="show-add-btn">+ Add Employee</Link>
        </div>
      </nav>

      <div className="show-content">
        {filteredEmployees.length > 0 ? (
          <ul className="show-list">

            {filteredEmployees.map(emp => (
              <li key={emp.id} className="show-card">
                <h3>{emp.name}</h3>
                <p>{emp.position}</p>
                <div className="show-actions">
                  <Link to={`/details/${emp.id}`} className="show-btn view">View</Link>
                  <Link to={`/update/${emp.id}`} className="show-btn edit">Edit</Link>
                  <button onClick={() => handleDelete(emp.id)} className="show-btn delete">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="show-empty">No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default Show;
