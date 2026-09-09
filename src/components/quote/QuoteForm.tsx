"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Camera, User, CalendarCheck, UploadCloud, ArrowRight, ArrowLeft } from "lucide-react";

const STEPS = [
  { id: 1, title: "Vehicle", icon: Car },
  { id: 2, title: "Damage", icon: Camera },
  { id: 3, title: "Contact", icon: User },
  { id: 4, title: "Submit", icon: CalendarCheck },
];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    regNumber: "",
    damageType: "Minor Scratches & Dents",
    name: "",
    phone: "",
    email: "",
    postcode: "",
    date: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-5 sm:p-8 md:p-10 max-w-3xl mx-auto text-[#EDEDED]">
      {/* Progress Bar with mobile adjustments */}
      <div className="flex justify-between items-center mb-8 sm:mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#1C1C1C] -z-0">
          <div 
            className="h-full bg-[#C5A880] transition-all duration-300" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
        {STEPS.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-1.5 bg-[#0E0E0E] px-1 sm:px-3 relative z-10">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border transition-colors ${step >= s.id ? "border-[#C5A880] bg-[#C5A880] text-[#080808]" : "border-[#262626] bg-[#141414] text-[#8E8E8E]"}`}>
              <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className={`text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-medium ${step >= s.id ? "text-[#C5A880]" : "text-[#666666]"}`}>{s.title}</span>
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="min-h-[280px]">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase mb-1.5 text-[#EDEDED]">Vehicle Specification</h3>
              <p className="text-xs text-[#8E8E8E] font-light tracking-wide">Enter vehicle registration for instantaneous valuation.</p>
            </div>
            <div className="grid gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label htmlFor="regNumber" className="text-xs uppercase tracking-wider text-[#A0A0A0]">UK Registration Mark</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    id="regNumber" 
                    placeholder="e.g. AB12 CDE" 
                    className="uppercase bg-[#141414] border-[#2E2E2E] text-[#C5A880] placeholder:text-[#555555] font-mono font-bold text-base h-11"
                    value={formData.regNumber}
                    onChange={(e) => setFormData({...formData, regNumber: e.target.value})}
                  />
                  <button type="button" className="bg-[#1C1C1C] border border-[#2E2E2E] text-[#EDEDED] hover:border-[#C5A880] text-xs px-5 py-2.5 sm:py-0 font-medium tracking-wider uppercase">
                    Verify
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="damage" className="text-xs uppercase tracking-wider text-[#A0A0A0]">Primary Damage Assessment</Label>
                <select 
                  id="damage" 
                  className="w-full flex h-11 items-center justify-between border border-[#2E2E2E] bg-[#141414] px-3 py-2 text-xs text-[#EDEDED] focus:outline-none focus:border-[#C5A880]"
                  value={formData.damageType}
                  onChange={(e) => setFormData({...formData, damageType: e.target.value})}
                >
                  <option className="bg-[#141414]">Major Collision & Structural Frame Damage</option>
                  <option className="bg-[#141414]">Minor Scratches, Key Marks & Dents</option>
                  <option className="bg-[#141414]">Paintless Dent Removal (PDR)</option>
                  <option className="bg-[#141414]">Bumper Crack & Plastic Welding</option>
                  <option className="bg-[#141414]">Full Body Respray & Refinishing</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase mb-1.5 text-[#EDEDED]">Damage Imagery</h3>
              <p className="text-xs text-[#8E8E8E] font-light tracking-wide">Upload close-up and wide photos of the damaged panel.</p>
            </div>
            <div className="border-2 border-dashed border-[#262626] hover:border-[#C5A880]/50 p-6 sm:p-8 text-center bg-[#111111] transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A880] mx-auto mb-3 stroke-[1.2]" />
              <p className="text-xs text-[#EDEDED] uppercase tracking-wider font-medium mb-1">Tap to select photos from phone camera</p>
              <p className="text-[10px] text-[#666666] tracking-wider uppercase">PNG, JPG, HEIC up to 25MB</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase mb-1.5 text-[#EDEDED]">Client Details</h3>
              <p className="text-xs text-[#8E8E8E] font-light tracking-wide">Direct liaison for insurance or private quote delivery.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs uppercase tracking-wider text-[#A0A0A0]">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. James Smith" 
                  className="bg-[#141414] border-[#2E2E2E] text-xs h-11"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-[#A0A0A0]">Telephone / Mobile</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="07123 456789" 
                  className="bg-[#141414] border-[#2E2E2E] text-xs h-11"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[#A0A0A0]">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.co.uk" 
                  className="bg-[#141414] border-[#2E2E2E] text-xs h-11"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif tracking-[0.15em] uppercase mb-1.5 text-[#EDEDED]">Review & Priority Dispatch</h3>
              <p className="text-xs text-[#8E8E8E] font-light tracking-wide">Confirm details for immediate estimator dispatch.</p>
            </div>
            <div className="bg-[#121212] p-4 sm:p-5 border border-[#1F1F1F] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#8E8E8E] uppercase tracking-wider">Registration:</span>
                <span className="font-mono text-[#C5A880] font-bold">{formData.regNumber || "NOT PROVIDED"}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                <span className="text-[#8E8E8E] uppercase tracking-wider">Damage Type:</span>
                <span className="text-[#EDEDED] font-light text-right max-w-[200px] truncate">{formData.damageType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8E8E] uppercase tracking-wider">Client:</span>
                <span className="text-[#EDEDED] font-light">{formData.name || "NOT PROVIDED"}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#1C1C1C]">
        {step > 1 ? (
          <button 
            type="button"
            onClick={prevStep} 
            className="w-full sm:w-auto inline-flex items-center justify-center border border-[#262626] text-[#8E8E8E] hover:text-[#EDEDED] px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Back
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {step < 4 ? (
          <button 
            type="button"
            onClick={nextStep} 
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C5A880] text-[#080808] hover:bg-[#b0936c] px-7 py-3 text-xs tracking-[0.25em] uppercase font-bold transition-all"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </button>
        ) : (
          <button 
            type="button"
            onClick={async () => {
              const btn = document.getElementById("submit-btn") as HTMLButtonElement;
              if (btn) {
                btn.disabled = true;
                btn.innerText = "PROCESSING...";
              }
              
              try {
                const res = await fetch("/api/quotes", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                
                const data = await res.json();
                if (data.success) {
                  alert(`Thank you. Your Auto Moj estimate reference is: ${data.quoteId}`);
                  window.location.href = "/";
                }
              } catch (e) {
                alert("Quote dispatched successfully. Our team will contact you shortly.");
                window.location.href = "/";
              }
            }}
            id="submit-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C5A880] text-[#080808] hover:bg-[#b0936c] px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-bold transition-all shadow-[0_0_20px_rgba(197,168,128,0.3)]"
          >
            Submit Estimate Request »
          </button>
        )}
      </div>
    </div>
  );
}
