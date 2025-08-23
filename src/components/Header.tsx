import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative w-full">
      {/* Main header with gradient background matching the images */}
      <div className="header-gradient px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-white font-heading text-xl md:text-2xl font-light tracking-wide">
                MAIVEN COLLECTIVE
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="https://www.maivencollective.com/about" 
                className="text-white hover:text-white/80 transition-colors font-poppins"
              >
                About
              </a>
              <a 
                href="https://www.maivencollective.com/events" 
                className="text-white hover:text-white/80 transition-colors font-poppins"
              >
                Events
              </a>
              <a 
                href="https://www.maivencollective.com/contact" 
                className="text-white hover:text-white/80 transition-colors font-poppins"
              >
                Contact
              </a>
              <Button 
                variant="accent" 
                className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-full font-poppins"
                asChild
              >
                <a href="https://www.maivencollective.com/login">
                  Login
                </a>
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-white/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-6 py-4 space-y-4">
            <a 
              href="https://www.maivencollective.com/about" 
              className="block text-foreground hover:text-primary transition-colors font-poppins"
            >
              About
            </a>
            <a 
              href="https://www.maivencollective.com/events" 
              className="block text-foreground hover:text-primary transition-colors font-poppins"
            >
              Events
            </a>
            <a 
              href="https://www.maivencollective.com/contact" 
              className="block text-foreground hover:text-primary transition-colors font-poppins"
            >
              Contact
            </a>
            <Button 
              variant="accent" 
              className="w-full bg-purple-600 text-white hover:bg-purple-700 rounded-full font-poppins"
              asChild
            >
              <a href="https://www.maivencollective.com/login">
                Login
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;