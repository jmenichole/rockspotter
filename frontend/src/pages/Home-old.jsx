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

  const stats = [
    { icon: <Users className="h-6 w-6" />, label: "Active Collectors", value: "2,500+" },
    { icon: <Camera className="h-6 w-6" />, label: "Rocks Shared", value: "15,000+" },
    { icon: <Globe className="h-6 w-6" />, label: "Countries", value: "50+" },
    { icon: <Star className="h-6 w-6" />, label: "Discoveries", value: "Daily" }
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
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 font-light">
            The premier social platform where rock enthusiasts share discoveries, connect with fellow geologists, 
            and build a thriving community around the fascinating world of rocks and minerals!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 card-hover">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-3">
                  <div className="text-primary-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link 
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Join the Community
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            to="/feed"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
          >
            Explore Feed
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Social Rock Discovery</h2>
          <p className="text-gray-600 text-lg">Connect, share, and explore the geological world together</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">Get started in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">1</div>
            <h3 className="text-xl font-semibold">Join & Connect</h3>
            <p className="text-gray-600">Create your profile and start following fellow rock enthusiasts in your area</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">2</div>
            <h3 className="text-xl font-semibold">Share & Discover</h3>
            <p className="text-gray-600">Post photos of your finds, engage with community posts, and discover amazing geology</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">3</div>
            <h3 className="text-xl font-semibold">Learn & Explore</h3>
            <p className="text-gray-600">Join discussions, participate in hunts, and expand your geological knowledge</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join the Rock Community?</h2>
        <p className="text-gray-600 mb-6">Connect with thousands of geology enthusiasts sharing their passion for rocks</p>
        <Link 
          to="/register"
          className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          Start Sharing Today
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

export default Home