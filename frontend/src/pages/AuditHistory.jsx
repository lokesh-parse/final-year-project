import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  Plus,
  Search,
  XCircle,
} from "lucide-react";

const audits = [];

function StatusBadge({ status }) {
  const config = {
    PASSED: {
      label: "Passed",
      className: "status-passed",
      icon: CheckCircle2,
    },
    FAILED: {
      label: "Failed",
      className: "status-failed",
      icon: XCircle,
    },
    PROCESSING: {
      label: "Processing",
      className: "status-processing",
      icon: Clock3,
    },
  };

  const current = config[status] || config.PROCESSING;
  const Icon = current.icon;

  return (
    <span className={`audit-status ${current.className}`}>
      <Icon size={14} />
      {current.label}
    </span>
  );
}

export default function AuditHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredAudits = useMemo(() => {
    return audits.filter((audit) => {
      const matchesSearch =
        audit.name.toLowerCase().includes(search.toLowerCase()) ||
        audit.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || audit.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="audit-history-page">
      <div className="page-header">
        <div>
          <h1>Audit History</h1>
          <p>View and manage previously processed compliance audits.</p>
        </div>

        <Link to="/new-audit" className="primary-button">
          <Plus size={18} />
          New Audit
        </Link>
      </div>

      <section className="audit-history-card">
        <div className="audit-toolbar">
          <div className="audit-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search audits..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className="audit-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
            <option value="PROCESSING">Processing</option>
          </select>
        </div>

        {filteredAudits.length === 0 ? (
          <div className="audit-history-empty">
            <div className="empty-state-icon">
              <FileSearch size={28} />
            </div>

            <h3>
              {search || statusFilter !== "ALL"
                ? "No matching audits"
                : "No audits yet"}
            </h3>

            <p>
              {search || statusFilter !== "ALL"
                ? "Try changing your search or filter."
                : "Completed compliance audits will appear here."}
            </p>

            {!search && statusFilter === "ALL" && (
              <Link to="/new-audit" className="secondary-button">
                <Plus size={17} />
                Create First Audit
              </Link>
            )}
          </div>
        ) : (
          <div className="audit-table-wrapper">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Audit</th>
                  <th>Status</th>
                  <th>Findings</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredAudits.map((audit) => (
                  <tr key={audit.id}>
                    <td>
                      <div className="audit-name">
                        <strong>{audit.name}</strong>
                        <span>{audit.id}</span>
                      </div>
                    </td>

                    <td>
                      <StatusBadge status={audit.status} />
                    </td>

                    <td>{audit.findings}</td>
                    <td>{audit.date}</td>

                    <td>
                      <Link
                        to={`/audit/${audit.id}`}
                        className="audit-view-link"
                      >
                        View
                        <ArrowRight size={15} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}