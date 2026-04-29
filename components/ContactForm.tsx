'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Events } from '@/lib/analytics';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { siteConfig } from '@/lib/siteConfig';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { success?: boolean };
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        Events.formSubmit();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="alert"
        className="rounded-xl border border-[#6B8F71] bg-[#E8F0E9] p-8 text-center"
      >
        <div className="mb-3 text-[#6B8F71] text-4xl" aria-hidden="true">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C]">
          Message Sent!
        </h3>
        <p className="text-[#5A5A5A]">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary mt-6"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'error' && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Something went wrong. Please try again or call us at{' '}
          <a href={siteConfig.phone.href} className="font-semibold underline">
            {siteConfig.phone.display}
          </a>
          .
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-semibold text-[#2C2C2C]"
        >
          Full Name <span aria-hidden="true" className="text-[#C4622D]">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          className="w-full rounded-lg border border-[#E0D8CF] bg-white px-4 py-3 text-[#2C2C2C] placeholder:text-[#5A5A5A]/60 focus:border-[#6B8F71] focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/30 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-semibold text-[#2C2C2C]"
        >
          Email Address <span aria-hidden="true" className="text-[#C4622D]">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className="w-full rounded-lg border border-[#E0D8CF] bg-white px-4 py-3 text-[#2C2C2C] placeholder:text-[#5A5A5A]/60 focus:border-[#6B8F71] focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/30 transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="contact-phone"
          className="mb-1.5 block text-sm font-semibold text-[#2C2C2C]"
        >
          Phone Number{' '}
          <span className="font-normal text-[#5A5A5A]">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="(415) 971-3464"
          className="w-full rounded-lg border border-[#E0D8CF] bg-white px-4 py-3 text-[#2C2C2C] placeholder:text-[#5A5A5A]/60 focus:border-[#6B8F71] focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/30 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-[#2C2C2C]"
        >
          Message <span aria-hidden="true" className="text-[#C4622D]">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Briefly describe your situation — who you're helping, their health conditions, and what you need. (2–3 sentences is enough.)"
          className="w-full resize-y rounded-lg border border-[#E0D8CF] bg-white px-4 py-3 text-[#2C2C2C] placeholder:text-[#5A5A5A]/60 focus:border-[#6B8F71] focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/30 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-center text-xs text-[#5A5A5A]">
        We respond within 24 hours. Your information is never shared.
      </p>
    </form>
  );
}
