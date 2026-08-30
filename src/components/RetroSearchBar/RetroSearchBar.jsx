import React from 'react';
import './RetroSearchBar.css';

export default function RetroSearchBar({
  value,
  onChange,
  onFilterClick,
  placeholder = "Search projects, stack, tools..."
}) {
  return (
    <div className="retro-search-wrapper">
      <div id="poda">
        <div className="retro-glow"></div>
        <div className="retro-darkBorderBg"></div>
        <div className="retro-white"></div>
        <div className="retro-border"></div>

        <div id="retro-main">
          <input
            className="retro-input"
            name="text"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div id="pink-mask"></div>
          <div id="input-mask"></div>
          
          <div className="filter-border-anim"></div>
          <button
            type="button"
            id="filter-icon-btn"
            onClick={onFilterClick}
            title="Filter Categories"
          >
            <svg
              fill="none"
              viewBox="4.8 4.56 14.832 15.408"
              width="20"
              height="20"
              preserveAspectRatio="none"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                stroke="#ffffff"
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
              ></path>
            </svg>
          </button>

          <div id="retro-search-icon">
            <svg
              fill="none"
              height="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" stroke="#dcb483"></circle>
              <line x1="22" x2="16.65" y1="22" y2="16.65" stroke="#d16e5a"></line>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
