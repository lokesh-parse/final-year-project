import {
  BarChart3,
  CheckCircle2,
  Download,
  FileSearch,
  ShieldAlert,
  XCircle,
} from "lucide-react";

const reportStats = [
  {
    label: "Total Audits",
    value: "0",
    icon: FileSearch,
  },
  {
    label: "Passed Audits",
    value: "0",
    icon: CheckCircle2,
  },
  {
    label: "Failed Audits",
    value: "0",
    icon: XCircle,
  },
  {
    label: "Critical Findings",
    value: "0",
    icon: ShieldAlert,
  },
];

export default function Reports() {
  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Compliance Reports</h1>
          <p>
            Review compliance performance and generate audit reports.
          </p>
        </div>

        <button type="button" className="primary-button" disabled>
          <Download size={17} />
          Export Report
        </button>
      </div>

      <section className="reports-stats">
        {reportStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="report-stat-card" key={stat.label}>
              <div className="report-stat-icon">
                <Icon size={20} />
              </div>

              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          );
        })}
      </section>

      <section className="report-panel">
        <div className="report-panel-header">
          <div>
            <h2>Compliance Overview</h2>
            <p>
              Summary of compliance audit performance.
            </p>
          </div>
        </div>

        <div className="report-empty-state">
          <div className="report-empty-icon">
            <BarChart3 size={28} />
          </div>

          <h3>No report data available</h3>

          <p>
            Complete compliance audits to generate performance
            reports and analytics.
          </p>
        </div>
      </section>

      <section className="report-panel">
        <div className="report-panel-header">
          <div>
            <h2>Generated Reports</h2>
            <p>
              Previously generated compliance reports will appear here.
            </p>
          </div>
        </div>

        <div className="report-empty-state compact">
          <FileSearch size={24} />

          <div>
            <strong>No generated reports</strong>
            <span>
              Reports will become available after audits are completed.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}