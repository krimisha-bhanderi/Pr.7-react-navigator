import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Add = () => {
  let location = useLocation();
  const [title, setTitle] = useState(""); // to store the title input value
  const [description, setDescription] = useState(""); // to store the description input value
  const [record, setRecord] = useState(JSON.parse(localStorage.getItem("users")) || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: Date.now(),
      title,
      description,
      status: "Ongoing",
    };
    let newRecord = [...record, obj]; // Create a new array by combining the existing records with the new record
    localStorage.setItem("users", JSON.stringify(newRecord)); // Store the updated records in localStorage
    setRecord(newRecord); // Update the state with the new record
    setTitle("");
    setDescription("");
    alert("Data added successfully!");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Entry</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputtitle1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampletitle"
                    aria-describedby="titleHelp"
                    onChange={(e) => setTitle(e.target.value)} // Update the title state when the input value changes
                    value={title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputDescription1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputDescription1"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <Link to={"/View"} className="text-decoration-none">
            <button className="btn btn-secondary">View Entries</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Add;
