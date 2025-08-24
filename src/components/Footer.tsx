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
    <footer className="text-white" style={{ backgroundColor: '#003242' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Section - Brand, Description and Navigation */}
          <div className="lg:col-span-1">
            <a href="https://www.maivencollective.com">
              <img 
                src="/lovable-uploads/e5d51b56-8563-4b2e-a77f-30ba78324129.png" 
                alt="The Maiven Collective Logo" 
                className="h-6 md:h-8 w-auto mb-6"
              />
            </a>
            <p className="text-white/90 font-poppins leading-relaxed mb-6">
              Maiven is where ambitious women don't just learn AI. They shape it, bend it, and make it work for their lives.
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
                className="transition-colors"
                style={{ color: '#F1F493' }}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/company/maivencollective" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#F1F493' }}
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="lg:col-span-1 hidden">
            <h3 className="font-poppins font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-white/80 font-poppins mb-6">
              Get the latest AI insights, event announcements, and community updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900 border-0 rounded-full flex-1"
              />
              <Button 
                type="submit"
                variant="secondary"
                className="font-poppins px-6"
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
              © 2025 Maiven AI LLC. All rights reserved.
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