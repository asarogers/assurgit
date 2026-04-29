'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

/* ============================================================
   MOCKUP CHECKOUT PAGE
   Functional demo — no real payment processing.
   ============================================================ */

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV',
  'NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN',
  'TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

const MONTHS = ['01','02','03','04','05','06','07','08','09','10','11','12'];

const YEARS = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i));

interface FormData {
  // Contact
  email: string;
  phone: string;
  // Card
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  cardName: string;
  // Billing address
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

const EMPTY_FORM: FormData = {
  email: '',
  phone: '',
  cardNumber: '',
  expMonth: '',
  expYear: '',
  cvv: '',
  cardName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
};

/* ── Card number formatter (xxxx xxxx xxxx xxxx) ────────────── */
function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

/* ── Detect card brand by leading digits ────────────────────── */
function getCardBrand(num: string): string | null {
  const d = num.replace(/\D/g, '');
  if (/^4/.test(d)) return 'Visa';
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return 'Mastercard';
  if (/^3[47]/.test(d)) return 'Amex';
  if (/^6(?:011|5)/.test(d)) return 'Discover';
  return null;
}

export default function CheckoutPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [sessions, setSessions] = useState(4);
  const [serviceType, setServiceType] = useState<'meal-prep' | 'home-visit'>('meal-prep');

  const SERVICE_CONFIG = {
    'meal-prep': { label: 'Meal Prep', pricePerSession: 120, groceryPerSession: 30, unit: 'session' },
    'home-visit': { label: 'Home Visit', pricePerSession: 150, groceryPerSession: 0, unit: 'visit' },
  } as const;

