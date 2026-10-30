import {
  Bell,
  Lock,
  Monitor,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and platform preferences.</p>
        </div>

        <button type="button" className="primary-button" onClick={handleSave}>
          <Save size={17} />
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="settings-section-icon">
            <User size={19} />
          </div>

          <div>
            <h2>Profile</h2>
            <p>Manage your account information.</p>
          </div>
        </div>

        <div className="settings-form">
          <div className="settings-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" defaultValue="User" />
          </div>

          <div className="settings-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="settings-field">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              defaultValue="Compliance Analyst"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="settings-section-icon">
            <Bell size={19} />
          </div>

          <div>
            <h2>Notifications</h2>
            <p>Control how you receive audit notifications.</p>
          </div>
        </div>

        <div className="settings-options">
          <label className="settings-option">
            <div>
              <strong>Audit notifications</strong>
              <span>Notify me when an audit is completed.</span>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(event) => setNotifications(event.target.checked)}
            />
          </label>

          <label className="settings-option">
            <div>
              <strong>Email reports</strong>
              <span>Receive completed audit reports by email.</span>
            </div>

            <input
              type="checkbox"
              checked={emailReports}
              onChange={(event) => setEmailReports(event.target.checked)}
            />
          </label>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="settings-section-icon">
            <ShieldCheck size={19} />
          </div>

          <div>
            <h2>Security</h2>
            <p>Security and account protection settings.</p>
          </div>
        </div>

        <div className="settings-security">
          <div>
            <strong>Authentication</strong>
            <span>
              Authentication will be connected when the account system is
              implemented.
            </span>
          </div>

          <button type="button" className="secondary-button" disabled>
            <Lock size={16} />
            Manage Security
          </button>
        </div>
      </section>

      <section className="settings-section">
        <div className="settings-section-header">
          <div className="settings-section-icon">
            <Monitor size={19} />
          </div>

          <div>
            <h2>Platform</h2>
            <p>Current platform configuration.</p>
          </div>
        </div>

        <div className="platform-info">
          <div>
            <span>Application</span>
            <strong>Compliance QA</strong>
          </div>

          <div>
            <span>Environment</span>
            <strong>Development</strong>
          </div>

          <div>
            <span>Version</span>
            <strong>1.0.0</strong>
          </div>
        </div>
      </section>
    </div>
  );
}