"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContactForm() {
  const formRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([leftPanelRef.current, rightPanelRef.current], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={formRef} className="w-full max-w-7xl mx-auto py-12">
      <div className="flex flex-col items-center gap-16">


        {/* Middle: The Form Section */}
        <div ref={rightPanelRef} className="w-full max-w-5xl">
          <div className="relative p-1 bg-linear-to-br from-white/10 to-transparent">
            <div className="bg-[#080808] border border-white/10 p-8 md:p-12 space-y-10 shadow-[20px_20px_0px_0px_rgba(255,59,59,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <Field label="Full Name" placeholder="EX: Jane Doe" />
                <Field label="Email Address" placeholder="EX: jane@example.com" />
                <Field label="Contact Number" placeholder="EX: +91 00000 00000" />
                <Field label="Organization / Institution" placeholder="EX: University or Company Name" />
                <Field label="Subject Of Inquiry" placeholder="EX: Admission Query / Partnership Proposal" />
                <SelectField
                  label="Nature of Query"
                  placeholder="SELECT_CATEGORY..."
                  options={[
                    "Course Enrollment & Admissions",
                    "Corporate Training & Bulk Enquiries",
                    "Placement & Hiring Partnerships",
                    "Institutional Collaborations",
                    "General Program Feedback",
                    "Technical Support / Website Issues"
                  ]}
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-mono text-gray-400 uppercase font-black tracking-widest block">
                  {"// HOW CAN WE HELP?"}
                </label>
                <Textarea
                  placeholder="Tell us about your requirements or questions..."
                  className="bg-transparent border-0 border-b border-white/20 text-white font-mono placeholder:text-zinc-700 min-h-[160px] rounded-none focus-visible:ring-0 focus-visible:border-white transition-all resize-none p-0 pb-4 text-xl md:text-2xl"
                />
              </div>

              <div className="pt-6">
                <Button className="w-full md:w-auto px-12 bg-red-600 text-black font-black uppercase tracking-wider h-16 text-lg border-2 border-red-600 shadow-[8px_8px_0px_0px_white] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-red-500 rounded-none transition-all group">
                  <span>Send Message</span>
                  <Send className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Professional Contact Footer Bar */}
        <div ref={leftPanelRef} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10 mt-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Base of Operations</h4>
            <div className="flex gap-4 group/item">
              <MapPin size={20} className="text-gray-500 shrink-0 group-hover/item:text-red-500 transition-colors" />
              <a 
                href="https://maps.google.com/?q=Zharnyx+HQ+Cyber+City+Coimbatore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-white text-sm leading-relaxed hover:text-red-500 transition-colors"
              >
                Zharnyx HQ, Cyber City,<br /> Coimbatore, TN 641001
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Direct Uplink</h4>
            <div className="space-y-4">
              <div className="flex gap-4 group/item text-sm">
                <Mail size={20} className="text-gray-500 shrink-0 group-hover/item:text-red-500 transition-colors" />
                <div className="font-mono text-white space-y-1">
                  <a href="mailto:ops@zharnyx.com" className="block hover:text-red-500 transition-colors underline-offset-4 hover:underline">ops@zharnyx.com</a>
                  <a href="mailto:support@zharnyx.com" className="block hover:text-red-500 transition-colors underline-offset-4 hover:underline">support@zharnyx.com</a>
                </div>
              </div>
              <div className="flex gap-4 group/item text-sm">
                <Phone size={20} className="text-gray-500 shrink-0 group-hover/item:text-red-500 transition-colors" />
                <a href="tel:+914222345678" className="font-mono text-white hover:text-red-500 transition-colors tracking-tighter underline-offset-4 hover:underline">
                  +91 (422) 234-5678
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Secure Channels</h4>
            <div className="flex gap-3">
              <SocialLink icon={Github} href="https://github.com/zharnyx" />
              <SocialLink icon={Linkedin} href="https://linkedin.com/company/zharnyx" />
              <SocialLink icon={Twitter} href="https://twitter.com/zharnyx" />
              <SocialLink icon={Globe} href="https://zharnyx.com" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


function Field({ label, placeholder }: { label: string, placeholder: string }) {
  return (
    <div className="space-y-4">
      <label className="text-xs font-mono text-gray-500 uppercase font-black tracking-widest block">
        {`// ${label}`}
      </label>
      <Input
        placeholder={placeholder}
        className="bg-transparent border-0 border-b border-white/20 text-white font-mono placeholder:text-zinc-800 h-12 rounded-none focus-visible:ring-0 focus-visible:border-white transition-all p-0 text-lg"
      />
    </div>
  )
}

function SelectField({ label, placeholder, options }: { label: string, placeholder: string, options: string[] }) {
  return (
    <div className="space-y-4">
      <label className="text-xs font-mono text-gray-500 uppercase font-black tracking-widest block">
        {`// ${label}`}
      </label>
      <Select>
        <SelectTrigger className="w-full bg-transparent border-0 border-b border-white/20 text-white font-mono h-12 rounded-none focus:ring-0 focus:border-white transition-all p-0 text-lg hover:bg-transparent shadow-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/20 text-white font-mono rounded-none">
          {options.map(opt => (
            <SelectItem key={opt} value={opt.toLowerCase().replace(/\s+/g, '_')} className="focus:bg-red-600 focus:text-black">
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function SocialLink({ icon: Icon, href }: { icon: React.ElementType, href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white hover:bg-red-600 transition-all">
      <Icon size={20} />
    </a>
  )
}