  const config = SERVICE_CONFIG[serviceType];
  const servicePrice = sessions * config.pricePerSession;
  const groceryPrice = sessions * config.groceryPerSession;
  const subtotal = servicePrice + groceryPrice;

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setForm((prev) => ({ ...prev, cvv: digits }));
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 5);
    setForm((prev) => ({ ...prev, zip: digits }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate processing delay
    await new Promise((r) => setTimeout(r, 1800));
    setProcessing(false);
    setShowSuccess(true);
    setForm(EMPTY_FORM);
  };

  const cardBrand = getCardBrand(form.cardNumber);

  /* font-size ≥ 16px prevents iOS Safari auto-zoom on focus */
  const inputClass =
    'w-full rounded-lg border border-[#E0D8CF] bg-white px-3 py-2.5 sm:px-4 sm:py-3 font-[family-name:var(--font-sans)] text-[16px] sm:text-base text-[#2C2C2C] placeholder:text-[#B0A898] outline-none transition-colors focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20';

  const labelClass =
    'block mb-1 sm:mb-1.5 font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2C2C2C]';

  const selectClass =
    'w-full rounded-lg border border-[#E0D8CF] bg-white px-3 py-2.5 sm:px-4 sm:py-3 font-[family-name:var(--font-sans)] text-[16px] sm:text-base text-[#2C2C2C] outline-none transition-colors focus:border-[#6B8F71] focus:ring-2 focus:ring-[#6B8F71]/20 appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat';

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="bg-[#E8F0E9] py-8 sm:py-10 md:py-14">
        <div className="container-xl text-center">
          <p className="mb-1.5 sm:mb-2 font-[family-name:var(--font-sans)] text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#6B8F71]">
            Secure Checkout
          </p>
          <h1 className="section-heading text-2xl sm:text-3xl md:text-4xl">Complete Your Purchase</h1>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl font-[family-name:var(--font-sans)] text-base sm:text-lg text-[#5A5A5A]">
            You&apos;re one step away from better nutrition and a well-prepped kitchen.
          </p>
        </div>
      </section>

      {/* ── Checkout Form ──────────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-6 sm:py-10 md:py-14">
        <div className="container-xl max-w-4xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-8">
            {/* ── Left column: form fields ─────────────────────── */}
            <div className="lg:col-span-3 space-y-5 sm:space-y-8 order-2 lg:order-1">
              {/* Contact info */}
              <div className="rounded-xl border border-[#E0D8CF] bg-white p-4 sm:p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2C2C2C] mb-5">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(415) 555-0123"
                      value={form.phone}
                      onChange={set('phone')}
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {/* Payment info */}
              <div className="rounded-xl border border-[#E0D8CF] bg-white p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2C2C2C]">
                    Payment Details
                  </h2>
                  <div className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="font-[family-name:var(--font-sans)] text-xs font-semibold text-[#6B8F71]">
                      Secure
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className={labelClass}>
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      required
                      placeholder="Justine Sanidad"
                      value={form.cardName}
                      onChange={set('cardName')}
                      className={inputClass}
                      autoComplete="cc-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className={labelClass}>
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={handleCardNumberChange}
                        className={`${inputClass} pr-20`}
                        autoComplete="cc-number"
                      />
                      {cardBrand && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-[family-name:var(--font-sans)] text-xs font-bold text-[#6B8F71] bg-[#E8F0E9] px-2 py-0.5 rounded">
                          {cardBrand}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                    <div>
                      <label htmlFor="expMonth" className={labelClass}>
                        Month
                      </label>
                      <select
                        id="expMonth"
                        required
                        value={form.expMonth}
                        onChange={set('expMonth')}
                        className={selectClass}
                        autoComplete="cc-exp-month"
                      >
                        <option value="">MM</option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="expYear" className={labelClass}>
                        Year
                      </label>
                      <select
                        id="expYear"
                        required
                        value={form.expYear}
                        onChange={set('expYear')}
                        className={selectClass}
                        autoComplete="cc-exp-year"
                      >
                        <option value="">YY</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cvv" className={labelClass}>
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="123"
                        value={form.cvv}
                        onChange={handleCvvChange}
                        className={inputClass}
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <div className="rounded-xl border border-[#E0D8CF] bg-white p-4 sm:p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-serif)] text-xl font-semibold text-[#2C2C2C] mb-5">
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address1" className={labelClass}>
                      Street Address
                    </label>
                    <input
                      id="address1"
                      type="text"
                      required
                      placeholder="123 Main Street"
                      value={form.address1}
                      onChange={set('address1')}
                      className={inputClass}
                      autoComplete="address-line1"
                    />
                  </div>
                  <div>
                    <label htmlFor="address2" className={labelClass}>
                      Apt, Suite, Unit <span className="font-normal text-[#B0A898]">(optional)</span>
                    </label>
                    <input
                      id="address2"
                      type="text"
                      placeholder="Apt 4B"
                      value={form.address2}
                      onChange={set('address2')}
                      className={inputClass}
                      autoComplete="address-line2"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="city" className={labelClass}>
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        required
                        placeholder="San Francisco"
                        value={form.city}
                        onChange={set('city')}
                        className={inputClass}
                        autoComplete="address-level2"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className={labelClass}>
                        State
                      </label>
                      <select
                        id="state"
                        required
                        value={form.state}
                        onChange={set('state')}
                        className={selectClass}
                        autoComplete="address-level1"
                      >
                        <option value="">Select</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zip" className={labelClass}>
                        ZIP Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="94102"
                        value={form.zip}
                        onChange={handleZipChange}
                        className={inputClass}
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button — mobile */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={processing}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Complete Purchase'
                  )}
                </button>
              </div>
            </div>

            {/* ── Right column: order summary (sticky on desktop, first on mobile) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="lg:sticky lg:top-28 space-y-4 sm:space-y-6">
                <div className="rounded-xl border border-[#E0D8CF] bg-white p-4 sm:p-6 md:p-8">
                  <h2 className="font-[family-name:var(--font-serif)] text-lg sm:text-xl font-semibold text-[#2C2C2C] mb-4 sm:mb-5">
                    Order Summary
                  </h2>

                  {/* Service type toggle */}
                  <div className="grid grid-cols-2 gap-2 mb-5 sm:mb-6">
                    <button
                      type="button"
                      onClick={() => setServiceType('meal-prep')}
                      className={`rounded-lg border-2 px-3 py-2.5 text-center transition-colors ${
                        serviceType === 'meal-prep'
                          ? 'border-[#6B8F71] bg-[#E8F0E9] text-[#2C2C2C]'
                          : 'border-[#E0D8CF] bg-white text-[#5A5A5A] hover:border-[#6B8F71]/40'
                      }`}
                    >
                      <span className="block font-[family-name:var(--font-sans)] text-sm font-bold leading-tight">
                        Meal Prep
                      </span>
                      <span className="block font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A] mt-0.5">
                        $120/session
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType('home-visit')}
                      className={`rounded-lg border-2 px-3 py-2.5 text-center transition-colors ${
                        serviceType === 'home-visit'
                          ? 'border-[#6B8F71] bg-[#E8F0E9] text-[#2C2C2C]'
                          : 'border-[#E0D8CF] bg-white text-[#5A5A5A] hover:border-[#6B8F71]/40'
                      }`}
                    >
                      <span className="block font-[family-name:var(--font-sans)] text-sm font-bold leading-tight">
                        Home Visit
                      </span>
                      <span className="block font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A] mt-0.5">
                        $150/visit
                      </span>
                    </button>
                  </div>

                  {/* Line items */}
                  <div className="space-y-4 mb-5 sm:mb-6">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 mr-3">
                          <p className="font-[family-name:var(--font-sans)] font-semibold text-[#2C2C2C] text-sm">
                            {config.label} ({sessions} {sessions === 1 ? config.unit : `${config.unit}s`})
                          </p>
                          <p className="font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A] mt-0.5">
                            {serviceType === 'meal-prep'
                              ? 'Personalized in-home prep'
                              : 'Kitchen coaching & life skills'}
                          </p>
                        </div>
                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[#2C2C2C] text-sm whitespace-nowrap">
                          ${servicePrice.toFixed(2)}
                        </span>
                      </div>
                      {/* Session selector */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <button
                          type="button"
                          onClick={() => setSessions((s) => Math.max(1, s - 1))}
                          disabled={sessions <= 1}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#E0D8CF] bg-[#FAF7F2] text-[#2C2C2C] font-bold text-lg transition-colors hover:border-[#6B8F71] hover:bg-[#E8F0E9] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Decrease sessions"
                        >
                          &minus;
                        </button>
                        <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2C2C2C] w-6 text-center">
                          {sessions}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSessions((s) => Math.min(12, s + 1))}
                          disabled={sessions >= 12}
                          className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#E0D8CF] bg-[#FAF7F2] text-[#2C2C2C] font-bold text-lg transition-colors hover:border-[#6B8F71] hover:bg-[#E8F0E9] disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Increase sessions"
                        >
                          +
                        </button>
                        <span className="font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A] ml-1">
                          {config.unit}s/mo
                        </span>
                      </div>
                    </div>
                    {groceryPrice > 0 && (
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 mr-3">
                          <p className="font-[family-name:var(--font-sans)] font-semibold text-[#2C2C2C] text-sm">
                            Grocery Shopping
                          </p>
                          <p className="font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A] mt-0.5">
                            Fresh ingredients included
                          </p>
                        </div>
                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[#2C2C2C] text-sm whitespace-nowrap">
                          ${groceryPrice.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-[#E0D8CF] pt-3 sm:pt-4 space-y-2">
                    <div className="flex justify-between font-[family-name:var(--font-sans)] text-sm text-[#5A5A5A]">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-[family-name:var(--font-sans)] text-sm text-[#5A5A5A]">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-[#E0D8CF] mt-3 sm:mt-4 pt-3 sm:pt-4 flex justify-between">
                    <span className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C]">
                      Total
                    </span>
                    <span className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit button — desktop */}
                <div className="hidden lg:block">
                  <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Complete Purchase'
                    )}
                  </button>
                </div>

                {/* Trust signals */}
                <div className="rounded-xl border border-[#E0D8CF] bg-[#E8F0E9] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="font-[family-name:var(--font-sans)] text-sm font-semibold text-[#2C2C2C]">
                      Your payment is secure
                    </span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A]">
                      <span className="text-[#6B8F71] font-bold mt-px" aria-hidden="true">&#10003;</span>
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-start gap-2 font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A]">
                      <span className="text-[#6B8F71] font-bold mt-px" aria-hidden="true">&#10003;</span>
                      PCI-DSS compliant
                    </li>
                    <li className="flex items-start gap-2 font-[family-name:var(--font-sans)] text-xs text-[#5A5A5A]">
                      <span className="text-[#6B8F71] font-bold mt-px" aria-hidden="true">&#10003;</span>
                      100% satisfaction guarantee
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ── Success Modal Overlay ──────────────────────────────── */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 md:p-10 text-center shadow-2xl animate-[fadeInUp_0.35s_ease-out]">
            {/* Checkmark circle */}
            <div className="mx-auto mb-4 sm:mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#E8F0E9]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B8F71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:w-8 sm:h-8">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2
              id="success-title"
              className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl font-bold text-[#2C2C2C] mb-2"
            >
              Payment Successful!
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-sm sm:text-base text-[#5A5A5A] mb-2 leading-relaxed">
              Thank you for your purchase. A confirmation email has been sent to your inbox.
            </p>
            <p className="font-[family-name:var(--font-sans)] text-xs sm:text-sm text-[#B0A898] mb-5 sm:mb-6">
              Order #WPL-{String(Date.now()).slice(-6)}
            </p>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="btn-primary w-full sm:w-auto px-8 py-3"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Keyframe for modal animation ──────────────────────── */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
