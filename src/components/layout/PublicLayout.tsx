"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Menu, X } from "lucide-react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
              <Zap size={18} fill="currentColor" className="md:w-5 md:h-5" />
            </div>
            <div className="min-w-0">
              <span suppressHydrationWarning className="font-bold text-lg md:text-xl tracking-tight text-slate-900 truncate block">Garage Boost</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Pricing
            </Link>
            <Link href="/garages" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Find Garages
            </Link>
            <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Blog
            </Link>
            <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 md:gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 touch-manipulation px-2 py-2"
            >
              Login
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-bold bg-blue-600 text-white px-4 md:px-6 py-2.5 rounded-lg hover:bg-blue-700 whitespace-nowrap touch-manipulation min-h-11 flex items-center"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              <Link href="/" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/features" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </Link>
              <Link href="/pricing" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link href="/garages" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Find Garages
              </Link>
              <Link href="/blog" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/faq" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/about" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>

              <div className="mt-2 pt-3 border-t border-slate-200 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="w-full text-center text-sm font-semibold text-slate-700 border border-slate-300 rounded-lg py-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/pricing"
                  className="w-full text-center text-sm font-bold bg-blue-600 text-white rounded-lg py-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={20} fill="currentColor" />
              </div>
              <span suppressHydrationWarning className="font-bold text-xl">Garage Boost</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The UK&apos;s leading MOT reminder and revenue recovery platform for garages.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.facebook.com/BizzBoost.uk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://x.com/BizzBoostUK" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://www.linkedin.com/company/bizz-boost/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/garages" className="hover:text-white">Find Garages</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:cs@bizzboost.uk" className="hover:text-white">cs@bizzboost.uk</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:07380448187" className="hover:text-white">07380 448187</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Great Portland St, London W1W 5PF</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800">
          <p suppressHydrationWarning className="text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} Garage Boost. All rights reserved. Built for UK MOT garages.
          </p>
        </div>
      </footer>
    </div>
  );
}
