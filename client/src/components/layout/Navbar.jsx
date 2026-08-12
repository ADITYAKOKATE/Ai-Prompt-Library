import { useState, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";

import "./Navbar.css";

function Navbar({onAddPrompt}) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="navbar">
      <div>
        <p className="navbar-label">AI PROMPT LIBRARY</p>
        <h1>Your Prompt Workspace</h1>
      </div>

      <div className="navbar-actions">
        <button 
          className="icon-button" 
          title="Toggle theme"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        <button className="icon-button" title="Notifications">
          <FaBell />
        </button>

        <button className="add-prompt-button" onClick={onAddPrompt}>
          + Add Prompt
        </button>
      </div>
    </header>
  );
}

export default Navbar;