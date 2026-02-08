import Sidebar from "./sidebar";
import Topbar from "./topbar";
import "../styles/layout.css";


function Layout({ children, user }) {
  return (
    <div>
      <Sidebar />
      <Topbar user={user} />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
