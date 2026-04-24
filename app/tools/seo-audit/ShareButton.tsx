"use client";

import { useState } from "react";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function getShareData() {
    let h = 0;
    const s = navigator.userAgent + screen.width + navigator.language;
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    const ref = Math.abs(h).toString(36).slice(0, 6);
    const shareUrl = `https://audit.assurgit.com/r/${ref}`;
    const subject = "Free SEO audit — check your site";
    const body = `Hey,\n\nThought you might find this useful — it's a free SEO audit tool that checks your whole site in a couple of minutes, no sign-up needed:\n\n${shareUrl}\n\nLet me know what you think.`;
    return { subject, body, shareUrl };
  }

  function openGmail() {
    const { subject, body } = getShareData();
    const url = `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  }

  function openMailto() {
    const { subject, body } = getShareData();
    const a = document.createElement("a");
    a.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function copyMessage() {
    const { subject, body } = getShareData();
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
        </svg>
        Share
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          {/* Popover */}
          <div className="fixed top-[104px] right-4 z-[9999] bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-72">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >×</button>
            <p className="text-xs font-semibold text-gray-700 mb-3">Send an invite</p>
            <div className="flex flex-col gap-2">
              <button
                onClick={openGmail}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                Open in Gmail
              </button>
              <button
                onClick={openMailto}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Open in Mail app
              </button>
              <button
                onClick={copyMessage}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {copied ? "✓ Copied!" : "Copy message"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
