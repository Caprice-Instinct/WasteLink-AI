import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, Search, MapPin, DollarSign, Leaf, Users, TrendingUp, Globe, Phone, MessageCircle, Eye, Plus, Filter, LogOut } from 'lucide-react';

const WasteLinkAI = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [impactData, setImpactData] = useState({});
  const [showAuth, setShowAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // Individual state for each form field
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerCompany, setRegisterCompany] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerCity, setRegisterCity] = useState('');
  const [registerCountry, setRegisterCountry] = useState('');
  const [registerUserType, setRegisterUserType] = useState('producer');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockListings = [
    {
      _id: '1',
      title: "HDPE Plastic Bottles - Grade A",
      category: "plastic",
      quantity: { amount: 2.5, unit: "tonnes" },
      quality: { grade: "A", contamination: 5 },
      location: { city: "Accra", country: "Ghana" },
      pricing: { askingPrice: 1500, currency: "USD", negotiable: true },
      images: [],
      aiAnalysis: { 
        confidence: 0.94,
        estimatedValue: { min: 1250, max: 1800 },
        marketDemand: "High"
      }
    },
    {
      _id: '2',
      title: "Cotton Textile Scraps - Mixed Colors",
      category: "textile",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Lagos", country: "Nigeria" },
      pricing: { askingPrice: 400, currency: "USD", negotiable: true },
      images: [],
      aiAnalysis: { 
        confidence: 0.87,
        estimatedValue: { min: 350, max: 500 },
        marketDemand: "Medium"
      }
    }
  ];

  const mockImpact = {
    totalWasteDiverted: 12450,
    co2Saved: 8930,
    waterSaved: 45600,
    jobsCreated: 234,
    revenue: 890000,
    transactionsCompleted: 1247
  };

  // Event handlers
  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email: loginEmail,
        name: 'Kwame Asante',
        userType: 'buyer'
      };
      
      setUser(mockUser);
      setShowAuth(false);
      setListings(mockListings);
      setImpactData(mockImpact);
      setLoading(false);
    }, 1000);
  }, [loginEmail]);

  const handleRegister = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: '2',
        email: registerEmail,
        name: registerName,
        userType: registerUserType
      };
      
      setUser(mockUser);
      setShowAuth(false);
      setListings(mockListings);
      setImpactData(mockImpact);
      setLoading(false);
    }, 1000);
  }, [registerEmail, registerName, registerUserType]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setShowAuth(true);
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterCompany('');
    setRegisterPhone('');
    setRegisterCity('');
    setRegisterCountry('');
    setRegisterUserType('producer');
  }, []);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    
    setTimeout(() => {
      setScanResult({
        confidence: 0.92,
        category: "plastic",
        materials: ["HDPE", "Polypropylene"],
        grade: "A",
        estimatedQuantity: { amount: 1.2, unit: "tonnes" },
        estimatedValue: { min: 800, max: 1200, currency: "USD" },
        recommendations: [
          "Clean thoroughly before sale",
          "Sort by color for 15% price premium",
          "High demand in construction sector"
        ],
        marketTrends: "HDPE prices up 12% this month",
        potentialBuyers: 8
      });
      setLoading(false);
    }, 2000);
  }, []);

  const makeOffer = useCallback((listingId, message, proposedPrice) => {
    alert('Offer sent successfully! (Demo mode)');
  }, []);

  // Auth Component
  const AuthComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">WasteLink AI</h1>
          <p className="text-gray-600">Africa's Circular Economy Platform</p>
        </div>

        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              authMode === 'login' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            type="button"
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              authMode === 'register' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            type="button"
          >
            Register
          </button>
        </div>

        {authMode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              required
              autoComplete="new-password"
            />
            <input
              type="text"
              placeholder="Company"
              value={registerCompany}
              onChange={(e) => setRegisterCompany(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              autoComplete="organization"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              autoComplete="tel"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City"
                value={registerCity}
                onChange={(e) => setRegisterCity(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                autoComplete="address-level2"
              />
              <input
                type="text"
                placeholder="Country"
                value={registerCountry}
                onChange={(e) => setRegisterCountry(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                autoComplete="country"
              />
            </div>
            <select
              value={registerUserType}
              onChange={(e) => setRegisterUserType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
            >
              <option value="producer">Waste Producer</option>
              <option value="buyer">Waste Buyer</option>
              <option value="both">Both</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const ScanTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Waste Scanner</h2>
        <p className="text-gray-600">Upload or capture waste images for instant AI analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {loading ? (
              <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            ) : (
              <>
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Scan Your Waste</p>
                <p className="text-gray-500 text-sm">Click to upload image for AI analysis</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {scanResult && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">AI Analysis Result</h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(scanResult.confidence * 100)}% Confident
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Material Type</p>
                <p className="text-green-600 capitalize font-bold text-lg">{scanResult.category}</p>
                <p className="text-sm text-gray-600">{scanResult.materials?.join(', ')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{scanResult.grade}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Quantity</p>
                  <p className="text-lg font-semibold">{scanResult.estimatedQuantity.amount} {scanResult.estimatedQuantity.unit}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700">Estimated Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ${scanResult.estimatedValue.min} - ${scanResult.estimatedValue.max}
                </p>
                <p className="text-sm text-gray-600">{scanResult.marketTrends}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-2">AI Recommendations</p>
                <div className="space-y-1">
                  {scanResult.recommendations?.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('marketplace')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                View Matches ({scanResult.potentialBuyers} Potential Buyers)
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">15,240</div>
          <div className="text-sm text-gray-600">Items Scanned Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">94%</div>
          <div className="text-sm text-gray-600">AI Accuracy</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-purple-600">$2.4M</div>
          <div className="text-sm text-gray-600">Value Identified</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-orange-600">847</div>
          <div className="text-sm text-gray-600">Active Matches</div>
        </div>
      </div>
    </div>
  );

  const MarketplaceTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Circular Marketplace</h2>
          <p className="text-gray-600">Live waste-to-resource trading across Africa</p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search materials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none text-sm flex-1 min-w-0 focus:ring-0"
              autoComplete="off"
            />
          </div>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm opacity-90">Active Listings</div>
          </div>
          <div>
            <div className="text-2xl font-bold">$4.2M</div>
            <div className="text-sm opacity-90">Daily Volume</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm opacity-90">Transactions Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold">23%↑</div>
            <div className="text-sm opacity-90">HDPE Demand</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Grade {listing.quality?.grade || 'B'}
              </div>
              {listing.aiAnalysis?.confidence && (
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                  {Math.round(listing.aiAnalysis.confidence * 100)}% AI Match
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{listing.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{listing.quantity.amount} {listing.quantity.unit}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {listing.location?.city || 'Unknown'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    ${listing.pricing?.askingPrice?.toLocaleString() || '0'}
                  </div>
                  {listing.aiAnalysis?.estimatedValue && (
                    <div className="text-xs text-gray-500">
                      AI Est: ${listing.aiAnalysis.estimatedValue.min}-${listing.aiAnalysis.estimatedValue.max}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    listing.aiAnalysis?.marketDemand === 'High' ? 'text-green-600' : 
                    listing.aiAnalysis?.marketDemand === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {listing.aiAnalysis?.marketDemand || 'Medium'} Demand
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    const price = prompt('Enter your offer amount:');
                    const message = prompt('Add a message (optional):');
                    if (price) makeOffer(listing._id, message, parseFloat(price));
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Make Offer
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-500">Start by scanning some waste materials!</p>
        </div>
      )}
    </div>
  );

  const ImpactTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Impact Dashboard</h2>
        <p className="text-gray-600">Track your contribution to Africa's circular economy</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center">
          <Leaf className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{((impactData.totalWasteDiverted || 0) / 1000).toFixed(1)}K</div>
          <div className="text-sm opacity-90">Tonnes Diverted</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl text-center">
          <Globe className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{((impactData.co2Saved || 0) / 1000).toFixed(1)}K</div>
          <div className="text-sm opacity-90">CO₂ Saved (kg)</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl text-center">
          <DollarSign className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">${((impactData.revenue || 0) / 1000).toFixed(0)}K</div>
          <div className="text-sm opacity-90">Revenue Generated</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl text-center">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{impactData.jobsCreated || 0}</div>
          <div className="text-sm opacity-90">Jobs Created</div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{impactData.transactionsCompleted || 0}</div>
          <div className="text-sm opacity-90">Transactions</div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white p-6 rounded-xl text-center">
          <Phone className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{((impactData.waterSaved || 0) / 1000).toFixed(0)}K</div>
          <div className="text-sm opacity-90">Liters Water Saved</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">UN SDG Contribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">SDG 8</div>
            <div className="text-sm text-gray-700 mt-1">Decent Work</div>
            <div className="text-xs text-gray-600">{impactData.jobsCreated || 0} jobs created</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">SDG 11</div>
            <div className="text-sm text-gray-700 mt-1">Sustainable Cities</div>
            <div className="text-xs text-gray-600">{((impactData.totalWasteDiverted || 0)/1000).toFixed(1)}K tonnes processed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">SDG 12</div>
            <div className="text-sm text-gray-700 mt-1">Responsible Consumption</div>
            <div className="text-xs text-gray-600">${((impactData.revenue || 0)/1000).toFixed(0)}K circular revenue</div>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-3xl font-bold text-emerald-600">SDG 13</div>
            <div className="text-sm text-gray-700 mt-1">Climate Action</div>
            <div className="text-xs text-gray-600">{((impactData.co2Saved || 0)/1000).toFixed(1)}K kg CO₂ saved</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Success Stories</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold text-gray-900">Kubik Ethiopia</h4>
            <p className="text-sm text-gray-600">Turned 500 tonnes of plastic waste into building blocks, constructing 127 affordable homes.</p>
            <div className="text-xs text-green-600 mt-1">Revenue: $890K | Jobs: 45 | CO₂ Saved: 320 tonnes</div>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">Lagos Textile Collective</h4>
            <p className="text-sm text-gray-600">Women's cooperative upcycling textile waste into fashion, earning $45K monthly.</p>
            <div className="text-xs text-blue-600 mt-1">Members: 89 women | Avg Income: +180% | Waste Diverted: 12 tonnes/month</div>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-bold text-gray-900">E-Waste Ghana Initiative</h4>
            <p className="text-sm text-gray-600">Formalizing informal e-waste workers, boosting incomes and environmental safety.</p>
            <div className="text-xs text-purple-600 mt-1">Workers: 156 | Income Boost: +180% | Safe Processing: 24 tonnes/month</div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (!showAuth) {
      setListings(mockListings);
      setImpactData(mockImpact);
    }
  }, [showAuth]);

  if (showAuth) {
    return <AuthComponent />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WasteLink AI</h1>
                <p className="text-xs text-gray-500">Africa's Circular Economy Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-gray-500">{user?.userType || 'Producer'}</div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'scan', label: 'AI Scanner', icon: Camera },
              { id: 'marketplace', label: 'Marketplace', icon: Search },
              { id: 'impact', label: 'Impact', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                type="button"
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'scan' && <ScanTab />}
        {activeTab === 'marketplace' && <MarketplaceTab />}
        {activeTab === 'impact' && <ImpactTab />}
      </main>

      <div className="fixed bottom-6 right-6 space-y-3">
        <button 
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          type="button"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <button 
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          type="button"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed bottom-6 left-6 bg-yellow-100 border border-yellow-300 rounded-lg p-3 max-w-xs hidden md:block">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-yellow-600" />
          <div className="text-sm">
            <div className="font-medium text-yellow-800">SMS Listing Available</div>
            <div className="text-yellow-700">Text: WASTE [TYPE] [AMOUNT] [CITY]</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteLinkAI;