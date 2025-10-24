import { useState } from 'react';
import Link from 'next/link';
import {
  Camera,
  Search,
  MapPin,
  DollarSign,
  Leaf,
  Users,
  Globe,
  Phone,
  MessageCircle,
  Plus,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/hero-poster.jpg"
          >
            <source src="/background.mp4" type="video/mp4" />
            {/* Fallback gradient if video fails */}
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            WasteLink AI
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            Africa's Premier Circular Economy Platform
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Transform waste into wealth with AI-powered matching, connecting producers and buyers across Africa for a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/listings"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              List Your Waste
            </Link>
            <Link
              href="/marketplace"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Marketplace
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              🌍 Transforming Africa's Waste Economy
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Revolutionizing Waste Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform connects waste producers with buyers, creating value from what was once considered worthless while building Africa's circular economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Upload photos of your waste and get instant AI analysis with quality grading and market value estimates in seconds.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  94% Accuracy
                </span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Smart Marketplace
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Connect with verified buyers and sellers across Africa through our intelligent matching system.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  2,847 Active Listings
                </span>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Impact Tracking
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Monitor your environmental impact and contribution to Africa's circular economy goals.
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  8.9K CO₂ Saved
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact Across Africa</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Real numbers, real change. See how we're transforming waste into wealth across the continent.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all">
                <Leaf className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <div className="text-4xl font-bold mb-2">12.5K</div>
                <div className="text-green-100 font-medium">Tonnes Diverted</div>
                <div className="text-xs text-green-200 mt-1">+23% this month</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all">
                <DollarSign className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <div className="text-4xl font-bold mb-2">KSh890K</div>
                <div className="text-green-100 font-medium">Revenue Generated</div>
                <div className="text-xs text-green-200 mt-1">+45% this quarter</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all">
                <Users className="w-8 h-8 mx-auto mb-3 text-purple-200" />
                <div className="text-4xl font-bold mb-2">234</div>
                <div className="text-green-100 font-medium">Jobs Created</div>
                <div className="text-xs text-green-200 mt-1">Direct & indirect</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all">
                <Globe className="w-8 h-8 mx-auto mb-3 text-emerald-200" />
                <div className="text-4xl font-bold mb-2">8.9K</div>
                <div className="text-green-100 font-medium">CO₂ Saved (kg)</div>
                <div className="text-xs text-green-200 mt-1">Environmental impact</div>
              </div>
            </div>
          </div>
          
          {/* UN SDG Section */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Contributing to UN Sustainable Development Goals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">8</span>
                </div>
                <div className="text-sm font-medium">Decent Work</div>
                <div className="text-xs text-green-200">234 jobs created</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">11</span>
                </div>
                <div className="text-sm font-medium">Sustainable Cities</div>
                <div className="text-xs text-green-200">12.5K tonnes processed</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">12</span>
                </div>
                <div className="text-sm font-medium">Responsible Consumption</div>
                <div className="text-xs text-green-200">KSh890K circular revenue</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">13</span>
                </div>
                <div className="text-sm font-medium">Climate Action</div>
                <div className="text-xs text-green-200">8.9K kg CO₂ saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Impact Dashboard
            </h2>
            <p className="text-xl text-gray-600">
              Track your contribution to Africa's circular economy
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center">
              <Leaf className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">12.4K</div>
              <div className="text-sm opacity-90">Tonnes Diverted</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl text-center">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">8.9K</div>
              <div className="text-sm opacity-90">CO₂ Saved (kg)</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">$890K</div>
              <div className="text-sm opacity-90">Revenue Generated</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">234</div>
              <div className="text-sm opacity-90">Jobs Created</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">T</span>
              </div>
              <div className="text-2xl font-bold">1247</div>
              <div className="text-sm opacity-90">Transactions</div>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white p-6 rounded-xl text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">W</span>
              </div>
              <div className="text-2xl font-bold">46K</div>
              <div className="text-sm opacity-90">Liters Water Saved</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              UN SDG Contribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">SDG 8</div>
                <div className="text-sm text-gray-700 mt-1">Decent Work</div>
                <div className="text-xs text-gray-600">234 jobs created</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">SDG 11</div>
                <div className="text-sm text-gray-700 mt-1">Sustainable Cities</div>
                <div className="text-xs text-gray-600">12.4K tonnes processed</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">SDG 12</div>
                <div className="text-sm text-gray-700 mt-1">Responsible Consumption</div>
                <div className="text-xs text-gray-600">$890K circular revenue</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-3xl font-bold text-emerald-600">SDG 13</div>
                <div className="text-sm text-gray-700 mt-1">Climate Action</div>
                <div className="text-xs text-gray-600">8.9K kg CO₂ saved</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Success Stories
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-bold text-gray-900">Sheth Naturals Ltd Kenya</h4>
                <p className="text-sm text-gray-600">
                  Sells their leftover plant sheaths to sisal manufacturers.
                </p>
                <div className="text-xs text-yellow-600 mt-1">
                  Revenue: $890K | Jobs: 45 | CO₂ Saved: 320 tonnes
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-gray-900">Kubik Ethiopia</h4>
                <p className="text-sm text-gray-600">
                  Turned 500 tonnes of plastic waste into building blocks, constructing 127 affordable homes.
                </p>
                <div className="text-xs text-green-600 mt-1">
                  Revenue: $890K | Jobs: 45 | CO₂ Saved: 320 tonnes
                </div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-gray-900">Lagos Textile Collective</h4>
                <p className="text-sm text-gray-600">
                  Women's cooperative upcycling textile waste into fashion, earning $45K monthly.
                </p>
                <div className="text-xs text-blue-600 mt-1">
                  Members: 89 women | Avg Income: +180% | Waste Diverted: 12 tonnes/month
                </div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-gray-900">E-Waste Ghana Initiative</h4>
                <p className="text-sm text-gray-600">
                  Formalizing informal e-waste workers, boosting incomes and environmental safety.
                </p>
                <div className="text-xs text-purple-600 mt-1">
                  Workers: 156 | Income Boost: +180% | Safe Processing: 24 tonnes/month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partnering with governments, NGOs, and enterprises to build Africa's circular economy infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg">UN</span>
              </div>
              <h4 className="font-semibold text-gray-900">United Nations</h4>
              <p className="text-sm text-gray-600">SDG Implementation Partner</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">AfDB</span>
              </div>
              <h4 className="font-semibold text-gray-900">African Development Bank</h4>
              <p className="text-sm text-gray-600">Financing Partner</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">UNEP</span>
              </div>
              <h4 className="font-semibold text-gray-900">UN Environment</h4>
              <p className="text-sm text-gray-600">Technical Advisor</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">AU</span>
              </div>
              <h4 className="font-semibold text-gray-900">African Union</h4>
              <p className="text-sm text-gray-600">Policy Partner</p>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Success Stories Across Africa</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-bold text-gray-900 text-lg mb-2">Sheth Naturals Ltd, Kenya</h4>
                <p className="text-gray-600 mb-3">
                  Transformed leftover plant sheaths into valuable raw materials for sisal manufacturers, creating a new revenue stream.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Revenue: KSh890K</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Jobs: 45</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">CO₂ Saved: 320 tonnes</span>
                </div>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-bold text-gray-900 text-lg mb-2">Kubik, Ethiopia</h4>
                <p className="text-gray-600 mb-3">
                  Converted 500 tonnes of plastic waste into building blocks, constructing 127 affordable homes for local communities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Homes Built: 127</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Plastic Recycled: 500T</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Families Housed: 635</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Waste into Wealth?
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of waste producers and buyers building Africa's circular economy.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Start Your Journey Today
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-green-100">+254 700 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-green-100">hello@wastelink.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-green-100">Nairobi, Kenya</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/listings"
                    className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    List Your Waste
                  </Link>
                  <Link
                    href="/marketplace"
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                  >
                    Browse Marketplace
                  </Link>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                  />
                  <textarea
                    rows="3"
                    placeholder="Tell us about your waste or requirements"
                    className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-white text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}