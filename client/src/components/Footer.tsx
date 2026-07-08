import { BikeIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { footerData } from "../assets/assets"

const Footer = () => {
  return (
     <footer className="bg-app-green text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
             {/* Top Part of footer */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                   <Link to="/" className="flex items-center gap-2 mb-4">
                      <BikeIcon className="size-6 text-white" />
                      <span className="text-xl font-semibold">{footerData.brand.name}</span>
                   </Link>
                      <p className="text-sm text-white/70 mb-4">{footerData.brand.description}</p>

                <div className="flex gap-3">
                    {footerData.brand.socials.map((social, i) => (
                        <a key={i} href={social.link} className="size-9 rounded-lg bg-white/10 flex-center hover:bg-white/20"> <social.icon className="size-4"/>
                        </a>
                    ))}
                </div>
                </div>

                {/* Dynamic Sections */}
  

   {footerData.sections.map((section, i) => (
      <div key={i}>
         <h3 className="text-sm font-semibold uppercase mb-4">{section.title}</h3>
         <ul className="space-y-2">
            {section.links.map((link, j) => (
               <li key={j}>
                 <Link to={link.to ?? "#"} className="text-sm text-white/70 hover:text-white">
                    {link.label}
                 </Link>
               </li>
            ))}
         </ul>
      </div>
   ))}

             {/* Contact Us */}
             <div>
                <h3 className="text-sm font-semibold uppercase mb-4">Contact Us</h3>
                <ul className="space-y-3">
                   <li className="flex items-start gap-2 text-sm text-white/70">
                      <MapPinIcon className="size-4 mt-0.5 shrink-0" />
                      <span>123 Green Valley Rd, Lahore</span>
                   </li>
                   <li className="flex items-center gap-2 text-sm text-white/70">
                      <PhoneIcon className="size-4 shrink-0" />
                      <span>+1 (111) 123-4567</span>
                   </li>
                   <li className="flex items-center gap-2 text-sm text-white/70">
                      <MailIcon className="size-4 shrink-0" />
                      <span>hello@example.com</span>
                   </li>
                </ul>
             </div>

             </div>
             {/* Bottom Part of footer */}
             <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
                <p>© 2026 GullSnobar. All rights reserved.</p>
                <div className="flex items-center gap-6">
                   <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                   <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
             </div>
        </div>
     </footer>
  )
}

export default Footer