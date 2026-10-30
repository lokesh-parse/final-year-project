import {
  LayoutDashboard,
  FileVideo,
  History,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "New Audit",
    path: "/new-audit",
    icon: FileVideo,
  },
  {
    label: "Audit History",
    path: "/audit-history",
    icon: History,
  },
];

const managementNavigation = [
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    label: "Compliance Rules",
    path: "/rules",
    icon: ShieldCheck,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <ShieldCheck size={20} strokeWidth={2.2} />
        </div>

        <div className="brand-content">
          <span className="brand-name">Compliance QA</span>
          <span className="brand-subtitle">Compliance Platform</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <div className="navigation-section">
          <span className="navigation-label">WORKSPACE</span>

          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `navigation-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="navigation-section">
          <span className="navigation-label">MANAGEMENT</span>

          {managementNavigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `navigation-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot" />
          <span>System operational</span>
        </div>
      </div>
    </aside>
  );
}