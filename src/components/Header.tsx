import React, { useState, useEffect } from "react";
import { Terminal, MessageSquareCode, Sliders, Menu, X, FileText, Globe } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  accentClass: string;
}

export default function Header({
  activeSection,
  setActiveSection,
  accentClass,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "publications", label: "Publications" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-[0_4px_24px_rgba(168,85,247,0.03)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo/Brand */}
        <div
          id="header-brand"
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => handleNavClick("home")}
        >
          <div className="p-1.5 rounded-lg bg-purple-50 border border-purple-100 group-hover:border-purple-300 transition-colors">
            <span className="font-mono text-sm font-bold text-purple-600">&lt;AM/&gt;</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-850 group-hover:text-purple-600 transition-colors">
            AM Pritam
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeSection === item.id
                  ? "text-purple-700 bg-purple-50/80 border border-purple-100/80 shadow-sm"
                  : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-slate-600 hover:text-purple-600"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-purple-100 py-4 px-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-4 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? "text-purple-700 bg-purple-50"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
