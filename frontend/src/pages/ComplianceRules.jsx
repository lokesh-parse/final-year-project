import {
  CheckCircle2,
  FileText,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const rules = [];

export default function ComplianceRules() {
  const [search, setSearch] = useState("");

  const filteredRules = rules.filter((rule) => {
    const query = search.toLowerCase();

    return (
      rule.name.toLowerCase().includes(query) ||
      rule.category.toLowerCase().includes(query) ||
      rule.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="rules-page">
      <div className="page-header">
        <div>
          <h1>Compliance Rules</h1>
          <p>
            Manage the compliance rules used during video audits.
          </p>
        </div>

        <button type="button" className="primary-button" disabled>
          <Plus size={17} />
          Add Rule
        </button>
      </div>

      <section className="rules-summary">
        <div className="rule-summary-card">
          <div className="rule-summary-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Total Rules</span>
            <strong>{rules.length}</strong>
          </div>
        </div>

        <div className="rule-summary-card">
          <div className="rule-summary-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Rules</span>
            <strong>{rules.length}</strong>
          </div>
        </div>

        <div className="rule-summary-card">
          <div className="rule-summary-icon">
            <FileText size={20} />
          </div>

          <div>
            <span>Rule Categories</span>
            <strong>0</strong>
          </div>
        </div>
      </section>

      <section className="rules-panel">
        <div className="rules-toolbar">
          <div>
            <h2>Rule Library</h2>
            <p>Compliance rules available to the audit engine.</p>
          </div>

          <div className="rules-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search rules..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {filteredRules.length === 0 ? (
          <div className="rules-empty">
            <div className="rules-empty-icon">
              <ShieldCheck size={28} />
            </div>

            <h3>
              {search ? "No matching rules" : "No compliance rules yet"}
            </h3>

            <p>
              {search
                ? "Try a different search term."
                : "Compliance rules will appear here once the rule library is configured."}
            </p>
          </div>
        ) : (
          <div className="rules-table-wrapper">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRules.map((rule) => (
                  <tr key={rule.id}>
                    <td>
                      <div className="rule-name">
                        <strong>{rule.name}</strong>
                        <span>{rule.id}</span>
                      </div>
                    </td>

                    <td>{rule.category}</td>

                    <td>{rule.severity}</td>

                    <td>
                      <span className="rule-active-status">
                        <CheckCircle2 size={14} />
                        Active
                      </span>
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