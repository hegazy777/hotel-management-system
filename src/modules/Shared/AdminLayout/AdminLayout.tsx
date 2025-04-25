// Layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBare from "../SideBar/SideBar";
import { AdminNavBare } from "../AdminNavBare/AdminNavBare";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
      <div style={{ display: "flex" }}>
        <SideBare collapsed={collapsed} setCollapsed={setCollapsed}  />
        <div style={{ flex: 1 }}>
        <AdminNavBare />
          <main style={{ padding: "20px" }}>
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default Layout;
