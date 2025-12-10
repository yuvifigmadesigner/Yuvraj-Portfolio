
import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Linkedin, Instagram, ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: string;
}

const SERVICES = [
  'UX/UI Design SaaS',
  'Re-Design SaaS',
  'Vibe Coding'
];

const CONTACT_METHODS = [
  { id: 'gmail', label: 'Gmail', icon: Mail, color: 'hover:bg-red-500/20 hover:border-red-500/50' },
  { id: 'whatsapp', label: 'WhatsApp', icon: Phone, color: 'hover:bg-green-500/20 hover:border-green-500/50' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-600/20 hover:border-blue-600/50' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'hover:bg-pink-500/20 hover:border-pink-500/50' },
];

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    service: initialService,
    description: '',
    method: 'gmail'
  });

  // Update service if prop changes
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the message
    const subject = `Inquiry: ${formData.service}`;
    const body = `Hi Yuvi,\n\nMy name is ${formData.name}.\n\nI am interested in ${formData.service}.\n\nHere are the details of the work:\n${formData.description}\n\nLooking forward to connecting!`;
    
    const encodedBody = encodeURIComponent(body);
    const encodedSubject = encodeURIComponent(subject);

    let redirectUrl = '';

    // Logic to redirect based on method
    switch (formData.method) {
      case 'gmail':
        redirectUrl = `mailto:yuvrajkumar0221@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        break;
      case 'whatsapp':
        // Using WhatsApp API for mobile number
        redirectUrl = `https://wa.me/917698893369?text=${encodedBody}`;
        break;
      case 'linkedin':
        // LinkedIn doesn't support pre-filled messages via URL easily, redirecting to profile
        redirectUrl = `https://www.linkedin.com/in/yuvrajgupta0221/`;
        break;
      case 'instagram':
        // Instagram direct to profile
        redirectUrl = `https://www.instagram.com/yu_veeee/`;
        break;
      default:
        redirectUrl = `mailto:yuvrajkumar0221@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    }

    // Open in new tab
    window.open(redirectUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#1a1512] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
            <h3 className="text-xl font-medium text-white">Start a Project</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Form Area */}
          <div className="overflow-y-auto p-6 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Service Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Service Required</label>
                <div className="relative">
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    {SERVICES.map(s => (
                      <option key={s} value={s} className="bg-[#1a1512] text-white">{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Project Details</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me a bit about what you need..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              {/* Connection Method */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-1">Connect via</label>
                <div className="grid grid-cols-2 gap-3">
                  {CONTACT_METHODS.map((method) => {
                    const Icon = method.icon;
                    const isSelected = formData.method === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({...formData, method: method.id})}
                        className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-white text-black border-white' 
                            : `bg-white/5 border-white/10 text-white/70 ${method.color}`
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{method.label}</span>
                        {isSelected && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-white/30 ml-1">
                  *Selecting Gmail or WhatsApp will pre-fill a message for you.
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mt-4"
              >
                <span>Let's Connect</span>
                <ArrowRight size={18} />
              </button>

            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceModal;
