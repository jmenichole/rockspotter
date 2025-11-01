/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Footer Component - Site footer with social links and branding
 */

import { Heart, Github, Linkedin, Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Branding */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">© 2025 Rock Spotter Community</span>
            </div>
          </div>

          {/* Center - Built for community message */}
          <div className="text-center">
            <span className="text-sm text-gray-400">Built with ❤️ for the rock community</span>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://ko-fi.com/jmenichole0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors"
              aria-label="Support on Ko-fi"
            >
              <Coffee className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/jmenichole0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/sponsors/jmenichole" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="GitHub Sponsors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              <a href="mailto:jmenichole007@outlook.com" className="hover:text-primary-400 transition-colors">Contact</a>
              <a href="https://github.com/jmenichole/Rock-Spotter/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">About</a>
              <a href="/faq" className="hover:text-primary-400 transition-colors">Help & Support</a>
              <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="/community-guidelines" className="hover:text-primary-400 transition-colors">Community Guidelines</a>
              <a href="https://jmenichole.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Developer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer