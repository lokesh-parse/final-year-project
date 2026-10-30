import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={18} strokeWidth={2} />

        <input
          type="search"
          placeholder="Search audits, reports, rules..."
          aria-label="Search"
        />
      </div>

      <div className="topbar-actions">
        <button
          className="icon-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={19} strokeWidth={2} />
        </button>

        <div className="user-menu">
          <div className="user-avatar">LP</div>

          <div className="user-info">
            <span className="user-name">User</span>
            <span className="user-role">Compliance Analyst</span>
          </div>
        </div>
      </div>
    </header>
  );
}