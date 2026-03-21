import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Twitter, Youtube, MapPin, Send } from "lucide-react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Footer = () => {
  const [open, setOpen] = useState(null);
  const [socials, setSocials] = useState(null);
  const [contact, setContact] = useState({ phone: '+91 62818 74010', email: 'heven.storess@gmail.com' });
  const { backendUrl } = useContext(ShopContext);

  const toggle = (key) => setOpen(open === key ? null : key);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/settings/get`);
        if (res.data?.success) {
          if (res.data.settings?.socialLinks) setSocials(res.data.settings.socialLinks);
          if (res.data.settings?.contactInfo) {
             setContact({
                phone: res.data.settings.contactInfo.phone || '+91 62818 74010',
                email: res.data.settings.contactInfo.email || 'heven.storess@gmail.com'
             });
          }
        }
      } catch (err) { }
    };
    fetchSettings();
  }, [backendUrl]);

  return (
    <>
      <div className="mt-20" />

      {/* ================= PRE-FOOTER NEWSLETTER ================= */}
      <div className="bg-[#6B4E2E] px-4 py-16 text-center">
         <h2 className="text-3xl font-serif text-[#D8BF91] mb-4 tracking-wide font-black">WILDBEARS SOCIETY</h2>
         <p className="text-[#D8BF91]/80 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Join the inner circle. Subscribe to receive exclusive early access to drops, private sales, and curated lifestyle content directly to your inbox.
         </p>
         <div className="max-w-md mx-auto relative flex items-center">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="w-full bg-[#5a4225] border border-[#D8BF91]/30 text-[#D8BF91] placeholder-[#D8BF91]/50 px-6 py-4 rounded-full outline-none focus:border-[#D8BF91] transition-all shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D8BF91] rounded-full flex items-center justify-center text-[#6B4E2E] hover:scale-105 transition-transform">
               <Send size={18} className="translate-x-[1px]" />
            </button>
         </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <footer className="bg-[#D8BF91] text-[#6B4E2E] px-4 pt-20 pb-12 relative overflow-hidden">
        
        {/* Background geometry for premium feel */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* ================= DESKTOP GRID ================= */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 text-sm">
            
            {/* BRANDING & SOCIAL */}
            <div className="col-span-2">
              <img src={assets.logo} alt="WILDBEARS" className="w-48 mb-6 brightness-0 mix-blend-color-burn" />
              <p className="text-[#6B4E2E]/80 leading-relaxed max-w-sm mb-8">
                 Pioneering high-aesthetic functional apparel. We blend raw utilitarian durability with premium contemporary design.
              </p>
              
              {/* Dynamic Socials */}
              <div className="flex gap-4">
                 {[
                   { id: 'instagram', icon: Instagram, href: socials?.instagram },
                   { id: 'facebook', icon: Facebook, href: socials?.facebook },
                   { id: 'twitter', icon: Twitter, href: socials?.twitter },
                   { id: 'youtube', icon: Youtube, href: socials?.youtube }
                 ].map((social) => (
                   social.href && social.href.trim() !== "" && (
                     <a 
                       key={social.id} 
                       href={social.href} 
                       target="_blank" 
                       rel="noreferrer"
                       className="w-10 h-10 rounded-full border border-[#6B4E2E]/30 flex items-center justify-center hover:bg-[#6B4E2E] hover:text-[#D8BF91] transition-all hover:-translate-y-1 shadow-sm"
                     >
                       <social.icon size={18} strokeWidth={1.5} />
                     </a>
                   )
                 ))}
                 {!socials && <span className="text-xs italic opacity-60">Syncing telemetry...</span>}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2">Discover</h3>
              <ul className="space-y-3 font-medium text-[#6B4E2E]/80">
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit"><Link to="/about">Our Story</Link></li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Lookbook 2026</li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Sustainability</li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Investors</li>
              </ul>
            </div>

            {/* CLIENT SERVICES */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Services</h3>
              <ul className="space-y-3 font-medium text-[#6B4E2E]/80">
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer"><Link to="/orders">Order Tracking</Link></li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Shipping & Logistics</li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Returns Protocol</li>
                <li className="hover:text-[#6B4E2E] hover:translate-x-1 transition-transform w-fit cursor-pointer">Client Profile</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-6">Connect</h3>
              <ul className="space-y-4 font-medium text-[#6B4E2E]/90">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 opacity-80" strokeWidth={1.5}/> 
                  <span>{contact.phone}<br/><span className="text-xs opacity-70">Mon-Fri, 9am-6pm IST</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="opacity-80" strokeWidth={1.5}/> 
                  <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="opacity-80" strokeWidth={1.5}/> 
                  <span className="underline cursor-pointer italic hover:no-underline">Global Store Locator</span>
                </li>
              </ul>
            </div>

          </div>

          {/* ================= MOBILE ACCORDION ================= */}
          <div className="md:hidden space-y-2 mb-10">
            <img src={assets.logo} alt="WILDBEARS" className="w-40 mb-8 brightness-0 mix-blend-color-burn" />
            
            {[
              { key: "discover", title: "DISCOVER" },
              { key: "services", title: "CLIENT SERVICES" },
              { key: "connect", title: "CONNECT WITH US" }
            ].map(({ key, title }) => (
              <div key={key} className="border-b border-[#6B4E2E]/20">
                <div 
                  className="flex justify-between items-center py-4 cursor-pointer"
                  onClick={() => toggle(key)}
                >
                  <h3 className="text-xs font-bold tracking-widest">{title}</h3>
                  <span className={`text-xl font-light transition-transform duration-300 ${open === key ? 'rotate-45' : ''}`}>+</span>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === key ? 'max-h-60 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-3 text-sm text-[#6B4E2E]/80 font-medium">
                    {key === "discover" && (
                      <>
                        <li><Link to="/about">Our Story</Link></li>
                        <li>Lookbook 2026</li>
                        <li>Sustainability</li>
                      </>
                    )}
                    {key === "services" && (
                      <>
                        <li><Link to="/orders">Order Tracking</Link></li>
                        <li>Shipping & Returns</li>
                        <li>Client Profile</li>
                      </>
                    )}
                    {key === "connect" && (
                      <>
                        <li className="flex gap-2 items-center"><Phone size={14} /> {contact.phone}</li>
                        <li className="flex gap-2 items-center"><Mail size={14} /> {contact.email}</li>
                        <li className="underline cursor-pointer">Store Locator</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}

            {/* Mobile Socials */}
            <div className="flex gap-4 pt-8">
                 {[
                   { id: 'instagram', icon: Instagram, href: socials?.instagram },
                   { id: 'facebook', icon: Facebook, href: socials?.facebook },
                   { id: 'twitter', icon: Twitter, href: socials?.twitter },
                   { id: 'youtube', icon: Youtube, href: socials?.youtube }
                 ].map((social) => (
                   social.href && social.href.trim() !== "" && (
                     <a 
                       key={social.id} 
                       href={social.href} 
                       target="_blank" 
                       rel="noreferrer"
                       className="w-10 h-10 rounded-full border border-[#6B4E2E]/30 flex items-center justify-center hover:bg-[#6B4E2E] hover:text-[#D8BF91] transition-all"
                     >
                       <social.icon size={18} strokeWidth={1.5} />
                     </a>
                   )
                 ))}
            </div>
          </div>

          {/* ================= BOTTOM BAR ================= */}
          <div className="border-t border-[#6B4E2E]/20 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium text-[#6B4E2E]/70">
            <p className="tracking-widest uppercase">© {new Date().getFullYear()} WILDBEARS INC. ALL RIGHTS RESERVED.</p>
            
            <div className="flex items-center gap-6">
               <p className="hover:text-[#6B4E2E] cursor-pointer transition-colors">Privacy Policy</p>
               <p className="hover:text-[#6B4E2E] cursor-pointer transition-colors">Terms of Service</p>
               <p className="hover:text-[#6B4E2E] cursor-pointer transition-colors">Accessibility</p>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
