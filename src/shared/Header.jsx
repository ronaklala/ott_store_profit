import React from "react";

const Header = () => {
  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper sidebar-dark">
        <div
          className="sidebar-content"
          data-simplebar=""
          style={{ height: "calc(100% - 60px)" }}
        >
          <div className="sidebar-brand">
            <a href="/">Ronak's Dashboard</a>
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar">
              <a>
                <i className="ti ti-home me-2" />
                Dashboard
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-browser me-2" />
                Monthly Stats
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-apps me-2" />
                Category Wise Stats
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-user me-2" />
                User Profile
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-brand-gravatar me-2" />
                Blog
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-shopping-cart me-2" />
                E-Commerce
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-camera me-2" />
                Gallery
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-file-info me-2" />
                Pages
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-file-info me-2" />
                UI Components
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-mail-opened me-2" />
                Email Template
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-file-invoice me-2" />
                Invoice
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-login me-2" />
                Authentication
              </a>
            </li>
            <li className="sidebar">
              <a>
                <i className="ti ti-license me-2" />
                Miscellaneous
              </a>
            </li>
          </ul>
          {/* sidebar-menu  */}
        </div>
        {/* Sidebar Footer */}
      </nav>
    </>
  );
};

export default Header;
