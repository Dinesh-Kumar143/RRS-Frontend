import react from 'react';
import { useState, useEffect } from 'react';
import './card.css'; // Ensure you have the CSS file

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const [updateValue, setUpdateValue] = useState('');

  const API_URL = 'https://rrs-backend-production.up.railway.app/';

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProject = async () => {
    if (!newProject.trim()) {
      console.log("handler function")
      return;
    }
    try {
      await fetch(API_URL, {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProject }),
      });
      setNewProject("");
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}${id}`, { method: "DELETE" });
      setDeleteId(""); // Reset input field
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  async function handleDeleteAll() {
    console.log("Delete function");
    try {
      await fetch(API_URL, { method: "DELETE" });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting all projects:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (!updateValue.trim()) return;
    try {
      await fetch(`${API_URL}${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updateValue }),
      });
      setUpdateId(null);
      setUpdateValue('');
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-container">
      <div className="input-section">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="Enter new project"
          className="project-input"
        />
        {/* <button onClick={() => console.log("Button clicked")} className="add-btn">Add Project</button> */}
        <button onClick={handleAddProject} className="add-btn">Add Project</button>
      </div>

      <div className="delete-section">
        {/* <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="Enter ID to delete"
          className="delete-input"
        /> */}
        {/* <button onClick={() => handleDelete(deleteId)} className="delete-btn">Delete</button> */}
        <button onClick={handleDeleteAll} className="delete-all-btn">Delete All</button>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <div className="project-content">
              <span>{project._id}</span>
              <span>{project.name}</span>
              <div className="project-actions">
                <button
                  onClick={() => setUpdateId(updateId === project._id ? null : project._id)}
                  className="update-btn"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>

            {updateId === project._id && (
              <div className="update-dropdown">
                <input
                  type="text"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  placeholder="Enter updated name"
                  className="update-input"
                />
                <button
                  onClick={() => handleUpdate(project._id)}
                  className="save-btn"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
