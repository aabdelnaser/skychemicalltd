import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
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
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Full Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Company</label>
                <input type="text" placeholder="Acme Ltd" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email Address</label>
              <input type="email" placeholder="jane@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Enquiry Type</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a] bg-white">
                <option>General enquiry</option>
                <option>Request a quote</option>
                <option>Technical support</option>
                <option>Contract manufacturing</option>
                <option>Export / overseas shipping</option>
                <option>SDS / documentation request</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Message</label>
              <textarea rows={4} placeholder="Please describe your requirements…" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d7a] resize-none" />
            </div>
            <button
              type="submit"
              className="w-full bg-[#003d7a] text-white font-semibold py-3 rounded-lg hover:bg-[#00a3e0] transition-colors text-sm"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
