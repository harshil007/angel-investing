import React from "react";
import { useLocation, Link } from "react-router-dom";
import { toTitleCase } from "./helpers/displayHelpers";

const ApplicationHeader = React.memo(function ApplicationHeader(): JSX.Element {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="layout-header">
      <b>A N G E L&nbsp;&nbsp;&nbsp;&nbsp;I N V E S T I N G</b>
      {["dashboard", "deposit", "transfers"].map((path) => {
        return (
          <div
            key="path"
            className={`menu-item ${
              currentPath === `/${path}` ||
              (currentPath === "/" && path === "dashboard")
                ? "menu-item-active"
                : ""
            }`}
          >
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/${path}`}
            >
              {toTitleCase(path)}
            </Link>
          </div>
        );
      })}
    </div>
  );
});

export default ApplicationHeader;
