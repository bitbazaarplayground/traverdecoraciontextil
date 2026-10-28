// src/components/contact/NetlifyFormsRegistry.jsx
export default function NetlifyFormsRegistry() {
  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {/* These declarations are included in the Framework static build. */}
      <form
        name="asesoramiento"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="asesoramiento" />
        <p>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>
        <input name="nombre" />
        <input name="telefono" />
        <input name="email" />
        <input name="preferencia" />
        <textarea name="mensaje" />
        <input name="meeting_mode" />
        <input name="pack" />
        <input name="kind" />
        <input name="start_time" />
        <input name="end_time" />
        <input name="address_line1" />
        <input name="postal_code" />
        <input name="city" />
        <input name="address_notes" />
      </form>

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

        <input name="nombre" />
        <input name="telefono" />
        <input name="email" />
        <input name="preferencia" />
        <input name="pack" />
        <input name="source" />
        <input name="page" />
        <textarea name="mensaje" />
        <input name="privacidad" />
      </form>
    </div>
  );
}
