import { useRef, useState } from "react";
import { createAudit } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FileVideo,
  Link2,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";

export default function NewAudit() {
  const fileInputRef = useRef(null);

  const [inputType, setInputType] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [auditName, setAuditName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (inputType !== "url") {
      setSubmitError(
        "Video upload is not connected to the backend yet. Please use Video URL."
      );
      return;
    }

    if (!videoUrl.trim()) {
      setSubmitError("Please enter a valid video URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createAudit(videoUrl.trim());
      console.log("Audit completed:", result);

navigate(`/audit/${result.session_id}`, {
  state: {
    audit: result,
  },
});
    } catch (error) {
      console.error("Audit failed:", error);
      setSubmitError(error.message || "Audit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="audit-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">AUDIT WORKSPACE</span>
          <h1>New Compliance Audit</h1>
          <p>
            Submit a video for automated compliance analysis and review.
          </p>
        </div>
      </div>

      <form className="audit-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="form-section-header">
            <div>
              <h2>Video Source</h2>
              <p>Select how you want to provide the video for analysis.</p>
            </div>
          </div>

          <div className="source-tabs">
            <button
              type="button"
              className={`source-tab ${inputType === "upload" ? "active" : ""}`}
              onClick={() => setInputType("upload")}
            >
              <Upload size={17} />
              <span>Upload Video</span>
            </button>

            <button
              type="button"
              className={`source-tab ${inputType === "url" ? "active" : ""}`}
              onClick={() => setInputType("url")}
            >
              <Link2 size={17} />
              <span>Video URL</span>
            </button>
          </div>

          {inputType === "upload" ? (
            <div className="upload-area">
              {!selectedFile ? (
                <>
                  <div className="upload-icon">
                    <FileVideo size={25} />
                  </div>

                  <h3>Upload a video</h3>

                  <p>
                    Select a video file from your computer to begin the audit.
                  </p>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={16} />
                    Choose Video
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleFileChange}
                  />

                  <span className="upload-hint">
                    Supported video formats depend on the configured ingestion service.
                  </span>
                </>
              ) : (
                <div className="selected-file">
                  <div className="selected-file-icon">
                    <FileVideo size={20} />
                  </div>

                  <div className="selected-file-info">
                    <strong>{selectedFile.name}</strong>
                    <span>
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>

                  <button
                    type="button"
                    className="remove-file-button"
                    onClick={removeFile}
                    aria-label="Remove selected video"
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="url-input-wrapper">
              <label htmlFor="video-url">Video URL</label>

              <div className="url-input">
                <Link2 size={17} />
                <input
                  id="video-url"
                  type="url"
                  placeholder="https://example.com/video"
                  value={videoUrl}
                  onChange={(event) => setVideoUrl(event.target.value)}
                />
              </div>

              <span className="field-hint">
                Provide a publicly accessible video URL supported by the configured ingestion pipeline.
              </span>
            </div>
          )}
        </section>

        <section className="form-section">
          <div className="form-section-header">
            <div>
              <h2>Audit Configuration</h2>
              <p>Define the compliance review parameters.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="audit-name">Audit Name</label>
              <input
                id="audit-name"
                type="text"
                placeholder="Enter audit name"
                value={auditName}
                onChange={(event) => setAuditName(event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="compliance-domain">
                Compliance Domain
              </label>

              <select id="compliance-domain" defaultValue="">
                <option value="" disabled>
                  Select a domain
                </option>
                <option value="advertising">Advertising</option>
                <option value="brand">Brand Compliance</option>
                <option value="regulatory">Regulatory Compliance</option>
                <option value="internal">Internal Policy</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="audit-description">
              Audit Description
            </label>

            <textarea
              id="audit-description"
              rows="4"
              placeholder="Describe what this audit should verify."
            />
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-header">
            <div>
              <h2>Processing Pipeline</h2>
              <p>
                The submitted video will be processed through the configured compliance workflow.
              </p>
            </div>
          </div>

          <div className="pipeline-preview">
            <div className="pipeline-step">
              <span className="pipeline-number">01</span>
              <div>
                <strong>Video Ingestion</strong>
                <span>Video Indexer</span>
              </div>
            </div>

            <div className="pipeline-connector" />

            <div className="pipeline-step">
              <span className="pipeline-number">02</span>
              <div>
                <strong>Content Extraction</strong>
                <span>Transcript and OCR</span>
              </div>
            </div>

            <div className="pipeline-connector" />

            <div className="pipeline-step">
              <span className="pipeline-number">03</span>
              <div>
                <strong>Rule Retrieval</strong>
                <span>Azure AI Search</span>
              </div>
            </div>

            <div className="pipeline-connector" />

            <div className="pipeline-step">
              <span className="pipeline-number">04</span>
              <div>
                <strong>Compliance Analysis</strong>
                <span>AI reasoning</span>
              </div>
            </div>
          </div>
        </section>

        {submitError && (
          <div className="form-error">
            {submitError}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="secondary-button" disabled={isSubmitting}>
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            <CheckCircle2 size={16} />
            {isSubmitting ? "Processing Audit..." : "Start Audit"}
          </button>
        </div>
      </form>
    </div>
  );
}