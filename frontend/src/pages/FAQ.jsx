/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * FAQ Page - Frequently Asked Questions and Help
 */

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, Github, ExternalLink, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      questions: [
        {
          question: "What is Rock Spotter?",
          answer: "Rock Spotter is a social platform designed for rock enthusiasts, geologists, and fossil hunters. It's a community where you can share your rock discoveries, connect with fellow collectors, participate in hunting events, and organize your findings into albums."
        },
        {
          question: "How do I create an account?",
          answer: "Click the 'Join the Community' button on the homepage or navigate to the register page. You'll need to provide a username, email address, and create a password. Once registered, you can immediately start sharing your rock discoveries!"
        },
        {
          question: "Is Rock Spotter free to use?",
          answer: "Yes! Rock Spotter is completely free to use. You can create an account, share posts, join albums, participate in hunts, and connect with the community at no cost."
        },
        {
          question: "What types of rocks can I share?",
          answer: "All types! Whether you've found igneous, sedimentary, metamorphic rocks, minerals, fossils, or crystals - we welcome all geological discoveries. Each post can be categorized by rock type to help others find similar specimens."
        }
      ]
    },
    {
      title: "Sharing & Posts",
      icon: "📸",
      questions: [
        {
          question: "How do I share a rock discovery?",
          answer: "Click the 'Add Post' button in the navigation bar or on the social feed. Fill out the form with your rock's details including title, description, location, and rock type. You can also add photos to showcase your find!"
        },
        {
          question: "Can I edit or delete my posts?",
          answer: "Currently, posts cannot be edited or deleted once published. Make sure your information is accurate before posting. We're working on adding edit functionality in future updates."
        },
        {
          question: "What photo formats are supported?",
          answer: "We support common image formats including JPEG, PNG, and WebP. For best results, use high-quality photos that clearly show the rock's features, texture, and any unique characteristics."
        },
        {
          question: "How do I interact with other posts?",
          answer: "You can like posts by clicking the heart icon and leave comments to engage with the community. Use the filter options on the social feed to find posts about specific rock types or recent discoveries."
        }
      ]
    },
    {
      title: "Albums & Collections",
      icon: "📁",
      questions: [
        {
          question: "What are albums?",
          answer: "Albums are collections where you can organize your rock discoveries by theme, location, or type. You can create personal albums for your private collection or contribute to community albums shared with other members."
        },
        {
          question: "How do I create an album?",
          answer: "Go to the Albums page and click 'Create Album'. Give it a title and description, choose whether it's private or public, and start adding your rock posts to organize your collection."
        },
        {
          question: "What's the difference between personal and community albums?",
          answer: "Personal albums are created and managed by you - you control what goes in them. Community albums are collaborative spaces where multiple users can contribute their finds around a common theme or location."
        },
        {
          question: "Can I contribute to community albums?",
          answer: "Yes! Browse community albums and look for ones that match your finds. Most community albums welcome contributions from active members of the Rock Spotter community."
        }
      ]
    },
    {
      title: "Rock Hunts & Events",
      icon: "🗺️",
      questions: [
        {
          question: "What are rock hunts?",
          answer: "Rock hunts are community-organized events where members gather to explore specific locations for geological specimens. They're great opportunities to learn from experienced collectors and discover new hunting spots."
        },
        {
          question: "How do I join a hunt?",
          answer: "Visit the Hunts page to see upcoming events. Each hunt shows details like location, difficulty level, and what types of rocks you might find. Some hunts may have limited spots, so register early!"
        },
        {
          question: "Can I organize my own hunt?",
          answer: "Absolutely! Experienced members can create hunt events. Share your favorite hunting locations with the community and help others discover new geological treasures."
        },
        {
          question: "What should I bring to a hunt?",
          answer: "Basic geology tools like a rock hammer, safety glasses, collecting bags, and a field notebook. Many hunts will specify recommended equipment in their description. Always prioritize safety!"
        }
      ]
    },
    {
      title: "Profile & Achievements",
      icon: "🏆",
      questions: [
        {
          question: "How do achievements work?",
          answer: "Achievements are earned by being active in the community - sharing posts, participating in hunts, contributing to albums, and engaging with others. They're displayed on your profile to showcase your involvement."
        },
        {
          question: "Can I customize my profile?",
          answer: "Your profile displays your username, statistics (rocks shared, hunts completed, achievements), and your recent activity. More customization options like avatars and bio sections are planned for future updates."
        },
        {
          question: "How are my statistics calculated?",
          answer: "Your profile shows real data: number of rocks you've shared, hunts you've completed, and achievements you've earned. These update automatically as you participate in the community."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "⚙️",
      questions: [
        {
          question: "The app isn't loading properly. What should I do?",
          answer: "Try refreshing the page or clearing your browser cache. Rock Spotter works best on modern browsers like Chrome, Firefox, Safari, and Edge. If problems persist, contact support."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Currently, password reset functionality is being developed. For now, please contact support at jmenichole007@outlook.com with your username, and we'll help you regain access to your account."
        },
        {
          question: "Can I use Rock Spotter on mobile?",
          answer: "Yes! Rock Spotter is designed to work on both desktop and mobile devices. The responsive design adapts to your screen size for optimal viewing on phones and tablets."
        },
        {
          question: "Is my data secure?",
          answer: "We take data security seriously. User passwords are encrypted, and we follow best practices for protecting your personal information. We never share your data with third parties."
        }
      ]
    }
  ]

  const quickLinks = [
    {
      title: "Contact Developer",
      description: "Get direct support from the developer",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:jmenichole007@outlook.com",
      external: true
    },
    {
      title: "GitHub Repository",
      description: "Report bugs or request features",
      icon: <Github className="h-5 w-5" />,
      link: "https://github.com/jmenichole/Rock-Spotter",
      external: true
    },
    {
      title: "Developer Portfolio",
      description: "Learn more about the creator",
      icon: <ExternalLink className="h-5 w-5" />,
      link: "https://jmenichole.github.io/Portfolio/",
      external: true
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <HelpCircle className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Help & Support
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about Rock Spotter, or get in touch for personalized support.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : ""}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start space-x-3">
              <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
                {link.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{link.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FAQ Sections */}
      <div className="space-y-6">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="mr-3 text-2xl">{category.icon}</span>
                {category.title}
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {category.questions.map((item, itemIndex) => {
                const globalIndex = `${categoryIndex}-${itemIndex}`
                const isOpen = openItems.has(globalIndex)
                
                return (
                  <div key={itemIndex}>
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Still Need Help?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our developer is here to help! 
          Send an email with your question or feedback.
        </p>
        <a
          href="mailto:jmenichole007@outlook.com"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Contact Support
        </a>
        <p className="text-sm text-gray-500 mt-4">
          We typically respond within 24-48 hours
        </p>
      </div>
    </div>
  )
}

export default FAQ