'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { trackContactForm } from '@/lib/analytics';

const ENQUIRY_TYPES = [
  'General enquiry',
  'Request a quote',
  'Technical support',
  'Contract manufacturing',
  'Export / overseas shipping',
  'SDS / documentation request',
];

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState(ENQUIRY_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // GA4 generate_lead
    trackContactForm(enquiryType);
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <section className="bg-[#002a55] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <p className="text-[#00a3e0] text-sm font-semibold tracking-widest uppercase mb-3">Sky Chemicals UK Ltd</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Contact Us</h1>
          <p className="text-blue-300 text-base max-w-xl">
            Speak to our sales or technical team about your requirements, request a quote, or enquire about
            contract manufacturing.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact details */}
        <div className="lg:col-span-2 space-y-7">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#00a3e0] mb-4">Get in touch</p>
            <ul className="space-y-5">
              {[
                { icon: <Phone   className="w-5 h-5 text-[#003d7a]" />, label: 'Telephone', value: '0114 555 0100' },
                { icon: <Mail    className="w-5 h-5 text-[#003d7a]" />, label: 'Email',     value: 'info@skychemicals.co.uk' },
                { icon: <MapPin  className="w-5 h-5 text-[#003d7a]" />, label: 'Address',   value: 'Sheffield, South Yorkshire, United Kingdom' },
                { icon: <Clock   className="w-5 h-5 text-[#003d7a]" />, label: 'Hours',     value: 'Mon–Fri 08:30–17:00' },
              ].map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{c.label}</div>
                    <div className="text-gray-800 font-medium text-sm">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enquiry form */}
        <div className="lg:col-span-3 bg-gray-50 border border-gray-200 rounded-2xl p-7">
          <h2 className="font-bold text-gray-900 text-lg mb-5">Send an enquiry</h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <h3 className="font-bold text-gray-900 text-lg">Thank you for your enquiry</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                A member of our team will be in touch within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-[#003d7a] hover:underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input type="text" placeholder="Jane Smith" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Company</label>
                  <input type="text" placeholder="Acme Ltd" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email Address</label>
                <input type="email" placeholder="jane@example.com" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Enquiry Type</label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a] bg-white"
                >
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Message</label>
                <textarea rows={4} placeholder="Please describe your requirements…" required className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a] resize-none" />
              </div>
              <button
                type="submit"
                className="w-full bg-[#003d7a] text-white font-semibold py-3 rounded-lg hover:bg-[#00a3e0] transition-colors text-sm"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
