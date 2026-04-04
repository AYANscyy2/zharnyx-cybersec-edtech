"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  User,
  AtSign,
  Smartphone,
  Building2,
  FileText,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

export function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Course Enrollment & Admissions",
    "Corporate Training & Bulk Enquiries",
    "Placement & Hiring Partnerships",
    "Institutional Collaborations",
    "General Program Feedback",
    "Technical Support / Website Issues",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
      gsap.from(".contact-info-item", {
        opacity: 0,
        x: -20,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });
    }, formRef);

    // Close dropdown on outside click
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      ctx.revert();
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-24 gap-6 text-center">
        <div className="p-5 border-2 border-red-500 bg-red-500/10">
          <CheckCircle2 size={48} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Transmission Received</h2>
        <p className="text-gray-400 max-w-md">Our operators will respond within 24 hours. Check your email for a confirmation.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-red-500 transition-colors border border-white/10 px-6 py-3"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section ref={formRef} className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0 border-2 border-white/10">

        {/* LEFT: Contact Info Panel */}
        <div className="bg-[#050505] border-b-2 lg:border-b-0 lg:border-r-2 border-white/10 p-10 flex flex-col justify-between gap-12">
          <div className="space-y-10">
            <div className="contact-info-item">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.25em] mb-5">Base of Operations</p>
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-gray-600 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  Zharnyx HQ, Cyber City,<br />Coimbatore, TN 641001
                </p>
              </div>
            </div>

            <div className="contact-info-item">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.25em] mb-5">Direct Uplink</p>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <Mail size={16} className="text-gray-600 shrink-0" />
                  <a href="mailto:ops@zharnyx.com" className="text-gray-300 text-sm hover:text-red-500 transition-colors font-sans">
                    ops@zharnyx.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail size={16} className="text-gray-600 shrink-0" />
                  <a href="mailto:support@zharnyx.com" className="text-gray-300 text-sm hover:text-red-500 transition-colors font-sans">
                    support@zharnyx.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone size={16} className="text-gray-600 shrink-0" />
                  <a href="tel:+914222345678" className="text-gray-300 text-sm hover:text-red-500 transition-colors font-sans">
                    +91 (422) 234-5678
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-info-item">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.25em] mb-5">Secure Channels</p>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/zharnyx" },
                  { icon: Linkedin, href: "https://linkedin.com/company/zharnyx" },
                  { icon: Twitter, href: "https://twitter.com/zharnyx" },
                  { icon: Globe, href: "https://zharnyx.com" },
                ].map(({ icon: Icon, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/10 text-gray-500 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Response time note */}
          <div className="contact-info-item border-t border-white/10 pt-8">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0 animate-pulse" />
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Operators Online</p>
                <p className="text-gray-600 text-xs font-sans leading-relaxed">We typically respond within 24 hours on business days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: The Form */}
        <div className="bg-[#0a0a0a] p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatField id="fullName" label="Full Name" icon={User} placeholder="Jane Doe" required />
              <FloatField id="email" label="Email Address" type="email" icon={AtSign} placeholder="jane@example.com" required />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatField id="phone" label="Contact Number" type="tel" icon={Smartphone} placeholder="+91 00000 00000" />
              <FloatField id="org" label="Organization / Institution" icon={Building2} placeholder="University or Company Name" />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatField id="subject" label="Subject of Inquiry" icon={FileText} placeholder="Admission Query / Partnership" required />

              {/* Custom dropdown */}
              <div className={`form-field space-y-2 relative ${open ? "z-30" : "z-0"}`} ref={dropdownRef}>
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ChevronDown size={10} className="text-red-500" />
                  Nature of Query
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`w-full flex items-center justify-between border-b-2 py-3 text-sm font-mono transition-all text-left ${open ? "border-red-500 text-white" : "border-white/20 text-gray-500"} hover:border-white/50 bg-transparent`}
                  >
                    <span className={category ? "text-white" : "text-gray-600"}>
                      {category || "Select a category..."}
                    </span>
                    <ChevronDown size={14} className={`transition-transform text-gray-500 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-[#111] border border-white/10 border-t-red-500 border-t-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] mt-0">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => { setCategory(cat); setOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors ${category === cat ? "bg-red-600/20 text-red-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="form-field space-y-2">
              <label htmlFor="message" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <MessageSquare size={10} className="text-red-500" />
                How Can We Help?
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell us about your requirements, questions, or anything else..."
                className="w-full bg-transparent border-2 border-white/10 focus:border-red-500 p-4 text-white text-sm font-sans placeholder:text-gray-700 resize-none outline-none transition-colors"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-gray-600 text-xs font-sans">
                We&apos;ll never share your information with third parties.
              </p>
              <button
                type="submit"
                className="group relative flex items-center gap-3 px-10 py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest border-2 border-red-600 hover:-translate-y-0.5 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]"
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

function FloatField({
  id, label, placeholder, icon: Icon, type = "text", required
}: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ElementType;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="form-field space-y-2">
      <label
        htmlFor={id}
        className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-colors ${focused ? "text-red-500" : "text-gray-500"}`}
      >
        <Icon size={10} className={focused ? "text-red-500" : "text-gray-600"} />
        {label}{required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`w-full bg-transparent border-b-2 py-3 text-sm font-mono text-white placeholder:text-gray-700 outline-none transition-all ${focused ? "border-red-500" : hasValue ? "border-white/40" : "border-white/15"} hover:border-white/30`}
        />
        {focused && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-red-500 scale-x-100 origin-left" />}
      </div>
    </div>
  );
}
