import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock3,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AuditDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auditId } = useParams();

  const audit = location.state?.audit;

  if (!audit) {
    return (
      <div className="audit-details-page">
        <div className="page-header">
          <div>
            <span className="page-eyebrow">AUDIT</span>
            <h1>Audit Not Available</h1>
            <p>
              No audit result was provided for session{" "}
              <strong>{auditId}</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/audit-history")}
        >
          <ArrowLeft size={16} />
          Back to Audit History
        </button>
      </div>
    );
  }

  const isPassed = audit.status === "PASS";
  const issues = audit.compliance_results || [];

  return (
    <div className="audit-details-page">
      <div className="details-topbar">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/audit-history")}
        >
          <ArrowLeft size={16} />
          Audit History
        </button>
      </div>

      <div className="page-header">
        <div>
          <span className="page-eyebrow">AUDIT RESULT</span>
          <h1>Compliance Audit</h1>
          <p>Session ID: {audit.session_id}</p>
        </div>

        <div
          className={`audit-status ${
            isPassed ? "status-pass" : "status-fail"
          }`}
        >
          {isPassed ? (
            <CheckCircle2 size={17} />
          ) : (
            <AlertTriangle size={17} />
          )}

          <span>{audit.status}</span>
        </div>
      </div>

      <section className="result-summary-grid">
        <div className="result-card">
          <div className="result-card-icon">
            <FileText size={19} />
          </div>

          <div>
            <span>Total Findings</span>
            <strong>{issues.length}</strong>
          </div>
        </div>

        <div className="result-card">
          <div className="result-card-icon">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Video ID</span>
            <strong>{audit.video_id}</strong>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="details-section-header">
          <div>
            <h2>Final Report</h2>
            <p>AI-generated compliance analysis summary.</p>
          </div>
        </div>

        <div className="final-report">
          {audit.final_report || "No report generated."}
        </div>
      </section>

      <section className="details-section">
        <div className="details-section-header">
          <div>
            <h2>Compliance Findings</h2>
            <p>
              Detected compliance issues returned by the audit workflow.
            </p>
          </div>
        </div>

        {issues.length === 0 ? (
          <div className="no-findings">
            <CheckCircle2 size={22} />
            <div>
              <strong>No compliance violations found</strong>
              <span>
                The audit returned an empty compliance findings list.
              </span>
            </div>
          </div>
        ) : (
          <div className="findings-list">
            {issues.map((issue, index) => (
              <div className="finding-card" key={`${issue.category}-${index}`}>
                <div className="finding-header">
                  <div>
                    <span className="finding-number">
                      Finding {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{issue.category}</h3>
                  </div>

                  <span
                    className={`severity-badge severity-${issue.severity?.toLowerCase()}`}
                  >
                    {issue.severity}
                  </span>
                </div>

                <p>{issue.description}</p>

                {issue.timestamp && (
                  <span className="finding-timestamp">
                    Timestamp: {issue.timestamp}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}