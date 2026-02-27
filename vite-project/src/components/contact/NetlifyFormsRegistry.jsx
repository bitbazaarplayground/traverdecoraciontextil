// src/components/contact/NetlifyFormsRegistry.jsx
export default function NetlifyFormsRegistry() {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {/* This ensures Netlify registers the form at build time */}
      <form
        name="quick-enquiry"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="quick-enquiry" />
        <p>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        {/* Fields Netlify expects (safe to list your real ones) */}
        <input name="nombre" />
        <input name="telefono" />
        <input name="email" />
        <input name="preferencia" />
        <input name="pack" />
        <input name="source" />
        <input name="page" />
        <textarea name="mensaje" />
      </form>
    </div>
  );
}
