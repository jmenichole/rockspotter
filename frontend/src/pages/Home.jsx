/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Home Page - Landing page showcasing the social features of Rock Spotter
 */

import { Link } from 'react-router-dom'
import { Camera, Map, Trophy, Users, Mountain, ArrowRight, Heart, MessageCircle, Share2, Sparkles, Star, Globe } from 'lucide-react'
import FeaturedFindsCarousel from '../components/FeaturedFindsCarousel'

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Social Feed",
      description: "Follow fellow rock enthusiasts, like and comment on discoveries, and join discussions about geology.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      title: "Share Your Finds",
      description: "Post photos of your geological discoveries with detailed descriptions, locations, and connect with the community.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      title: "Join Discussions",
      description: "Engage in conversations about rock types, formation processes, and share your geological knowledge.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Map className="h-8 w-8 text-purple-500" />,
      title: "Rock Hunts & Adventures",
      description: "Participate in community-organized rock hunting expeditions and geological exploration events.",
      gradient: "from-purple-500 to-indigo-500"
    }
  ]

  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section with Enhanced Visual Appeal */}
      <section className="relative text-center space-y-6 sm:space-y-8 px-4 py-12 sm:py-16">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary-300 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-primary-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary-200 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-60 right-10 w-1 h-1 bg-primary-500 rounded-full animate-ping delay-700"></div>
        </div>

        <div className="relative">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 shadow-xl">
            <Mountain className="h-10 w-10 sm:h-12 sm:w-12 text-primary-600" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
              Rock Spotter
            </span>
            <div className="inline-block ml-2">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 animate-pulse" />
            </div>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 font-light mb-8">
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent font-medium">
              Discover. Hunt. Learn.
            </span>
            <br />
            Join a community of fellow rock spotters sharing geological adventures and discoveries!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              to="/register"
              className="btn-primary inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <span className="inline-flex items-center justify-center px-8 py-4 text-primary-600 font-semibold text-lg">
              Explore the Feed
            </span>
          </div>
        </div>
      </section>

      {/* Featured Finds Carousel */}
      <section className="px-4">
        <FeaturedFindsCarousel totalUploads={25} />
      </section>

      {/* Features Section */}
      <section className="space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Social Rock Discovery</h2>
          <p className="text-gray-600 text-xl">Connect, share, and explore the geological world together</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg card-hover">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 shadow-lg`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center px-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to Join the Rock Community?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with thousands of geology enthusiasts sharing their passion for Earth's treasures. 
              Start your journey today!
            </p>
            <Link 
              to="/register"
              className="btn-primary inline-flex items-center justify-center px-10 py-5 text-white font-bold rounded-2xl text-xl shadow-2xl"
            >
              Get Started Now
              <Sparkles className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home