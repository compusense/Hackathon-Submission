import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Contact Us</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We are here to assist you. Reach out to us for inquiries, feedback, or to file a complaint.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="p-8 bg-bocra-light dark:bg-gray-900 rounded-3xl flex flex-col gap-6 border border-transparent dark:border-gray-800">
              <h2 className="text-2xl font-bold text-bocra-blue dark:text-blue-400">Headquarters</h2>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 text-bocra-blue rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Plot 50671, Independence Avenue, Gaborone, Botswana</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 text-bocra-blue rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">+267 395 7755</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 text-bocra-blue rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">info@bocra.org.bw</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-800 text-bocra-blue rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Working Hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Mon - Fri: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-bocra-blue dark:bg-blue-800 text-white rounded-3xl flex flex-col gap-6">
              <h2 className="text-2xl font-bold">Follow Us</h2>
              <p className="text-sm text-blue-100">Stay connected through our social media channels for real-time updates.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 p-10 lg:p-16 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl"
            >
              <div className="flex flex-col gap-4 mb-12">
                <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Send us a Message</h2>
                <p className="text-gray-500 dark:text-gray-400">Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-bocra-light dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none dark:text-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-bocra-light dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none dark:text-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                  <select className="w-full px-6 py-4 bg-bocra-light dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none appearance-none dark:text-white transition-colors">
                    <option>General Inquiry</option>
                    <option>Consumer Complaint</option>
                    <option>Licensing Question</option>
                    <option>Media Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={6}
                    placeholder="How can we help you today?"
                    className="w-full px-6 py-4 bg-bocra-light dark:bg-gray-800 rounded-2xl border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none resize-none dark:text-white transition-colors"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3">
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
        <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-[3rem] overflow-hidden relative shadow-inner border border-gray-100 dark:border-gray-700">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 flex-col gap-4">
            <MapPin className="w-12 h-12" />
            <p className="font-bold">Interactive Map Placeholder</p>
            <p className="text-sm">Plot 50671, Independence Avenue, Gaborone</p>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.814541464333!2d25.9144!3d-24.6583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM5JzI5LjkiUyAyNcKwNTQnNTEuOCJF!5e0!3m2!1sen!2sbw!4v1630000000000!5m2!1sen!2sbw" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            className="opacity-80 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-500 relative z-10"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
