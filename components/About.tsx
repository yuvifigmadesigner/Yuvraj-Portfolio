
import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, Coffee, Camera, Mountain, MonitorOff, Heart } from 'lucide-react';
import LightRays from './LightRays';
import PhotoGallery from './PhotoGallery';
import { PROFILE_IMAGE_URL } from '../constants';

const About: React.FC = () => {
  const [showGallery, setShowGallery] = useState(false);
  const showGalleryHandler = () => setShowGallery(true);

  return (
    <>
      {/* LightRays Background for About Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dark overlay to ensure text legibility and better ray contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
        <LightRays
          raysOrigin="top-center"
          raysColor="#D69452" // Honey brown
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.3} // Increased noise
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <main className="flex-1 flex flex-col justify-start px-6 md:px-12 relative z-10 text-white w-full max-w-screen-2xl 2xl:max-w-[1800px] mx-auto pt-12 md:pt-24 pb-20 2xl:pt-32 animate-fade-in">
          {/* Page Header */}
          <div className="mb-16 md:mb-20 2xl:mb-32">
              <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-medium tracking-tight mb-6">About.</h1>
              <div className="w-16 h-1 2xl:w-24 2xl:h-1.5 bg-white/20"></div>
          </div>

          {/* PART 1: INFORMATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 2xl:gap-32 mb-24 md:mb-32 2xl:mb-48">
              
              {/* Left Column: Bio */}
              <div className="lg:col-span-7">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    
                    {/* Profile Picture Section */}
                    <div className="relative shrink-0 group mx-auto md:mx-0">
                         {/* Animated Glow Backdrop */}
                         <div className="absolute -inset-1 bg-gradient-to-tr from-orange-400/40 via-purple-500/40 to-blue-500/40 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                         
                         {/* Image Container */}
                         <div className="relative w-32 h-32 md:w-40 md:h-40 2xl:w-48 2xl:h-48 rounded-full p-[2px] bg-gradient-to-tr from-white/20 to-white/5 shadow-2xl">
                             <div className="w-full h-full rounded-full overflow-hidden bg-black/50 border border-white/10 relative z-10">
                                <img 
                                    src={PROFILE_IMAGE_URL} 
                                    alt="Profile" 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                                />
                             </div>
                         </div>

                         {/* Status Dot */}
                         <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-5 h-5 bg-[#1a1512] rounded-full flex items-center justify-center z-20">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                         </div>
                    </div>

                    {/* Bio Text */}
                    <div className="space-y-6 2xl:space-y-10 text-lg md:text-xl 2xl:text-3xl text-white/80 leading-relaxed font-light">
                        <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-2">/ Who I Am</h2>
                        <p>
                            Hi, I'm Yuvi. A certified Dreamer, Sarcasm Enthusiast, and recovering engineer turned designer. I might be "easily distracted," but that just means I have an entire universe of fresh ideas ready for your next project. 
                            My design philosophy is simple: It needs to be effective, beautiful, and absolutely pass the vibe check.
                        </p>
                        <p>
                            I operate primarily as a UX/UI Designer, using my B.Tech foundation (NIT Goa) and research-driven insights to ensure functionality meets aesthetic excellence. I specialize in designing and prototyping complex SaaS apps and websites.
                            My approach is built around pixel-perfect execution using Figma and AI Builders to deliver solutions that are both technically feasible and deeply intuitive for the user. I don't just hand off wireframes; I build interfaces that are ready to ship.
                            My superpower is the "Vibe Coder" approach: I seamlessly bridge the gap between design vision and development reality, ensuring zero friction from concept to launch.
                        </p>
                        <p>
                            Whether you're seeking a full-time teammate, a reliable freelancer, or just want to debate the moral implications of using Comic Sans, drop me an email.
                            Let's connect and turn some good vibes into great business.
                        </p>
                    </div>
                  </div>
              </div>

              {/* Right Column: Certificates & Capabilities */}
              <div className="lg:col-span-5 space-y-12 2xl:space-y-16">
                  {/* Certificates */}
                  <div>
                      <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ Certificates</h2>
                      <div className="space-y-1 2xl:space-y-2">
                          {[
                            { title: "Design Thinking in the Age of AI", link: "https://www.linkedin.com/learning/certificates/2bdc79d6f994cb42fe991937ff456c50a209d2b6d97fe4cef9744ab7cad6d2e9?trk=share_certificate" },
                            { title: "Design to Code: Using AI to Build Faster", link: "https://www.linkedin.com/learning/certificates/e3283fa67771467c00e390b9153c7b85230f92948ed036411924d167728e0975" },
                            { title: "Prompt Engineering: How to Talk to the AIs", link: "https://www.linkedin.com/learning/certificates/db03fe46fb752cb86b01b869767f4bed02c7f126a41e1b14af6aad81d150646a" },
                            { title: "UX Foundations: Analyzing User Data", link: "https://www.linkedin.com/learning/certificates/907cd6db4e2fbe61843bdcfe44cc133ff3a7e1200dbf79b9a8d1a06d2e94ac37" },
                            { title: "UX Research: Lean Experimentation", link: "https://www.linkedin.com/learning/certificates/602a8fef7d16c9e20bb1739b461b81250a9cca5e5064ec4c2b907dfdb63dc603" },
                            { title: "Figma UI UX Design Advanced", link: "https://www.udemy.com/certificate/UC-72054d57-e3d5-4d83-a149-9a0e280fecb2/" },
                            { title: "Figma UI UX Design Essentials", link: "https://www.udemy.com/certificate/UC-497b4213-0dc9-4aef-ac9c-d288f0765359/" },
                          ].map((cert, index) => (
                              <a 
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3 2xl:p-5 -mx-3 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                              >
                                  <span className="text-white/70 group-hover:text-white transition-colors text-sm md:text-base 2xl:text-xl font-light truncate pr-4">
                                    {cert.title}
                                  </span>
                                  <ArrowUpRight size={16} className="text-white/30 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 2xl:w-6 2xl:h-6" />
                              </a>
                          ))}
                      </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                      <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ Capabilities</h2>
                      <div className="flex flex-wrap gap-2 2xl:gap-4">
                          {['Product Strategy', 'UI/UX Design', 'Design Systems', 'Prototyping', 'User Research'].map((item) => (
                              <span key={item} className="px-3 py-1.5 2xl:px-5 2xl:py-2.5 bg-white/5 border border-white/10 rounded-md text-sm 2xl:text-lg text-white/70 hover:bg-white/10 transition-colors cursor-default">
                                  {item}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* PART 2: HOBBIES */}
          <div className="mb-24 md:mb-32 2xl:mb-48">
            <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ My Hobbies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-12">
                {/* Hobby 1 - Photography (Clickable) */}
                <div 
                  onClick={showGalleryHandler}
                  className="p-6 2xl:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-2xl"
                >
                    <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors">
                        <Camera size={24} strokeWidth={1.5} className="2xl:w-8 2xl:h-8" />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl 2xl:text-2xl font-medium">Photography</h3>
                      <span className="text-xs 2xl:text-sm text-white/40 uppercase tracking-widest opacity-100 transition-opacity">View</span>
                    </div>
                    <p className="text-white/60 text-sm 2xl:text-lg leading-relaxed">
                        Capturing textures, light, and candid moments. I love documenting the world through my lens.
                    </p>
                </div>

                {/* Hobby 2 - Volunteering */}
                <div className="p-6 2xl:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                        <Heart size={24} strokeWidth={1.5} className="2xl:w-8 2xl:h-8" />
                    </div>
                    <h3 className="text-xl 2xl:text-2xl font-medium mb-2">Volunteering</h3>
                    <p className="text-white/60 text-sm 2xl:text-lg leading-relaxed">
                        My way of giving back. Whether it's mentoring or local events, empowering others is the best feeling.
                    </p>
                </div>

                {/* Hobby 3 */}
                <div className="p-6 2xl:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                        <Mountain size={24} strokeWidth={1.5} className="2xl:w-8 2xl:h-8" />
                    </div>
                    <h3 className="text-xl 2xl:text-2xl font-medium mb-2">Traveling</h3>
                    <p className="text-white/60 text-sm 2xl:text-lg leading-relaxed">
                        Stepping away from the screen to find inspiration in nature and new cultures.
                    </p>
                </div>
            </div>
          </div>

          {/* FOOTER: CONTACT */}
          <div>
              <h2 className="text-xs 2xl:text-sm font-mono uppercase tracking-widest text-white/50 mb-8 2xl:mb-12">/ Get in Touch</h2>
              <div className="grid gap-4 2xl:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Email Card */}
                  <a 
                    href="mailto:yuvrajkumar0221@gmail.com" 
                    className="group flex items-center gap-4 p-5 2xl:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                          <Mail size={20} className="2xl:w-8 2xl:h-8" />
                      </div>
                      <div className="overflow-hidden">
                          <div className="text-xs 2xl:text-sm text-white/50 uppercase tracking-wider font-medium mb-0.5">Email</div>
                          <div className="text-sm 2xl:text-lg text-white/90 font-medium truncate">yuvrajkumar0221@gmail.com</div>
                      </div>
                  </a>

                  {/* Phone Card */}
                  <a 
                    href="tel:+917698893369" 
                    className="group flex items-center gap-4 p-5 2xl:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                          <Phone size={20} className="2xl:w-8 2xl:h-8" />
                      </div>
                      <div>
                          <div className="text-xs 2xl:text-sm text-white/50 uppercase tracking-wider font-medium mb-0.5">Phone</div>
                          <div className="text-sm 2xl:text-lg text-white/90 font-medium">+91 76988 93369</div>
                      </div>
                  </a>

                  {/* Buy Me a Coffee Card */}
                  <a 
                    href="https://buymeacoffee.com/yuvraj.gupta" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-4 p-5 2xl:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#FFDD00]/10 hover:border-[#FFDD00]/30 transition-all duration-300 sm:col-span-2 lg:col-span-1"
                  >
                      <div className="w-12 h-12 2xl:w-16 2xl:h-16 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#FFDD00] group-hover:text-black transition-colors shrink-0">
                          <Coffee size={20} className="2xl:w-8 2xl:h-8" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                          <div className="overflow-hidden mr-2">
                              <div className="text-xs 2xl:text-sm text-white/50 uppercase tracking-wider font-medium mb-0.5 group-hover:text-[#FFDD00] transition-colors">Support</div>
                              <div className="text-sm 2xl:text-lg text-white/90 font-medium truncate">Buy Me a Coffee</div>
                          </div>
                          <ArrowUpRight size={18} className="text-white/30 group-hover:text-[#FFDD00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 2xl:w-6 2xl:h-6" />
                      </div>
                  </a>
              </div>
          </div>
      </main>

      {/* Interactive Photo Gallery Overlay */}
      {showGallery && <PhotoGallery onClose={() => setShowGallery(false)} />}
    </>
  );
};

export default About;
