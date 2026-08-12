import { NavLink } from "react-router-dom";
import { FaColumns, FaBook, FaStar, FaDownload, FaUpload } from "react-icons/fa";
import { useRef } from "react";
import toast from "react-hot-toast";
import usePrompts from "../../hooks/usePrompts";

import "./Sidebar.css";

function Sidebar() {
  const { prompts, importPrompts } = usePrompts();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompts-export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Prompts exported successfully!");
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (!Array.isArray(json)) throw new Error("Invalid JSON format");
        await importPrompts(json);
        toast.success("Prompts imported successfully!");
      } catch (err) {
        toast.error("Failed to import JSON file");
      }
    };
    reader.readAsText(file);
    event.target.value = null; // reset input
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">✦</div>

        <div>
          <h2>PromptHub</h2>
          <span>AI Prompt Library</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaColumns />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/prompts"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaBook />
          <span>All Prompts</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <FaStar />
          <span>Favorites</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button className="icon-button" onClick={handleExport} title="Export JSON" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <FaDownload /> Export
          </button>
          <button className="icon-button" onClick={() => fileInputRef.current?.click()} title="Import JSON" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <FaUpload /> Import
          </button>
          <input
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImport}
          />
        </div>
        <p>AI Prompt Library</p>
        <span>Built with React</span>
      </div>
    </aside>
  );
}

export default Sidebar;