// src/components/Contact.jsx
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { ok: bool, msg: string }

    // Your EmailJS values (use the ones you gave)
    const SERVICE_ID = "service_ji79p6f";
    const TEMPLATE_ID = "template_v59a5vo";
    const PUBLIC_KEY = "7XPLRUUs9mTEXIH1I";

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function validate() {
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return "All fields are required.";
        // basic email regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus(null);

        const error = validate();
        if (error) {
            setStatus({ ok: false, msg: error });
            return;
        }

        setLoading(true);
        try {
            const resp = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name: form.name,
                from_email: form.email,
                message: form.message,
            }, PUBLIC_KEY);

            // emailjs returns a status object; treat any successful call as success
            setStatus({ ok: true, msg: "Message sent — thank you!" });
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error("EmailJS send error:", err);
            setStatus({ ok: false, msg: "Failed to send message. Try again later." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" style={{ maxWidth: 680, margin: "0 auto", padding: "2rem" }}>
            <h2>Contact</h2>

            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Name
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: 6 }}
                        required
                    />
                </label>

                <label style={{ display: "block", marginBottom: 8 }}>
                    Email
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: 6 }}
                        required
                    />
                </label>

                <label style={{ display: "block", marginBottom: 8 }}>
                    Message
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="6"
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: 6 }}
                        required
                    />
                </label>

                <button type="submit" disabled={loading} style={{ padding: "10px 18px", cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "Sending..." : "Send Message"}
                </button>

                {status && (
                    <p style={{ marginTop: 12, color: status.ok ? "green" : "crimson" }}>
                        {status.msg}
                    </p>
                )}
            </form>
        </section>
    );
}
