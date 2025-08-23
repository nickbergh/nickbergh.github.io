import { useState } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup - could integrate with your existing system
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Section - Brand, Description and Navigation */}
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/e5d51b56-8563-4b2e-a77f-30ba78324129.png" 
              alt="The Maiven Collective Logo" 
              className="h-6 md:h-8 w-auto mb-6"
            />
            <p className="text-white/90 font-poppins leading-relaxed mb-6">
              Building the future of AI through community, collaboration, and collective intelligence. 
              Join thousands of professionals transforming their careers with artificial intelligence.
            </p>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap gap-6 mb-6">
              <a 
                href="https://www.maivencollective.com/about" 
                className="text-white/80 hover:text-white transition-colors font-poppins"
              >
                About Us
              </a>
              <a 
                href="https://www.maivencollective.com/pricing" 
                className="text-white/80 hover:text-white transition-colors font-poppins"
              >
                Pricing
              </a>
              <a 
                href="https://www.maivencollective.com/contact" 
                className="text-white/80 hover:text-white transition-colors font-poppins"
              >
                Contact
              </a>
              <a 
                href="https://www.maivencollective.com/events" 
                className="text-white/80 hover:text-white transition-colors font-poppins"
              >
                Events
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/maivencollective" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/company/maivencollective" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-poppins font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-white/80 font-poppins mb-6">
              Get the latest AI insights, event announcements, and community updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 border-0 rounded-full"
              />
              <Button 
                type="submit"
                className="w-full bg-yellow-400 text-teal-700 hover:bg-yellow-300 rounded-full font-poppins font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Legal */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 font-poppins text-sm">
              © 2024 The Maiven Collective. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.maivencollective.com/privacy" 
                className="text-white/60 hover:text-white transition-colors font-poppins text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="https://www.maivencollective.com/terms" 
                className="text-white/60 hover:text-white transition-colors font-poppins text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;