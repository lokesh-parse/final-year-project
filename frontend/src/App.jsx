import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import NewAudit from "./pages/NewAudit";
import AuditHistory from "./pages/AuditHistory";
import AuditDetails from "./pages/AuditDetails";
import Reports from "./pages/Reports.jsx";
import ComplianceRules from "./pages/ComplianceRules.jsx";
import Settings from "./pages/Settings.jsx";

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Topbar />

        <main className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-audit" element={<NewAudit />} />
            <Route path="/audit-history" element={<AuditHistory />} />
            <Route path="/audit/:auditId" element={<AuditDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/rules" element={<ComplianceRules />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;