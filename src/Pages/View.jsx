import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaBook, FaEdit } from "react-icons/fa";

const View = () => {
  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [selectedIds, setSelectedIds] = useState([]); //selected record IDs
  const [editId, setEditId] = useState(null); // to store the ID of the record being edited
  const [editTitle, setEditTitle] = useState(""); //store the edited title
  const [mstatus, setMstatus] = useState(""); 
  const [editDescription, setEditDescription] = useState("");//store the edited description

  const toggleCheckbox = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // to multiple delete
  const handlemulStatus = (id, checked) => {
    let all = [...mstatus];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((val) => val !== id);
    }
    setMstatus(all);
  };

  const MulStatus = () => {
    if (mstatus.length > 0) {
      let filterStatus = record.map((val) => {
        if (mstatus.includes(val.id)) {
          val.status = val.status === "Completed" ? "Ongoing" : "Completed";
        }
        return val;
      });
      setRecord(filterStatus);
      localStorage.setItem("users", JSON.stringify(filterStatus));
      setMstatus("");
    } else {
      alert("Please select at least one user to change status");
    }
  };

  //to delete a selected records
  const handleDeleteSelected = () => {
    const updatedRecord = record.filter((r) => !selectedIds.includes(r.id));
    setRecord(updatedRecord);
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    setSelectedIds([]);
    alert("Selected records deleted successfully.");
  };

  // to delete a single  record
  const DeleteUser = (id) => {
    const updatedRecord = record.filter((val) => val.id !== id);
    setRecord(updatedRecord);
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    alert("Record deleted successfully.");
  };

  //to update status of a record
  const StatusUpdate = (id, status) => {
    const updatedRecord = record.map((val) => {
      if (val.id === id) {
        val.status = status === "Ongoing" ? "Completed" : "Ongoing";
      }
      return val;
    });
    setRecord(updatedRecord);
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    alert("Status changed successfully.");
  };

  // to handle edit button click
  const handleEdit = (id, title, description) => {
    setEditId(id);
    setEditTitle(title);
    setEditDescription(description);
  };

  //to update 
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRecord = record.map((item) =>
      item.id === editId
        ? { ...item, title: editTitle, description: editDescription }
        : item
    );
    setRecord(updatedRecord);
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    setEditId(null);
    alert("Record updated successfully.");
  };

  return (
    <div className="container py-5">
      <Link to={"/"} className="btn btn-primary mb-3">
        Add New Entry
      </Link>
      <div className="pt  -5">
        <button
          onClick={handleDeleteSelected}
          className="btn btn-danger mb-3"
          disabled={selectedIds.length === 0}
        >
          Delete Selected
        </button>
        <button onClick={MulStatus} className="btn btn-secondary mb-3 ms-3">
          Update Status
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <FaBook />
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
              <th>DEL</th>
              <th>Multi Status</th>
            </tr>
          </thead>
          <tbody>
            {record.map((r) => (
              <tr key={r.id}>
                <td>
                  <FaBook />
                </td>
                <td>
                  {r.id === editId ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    r.title
                  )}
                </td>
                <td>
                  {r.id === editId ? (
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    r.description
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      r.status === "Ongoing" ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => StatusUpdate(r.id, r.status)}
                  >
                    {r.status}
                  </button>
                </td>
                <td>
                  {r.id === editId ? (
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={handleUpdate}
                    >
                      <FaEdit />
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(r.id, r.title, r.description)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => DeleteUser(r.id)}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(r.id)}
                    checked={selectedIds.includes(r.id)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(s) => handlemulStatus(r.id, s.target.checked)}
                    checked={mstatus.includes(r.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default View;
