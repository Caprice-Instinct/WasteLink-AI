import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  Search,
  MapPin,
  DollarSign,
  Leaf,
  Users,
  TrendingUp,
  Globe,
  Phone,
  MessageCircle,
  Eye,
  Plus,
  Filter,
  LogOut,
  CreditCard,
  X,
  ShoppingCart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  Star,
} from "lucide-react";

const WasteLinkAI = () => {
  const [activeTab, setActiveTab] = useState("landing");
  const [user, setUser] = useState({
    id: "1",
    email: "wanyoike.njuguna@wastelink.ai",
    name: "Wanyoike Njuguna",
    userType: "Producer",
  });
  const [listings, setListings] = useState([]);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [impactData, setImpactData] = useState({});
  const fileInputRef = useRef(null);

  // Form state
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [wasteQuantity, setWasteQuantity] = useState("");
  const [wasteUnit, setWasteUnit] = useState("kg");
  const [wasteDescription, setWasteDescription] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [myListingsSearch, setMyListingsSearch] = useState("");
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState("all");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  
  // Payment processing state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ phone: "" });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Product detail state
  const [viewingProduct, setViewingProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cart, setCart] = useState([]);

  // Mock data
  const mockListings = [
    {
      _id: "1",
      title: "HDPE Plastic Bottles - Grade A",
      category: "plastic",
      quantity: { amount: 2.5, unit: "tonnes" },
      quality: { grade: "A", contamination: 5 },
      location: { city: "Accra", country: "Ghana" },
      pricing: { askingPrice: 195000, currency: "KES", negotiable: true },
      images: ["/HDPE_Plastic_Bottles.jpg"],
      aiAnalysis: {
        confidence: 0.94,
        estimatedValue: { min: 1250, max: 1800 },
        marketDemand: "High",
      },
    },
    {
      _id: "2",
      title: "Cotton Textile Scraps - Mixed Colors",
      category: "textile",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Lagos", country: "Nigeria" },
      pricing: { askingPrice: 52000, currency: "KES", negotiable: true },
      images: ["/Textile_Scraps.jpg"],
      aiAnalysis: {
        confidence: 0.87,
        estimatedValue: { min: 350, max: 500 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "3",
      title: "E-Waste Components - Mixed Electronics",
      category: "electronics",
      quantity: { amount: 150, unit: "kg" },
      quality: { grade: "C", contamination: 25 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 26000, currency: "KES", negotiable: true },
      images: ["/E.png"],
      aiAnalysis: {
        confidence: 0.78,
        estimatedValue: { min: 180, max: 250 },
        marketDemand: "Low",
      },
    },
    {
      _id: "4",
      title: "Cardboard Boxes - Clean & Flat",
      category: "paper",
      quantity: { amount: 1.2, unit: "tonnes" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Cape Town", country: "South Africa" },
      pricing: { askingPrice: 39000, currency: "KES", negotiable: false },
      images: ["/cardbox.png"],
      aiAnalysis: {
        confidence: 0.96,
        estimatedValue: { min: 280, max: 350 },
        marketDemand: "High",
      },
    },
    {
      _id: "5",
      title: "Plastic Water Bottles - PET",
      category: "plastic",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "A", contamination: 3 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 78000, currency: "KES", negotiable: true },
      images: ["/PET.png"],
      aiAnalysis: {
        confidence: 0.92,
        estimatedValue: { min: 550, max: 650 },
        marketDemand: "High",
      },
    },
    {
      _id: "6",
      title: "Aluminum Scrap - Clean",
      category: "metal",
      quantity: { amount: 1.5, unit: "tonnes" },
      quality: { grade: "A", contamination: 1 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 286000, currency: "KES", negotiable: false },
      images: ["/aluminiums.png"],
      aiAnalysis: {
        confidence: 0.98,
        estimatedValue: { min: 2100, max: 2300 },
        marketDemand: "High",
      },
    },
    {
      _id: "7",
      title: "Glass Bottles - Mixed",
      category: "glass",
      quantity: { amount: 500, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 19500, currency: "KES", negotiable: true },
      images: ["/glassbottles.png", "/glassbottles.png", "/glassbottles.png", "/glassbottles.png"],
      description: "High-quality mixed glass bottles suitable for recycling. Clean and sorted by color. Perfect for glass manufacturing companies.",
      seller: {
        name: "John Kamau",
        rating: 4.8,
        totalSales: 156,
        location: "Thika, Kenya",
        joinedDate: "2023-05-15"
      },
      aiAnalysis: {
        confidence: 0.85,
        estimatedValue: { min: 120, max: 180 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "8",
      title: "Copper Wire Scrap",
      category: "metal",
      quantity: { amount: 200, unit: "kg" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 234000, currency: "KES", negotiable: true },
      images: ["/copper.png"],
      aiAnalysis: {
        confidence: 0.96,
        estimatedValue: { min: 1700, max: 1900 },
        marketDemand: "High",
      },
    },
    {
      _id: "9",
      title: "Paper Waste - Office",
      category: "paper",
      quantity: { amount: 300, unit: "kg" },
      quality: { grade: "B", contamination: 8 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 11700, currency: "KES", negotiable: false },
      images: ["/paperwaste.png"],
      aiAnalysis: {
        confidence: 0.88,
        estimatedValue: { min: 80, max: 100 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "10",
      title: "Steel Cans - Food Grade",
      category: "metal",
      quantity: { amount: 400, unit: "kg" },
      quality: { grade: "A", contamination: 5 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 41600, currency: "KES", negotiable: true },
      images: ["/steelcans.png"],
      aiAnalysis: {
        confidence: 0.91,
        estimatedValue: { min: 300, max: 350 },
        marketDemand: "High",
      },
    },
    {
      _id: "11",
      title: "Plastic Bags - LDPE",
      category: "plastic",
      quantity: { amount: 600, unit: "kg" },
      quality: { grade: "C", contamination: 20 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 23400, currency: "KES", negotiable: true },
      images: ["/plasticbags.png"],
      aiAnalysis: {
        confidence: 0.75,
        estimatedValue: { min: 150, max: 200 },
        marketDemand: "Low",
      },
    },
    {
      _id: "12",
      title: "Electronic Components",
      category: "electronics",
      quantity: { amount: 100, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 58500, currency: "KES", negotiable: false },
      images: ["/E.png"],
      aiAnalysis: {
        confidence: 0.82,
        estimatedValue: { min: 400, max: 500 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "13",
      title: "Cardboard Packaging",
      category: "paper",
      quantity: { amount: 2.1, unit: "tonnes" },
      quality: { grade: "A", contamination: 3 },
      location: { city: "Kisumu", country: "Kenya" },
      pricing: { askingPrice: 54600, currency: "KES", negotiable: true },
      images: ["/cardbox.png"],
      aiAnalysis: {
        confidence: 0.94,
        estimatedValue: { min: 400, max: 450 },
        marketDemand: "High",
      },
    },
    {
      _id: "14",
      title: "Textile Fabric Scraps",
      category: "textile",
      quantity: { amount: 250, unit: "kg" },
      quality: { grade: "B", contamination: 12 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 16250, currency: "KES", negotiable: true },
      images: ["/Textile_Scraps.jpg"],
      aiAnalysis: {
        confidence: 0.86,
        estimatedValue: { min: 100, max: 150 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "15",
      title: "Plastic Containers - PP",
      category: "plastic",
      quantity: { amount: 350, unit: "kg" },
      quality: { grade: "A", contamination: 4 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 36400, currency: "KES", negotiable: false },
      images: ["/container.png"],
      aiAnalysis: {
        confidence: 0.93,
        estimatedValue: { min: 260, max: 300 },
        marketDemand: "High",
      },
    },
    {
      _id: "16",
      title: "Iron Scrap - Mixed",
      category: "metal",
      quantity: { amount: 800, unit: "kg" },
      quality: { grade: "B", contamination: 18 },
      location: { city: "Nairobi", country: "Kenya" },
      pricing: { askingPrice: 31200, currency: "KES", negotiable: true },
      images: ["/iron.png"],
      aiAnalysis: {
        confidence: 0.79,
        estimatedValue: { min: 200, max: 280 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "17",
      title: "Newspaper Bundles",
      category: "paper",
      quantity: { amount: 150, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Mombasa", country: "Kenya" },
      pricing: { askingPrice: 5850, currency: "KES", negotiable: true },
      images: ["/newspaper.png"],
      aiAnalysis: {
        confidence: 0.87,
        estimatedValue: { min: 40, max: 50 },
        marketDemand: "Low",
      },
    },
    {
      _id: "18",
      title: "Plastic Film Rolls",
      category: "plastic",
      quantity: { amount: 450, unit: "kg" },
      quality: { grade: "B", contamination: 15 },
      location: { city: "Kisumu", country: "Kenya" },
      pricing: { askingPrice: 29250, currency: "KES", negotiable: false },
      images: ["/wrap.png"],
      aiAnalysis: {
        confidence: 0.84,
        estimatedValue: { min: 200, max: 250 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "19",
      title: "Brass Fittings",
      category: "metal",
      quantity: { amount: 75, unit: "kg" },
      quality: { grade: "A", contamination: 2 },
      location: { city: "Eldoret", country: "Kenya" },
      pricing: { askingPrice: 58500, currency: "KES", negotiable: true },
      images: ["/brass.png"],
      aiAnalysis: {
        confidence: 0.95,
        estimatedValue: { min: 420, max: 480 },
        marketDemand: "High",
      },
    },
    {
      _id: "20",
      title: "Cotton Rags",
      category: "textile",
      quantity: { amount: 180, unit: "kg" },
      quality: { grade: "C", contamination: 25 },
      location: { city: "Nakuru", country: "Kenya" },
      pricing: { askingPrice: 7020, currency: "KES", negotiable: true },
      images: ["/cottonrag.png"],
      aiAnalysis: {
        confidence: 0.72,
        estimatedValue: { min: 45, max: 65 },
        marketDemand: "Low",
      },
    },
  ];

  const myListingsData = [
    {
      _id: "ml1",
      title: "Aluminum Cans - Food Grade",
      category: "metal",
      quantity: { amount: 500, unit: "kg" },
      status: "active",
      dateCreated: "2024-01-15",
      views: 45,
      offers: 3,
      pricing: { askingPrice: 104000, currency: "KES" },
      client: null,
    },
    {
      _id: "ml2",
      title: "Glass Bottles - Mixed Colors",
      category: "glass",
      quantity: { amount: 200, unit: "kg" },
      status: "sold",
      dateCreated: "2024-01-10",
      soldPrice: 19500,
      soldDate: "2024-01-18",
      pricing: { askingPrice: 23400, currency: "KES" },
      client: "EcoGlass Kenya Ltd",
    },
    {
      _id: "ml3",
      title: "HDPE Plastic Containers",
      category: "plastic",
      quantity: { amount: 300, unit: "kg" },
      status: "payment_pending",
      dateCreated: "2024-01-20",
      views: 28,
      offers: 1,
      pricing: { askingPrice: 39000, currency: "KES" },
      client: "Plastix Recyclers",
    },
    {
      _id: "ml4",
      title: "Cardboard Boxes - Clean",
      category: "paper",
      quantity: { amount: 1.2, unit: "tonnes" },
      status: "sold",
      dateCreated: "2024-01-05",
      soldPrice: 31200,
      soldDate: "2024-01-12",
      pricing: { askingPrice: 35000, currency: "KES" },
      client: "Paper Mills East Africa",
    },
    {
      _id: "ml5",
      title: "Electronic Components - Mixed",
      category: "electronics",
      quantity: { amount: 80, unit: "kg" },
      status: "active",
      dateCreated: "2024-01-22",
      views: 67,
      offers: 5,
      pricing: { askingPrice: 52000, currency: "KES" },
      client: null,
    },
    {
      _id: "ml6",
      title: "Copper Wire Scrap",
      category: "metal",
      quantity: { amount: 150, unit: "kg" },
      status: "payment_pending",
      dateCreated: "2024-01-18",
      views: 89,
      offers: 7,
      pricing: { askingPrice: 175500, currency: "KES" },
      client: "MetalCorp Industries",
    },
    {
      _id: "ml7",
      title: "Textile Fabric Scraps - Cotton",
      category: "textile",
      quantity: { amount: 250, unit: "kg" },
      status: "expired",
      dateCreated: "2023-12-15",
      views: 23,
      offers: 0,
      pricing: { askingPrice: 16250, currency: "KES" },
      client: null,
    },
  ];

  const mockImpact = {
    totalWasteDiverted: 12450,
    co2Saved: 8930,
    waterSaved: 45600,
    jobsCreated: 234,
    revenue: 890000,
    transactionsCompleted: 1247,
  };

  // Event handlers

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAnalyzeWaste = useCallback(() => {
    if (!wasteQuantity) {
      alert("Please enter the waste quantity");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setScanResult({
        confidence: 0.92,
        category: "plastic",
        materials: ["HDPE", "Polypropylene"],
        grade: "A",
        estimatedValue: { min: 800, max: 1200, currency: "GHS" },
        recommendations: [
          "Clean thoroughly before sale",
          "Sort by color for 15% price premium",
          "High demand in construction sector",
        ],
        marketTrends: "HDPE prices up 12% this month",
        potentialBuyers: 8,
      });
      setLoading(false);
    }, 2000);
  }, [wasteQuantity]);

  const makeOffer = useCallback((listingId, message, proposedPrice) => {
    alert("Offer sent successfully! (Demo mode)");
  }, []);

  const handlePurchase = useCallback((listing) => {
    setSelectedListing(listing);
    setShowPaymentModal(true);
  }, []);

  const handleViewProduct = useCallback((listing) => {
    setViewingProduct(listing);
    setCurrentImageIndex(0);
  }, []);

  const addToCart = useCallback((listing) => {
    setCart(prev => [...prev, listing]);
    alert("Added to cart!");
  }, []);

  const nextImage = () => {
    if (viewingProduct?.images) {
      setCurrentImageIndex((prev) => 
        prev === viewingProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (viewingProduct?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? viewingProduct.images.length - 1 : prev - 1
      );
    }
  };

  const handlePayment = async () => {
    if (!paymentForm.phone) {
      alert("Please enter your phone number");
      return;
    }

    setPaymentLoading(true);
    
    // Simulate payment processing for 6 seconds
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentSuccess(true);
    }, 6000);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(false);
    setShowPaymentModal(false);
    setSelectedListing(null);
    setPaymentForm({ phone: "" });
    alert(`Successfully purchased ${selectedListing?.title}! Transaction completed.`);
  };

  const handleWasteDescriptionChange = useCallback((e) => {
    setWasteDescription(e.target.value);
  }, []);

  const handleWasteQuantityChange = useCallback((e) => {
    setWasteQuantity(e.target.value);
  }, []);

  const handleWasteUnitChange = useCallback((e) => {
    setWasteUnit(e.target.value);
  }, []);

  const presetQuestions = [
    "How do I price my waste materials?",
    "What types of waste have highest demand?",
    "How does the AI scanner work?",
    "How to improve waste quality grade?"
  ];

  const handleChatSubmit = useCallback((message) => {
    const responses = {
      "How do I price my waste materials?": "Pricing depends on material type, quality grade, and market demand. Our AI provides estimated values based on current market rates. Clean, sorted materials typically get 15-30% higher prices.",
      "What types of waste have highest demand?": "Currently, HDPE plastics, aluminum, and clean cardboard have the highest demand. Electronic waste and copper also show strong market interest.",
      "How does the AI scanner work?": "Upload a photo of your waste, enter quantity details, and our AI analyzes material type, quality grade, and provides market value estimates with 94% accuracy.",
      "How to improve waste quality grade?": "Clean materials thoroughly, sort by type/color, remove contamination, and ensure proper storage. Grade A materials can be worth 2-3x more than Grade C."
    };
    
    const userMessage = { type: 'user', text: message };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let fullResponse = responses[message];
      let hasButton = false;
      
      // Check for marketplace search requests
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('glass') && (lowerMessage.includes('near') || lowerMessage.includes('looking'))) {
        fullResponse = "I found 1 glass bottle listing near you! There's a supplier in Thika, Kenya offering 'Glass Bottles - Mixed' (500 kg, Grade B) for KSh 19,500. The listing has medium market demand and is negotiable. Click below to view it in the marketplace.";
        hasButton = { text: "View Glass Bottles", action: () => { setActiveTab('marketplace'); setSearchQuery('glass'); setShowChatbot(false); } };
      } else if (!fullResponse) {
        fullResponse = "I can help with waste trading, pricing, and platform features. Try asking about pricing, demand, or how our AI scanner works!";
      }
      
      let currentText = "";
      let index = 0;
      let sentenceCount = 0;
      const typingInterval = setInterval(() => {
        if (index < fullResponse.length) {
          currentText += fullResponse[index];
          if (fullResponse[index] === '.' || fullResponse[index] === '!' || fullResponse[index] === '?') {
            sentenceCount++;
          }
          setTypingText(currentText);
          index++;
          
          // After 3 sentences, show the rest immediately
          if (sentenceCount >= 3) {
            clearInterval(typingInterval);
            setChatMessages(prev => [...prev, { type: 'bot', text: fullResponse, button: hasButton }]);
            setTypingText("");
          }
        } else {
          clearInterval(typingInterval);
          setChatMessages(prev => [...prev, { type: 'bot', text: fullResponse, button: hasButton }]);
          setTypingText("");
        }
      }, 20);
    }, 2000);
  }, []);

  // Landing Page Component
  const LandingPage = () => (
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
            <source src="/hero-video.mp4" type="video/mp4" />
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
            <button
              onClick={() => setActiveTab("mylistings")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              List Your Waste
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Marketplace
            </button>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Waste Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform connects waste producers with buyers, creating value from what was once considered worthless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600">
                Upload photos of your waste and get instant AI analysis with quality grading and market value estimates.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Smart Marketplace
              </h3>
              <p className="text-gray-600">
                Connect with verified buyers and sellers across Africa through our intelligent matching system.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Impact Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your environmental impact and contribution to Africa's circular economy goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12.5K</div>
              <div className="text-green-100">Tonnes Diverted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">KSh890K</div>
              <div className="text-green-100">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">234</div>
              <div className="text-green-100">Jobs Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8.9K</div>
              <div className="text-green-100">CO₂ Saved (kg)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to join Africa's circular economy revolution?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">+254 700 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">hello@wastelink.ai</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // ScanTab component - now has access to all state variables
  const ScanTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI Waste Scanner
        </h2>
        <p className="text-gray-600">
          Upload or capture waste images for instant AI analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {loading ? (
              <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            ) : uploadedImage ? (
              <div className="space-y-3">
                <img
                  src={uploadedImage}
                  alt="Uploaded waste"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-green-600 font-medium">
                  Image uploaded successfully!
                </p>
                <p className="text-xs text-gray-500">
                  Click to upload a different image
                </p>
              </div>
            ) : (
              <>
                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Scan Your Waste
                </p>
                <p className="text-gray-500 text-sm">
                  Click to upload image for AI analysis
                </p>
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

          {/* Waste Details Form */}
          {uploadedImage && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Waste Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Plastic bottles, clean condition"
                  value={wasteDescription}
                  onChange={handleWasteDescriptionChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={wasteQuantity}
                    onChange={handleWasteQuantityChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={wasteUnit}
                    onChange={handleWasteUnitChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                    <option value="pieces">pieces</option>
                    <option value="cubic_meters">m³</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAnalyzeWaste}
                disabled={loading || !wasteQuantity}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing..." : "Analyze Waste"}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {scanResult && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                AI Analysis Result
              </h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(scanResult.confidence * 100)}% Confident
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700">Material Type</p>
                <p className="text-green-600 capitalize font-bold text-lg">
                  {scanResult.category}
                </p>
                <p className="text-sm text-gray-600">
                  {scanResult.materials?.join(", ")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700">Grade</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {scanResult.grade}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Quantity</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {wasteQuantity} {wasteUnit}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-700">Estimated Value</p>
                <p className="text-2xl font-bold text-green-600">
                  KSh{scanResult.estimatedValue.min} - KSh
                  {scanResult.estimatedValue.max}
                </p>
                <p className="text-sm text-gray-600">
                  {scanResult.marketTrends}
                </p>
              </div>

              {wasteDescription && (
                <div>
                  <p className="font-medium text-gray-700">Your Description</p>
                  <p className="text-sm text-gray-600 bg-white p-2 rounded">
                    {wasteDescription}
                  </p>
                </div>
              )}

              <div>
                <p className="font-medium text-gray-700 mb-2">
                  AI Recommendations
                </p>
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
                onClick={() => setActiveTab("mylistings")}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Create Listing ({scanResult.potentialBuyers} Potential Buyers)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Circular Marketplace
          </h2>
          <p className="text-gray-600">
            Live waste-to-resource trading across Africa
          </p>
        </div>

        <div className="flex space-x-3 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none text-sm flex-1 min-w-0"
            />
          </div>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white px-4 py-2 rounded-lg border text-sm"
          >
            <option value="all">All Locations</option>
            <option value="Ghana">Ghana</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
          </select>
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
        {listings
          .filter(
            (listing) =>
              locationFilter === "all" ||
              listing.location?.country === locationFilter
          )
          .filter(
            (listing) =>
              searchQuery === "" ||
              listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              listing.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((listing) => (
            <div
              key={listing._id}
              className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                {listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.log("Image failed to load:", listing.images[0]);
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-48 bg-gray-200 flex items-center justify-center"
                  style={{
                    display:
                      listing.images && listing.images.length > 0
                        ? "none"
                        : "flex",
                  }}
                >
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Grade {listing.quality?.grade || "B"}
                </div>
                {listing.aiAnalysis?.confidence && (
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                    {Math.round(listing.aiAnalysis.confidence * 100)}% AI Match
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  {listing.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">
                      {listing.quantity.amount} {listing.quantity.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {listing.location?.city || "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      KSh{listing.pricing?.askingPrice?.toLocaleString() || "0"}
                    </div>
                    {listing.aiAnalysis?.estimatedValue && (
                      <div className="text-xs text-gray-500">
                        AI Est: ${listing.aiAnalysis.estimatedValue.min}-$
                        {listing.aiAnalysis.estimatedValue.max}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${
                        listing.aiAnalysis?.marketDemand === "High"
                          ? "text-green-600"
                          : listing.aiAnalysis?.marketDemand === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {listing.aiAnalysis?.marketDemand || "Medium"} Demand
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewProduct(listing)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      const price = prompt("Enter your offer amount:");
                      const message = prompt("Add a message (optional):");
                      if (price)
                        makeOffer(listing._id, message, parseFloat(price));
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No listings found
          </h3>
          <p className="text-gray-500">
            Start by scanning some waste materials!
          </p>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedListing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Purchase of "{selectedListing.title}" completed successfully!
                </p>
                <button onClick={handlePaymentSuccess} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Continue to Dashboard
                </button>
              </div>
            ) : !paymentLoading ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Purchase Details</h2>
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Selected Item</p>
                  <p className="font-semibold">{selectedListing.title}</p>
                  <p className="text-sm text-gray-600">
                    {selectedListing.quantity.amount} {selectedListing.quantity.unit}
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-2">
                    KSh {selectedListing.pricing?.askingPrice?.toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (M-Pesa)
                    </label>
                    <input
                      type="tel"
                      placeholder="+254712345678"
                      value={paymentForm.phone}
                      onChange={(e) => setPaymentForm({ phone: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handlePayment}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay Now
                  </button>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
                <p className="text-sm text-gray-600">
                  Please enter your M-Pesa PIN when prompted...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const ImpactTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Impact Dashboard
        </h2>
        <p className="text-gray-600">
          Track your contribution to Africa's circular economy
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center">
          <Leaf className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {((impactData.totalWasteDiverted || 0) / 1000).toFixed(1)}K
          </div>
          <div className="text-sm opacity-90">Tonnes Diverted</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl text-center">
          <Globe className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {((impactData.co2Saved || 0) / 1000).toFixed(1)}K
          </div>
          <div className="text-sm opacity-90">CO₂ Saved (kg)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl text-center">
          <DollarSign className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            ${((impactData.revenue || 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-sm opacity-90">Revenue Generated</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl text-center">
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {impactData.jobsCreated || 0}
          </div>
          <div className="text-sm opacity-90">Jobs Created</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {impactData.transactionsCompleted || 0}
          </div>
          <div className="text-sm opacity-90">Transactions</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-green-600 text-white p-6 rounded-xl text-center">
          <Phone className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">
            {((impactData.waterSaved || 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-sm opacity-90">Liters Water Saved</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          UN SDG Contribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">SDG 8</div>
            <div className="text-sm text-gray-700 mt-1">Decent Work</div>
            <div className="text-xs text-gray-600">
              {impactData.jobsCreated || 0} jobs created
            </div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">SDG 11</div>
            <div className="text-sm text-gray-700 mt-1">Sustainable Cities</div>
            <div className="text-xs text-gray-600">
              {((impactData.totalWasteDiverted || 0) / 1000).toFixed(1)}K tonnes
              processed
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">SDG 12</div>
            <div className="text-sm text-gray-700 mt-1">
              Responsible Consumption
            </div>
            <div className="text-xs text-gray-600">
              ${((impactData.revenue || 0) / 1000).toFixed(0)}K circular revenue
            </div>
          </div>
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-3xl font-bold text-emerald-600">SDG 13</div>
            <div className="text-sm text-gray-700 mt-1">Climate Action</div>
            <div className="text-xs text-gray-600">
              {((impactData.co2Saved || 0) / 1000).toFixed(1)}K kg CO₂ saved
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Success Stories
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-bold text-gray-900">
              Sheth Naturals Ltd Kenya
            </h4>
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
              Turned 500 tonnes of plastic waste into building blocks,
              constructing 127 affordable homes.
            </p>
            <div className="text-xs text-green-600 mt-1">
              Revenue: $890K | Jobs: 45 | CO₂ Saved: 320 tonnes
            </div>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold text-gray-900">
              Lagos Textile Collective
            </h4>
            <p className="text-sm text-gray-600">
              Women's cooperative upcycling textile waste into fashion, earning
              $45K monthly.
            </p>
            <div className="text-xs text-blue-600 mt-1">
              Members: 89 women | Avg Income: +180% | Waste Diverted: 12
              tonnes/month
            </div>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-bold text-gray-900">
              E-Waste Ghana Initiative
            </h4>
            <p className="text-sm text-gray-600">
              Formalizing informal e-waste workers, boosting incomes and
              environmental safety.
            </p>
            <div className="text-xs text-purple-600 mt-1">
              Workers: 156 | Income Boost: +180% | Safe Processing: 24
              tonnes/month
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductDetailView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setViewingProduct(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={viewingProduct.images[currentImageIndex]}
              alt={viewingProduct.title}
              className="w-full h-96 object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex space-x-2">
            {viewingProduct.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded border-2 overflow-hidden ${
                  index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={viewingProduct.images[index]}
                  alt={`${viewingProduct.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{viewingProduct.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                Grade {viewingProduct.quality.grade}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{viewingProduct.quantity.amount} {viewingProduct.quantity.unit}</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-green-600">
            KSh {viewingProduct.pricing.askingPrice.toLocaleString()}
            {viewingProduct.pricing.negotiable && (
              <span className="text-sm text-gray-500 font-normal ml-2">(Negotiable)</span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{viewingProduct.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                {viewingProduct.location.city}, {viewingProduct.location.country}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Contamination:</span>
                  <span className="ml-2 font-medium">{viewingProduct.quality.contamination}%</span>
                </div>
                <div>
                  <span className="text-gray-500">AI Confidence:</span>
                  <span className="ml-2 font-medium">{Math.round(viewingProduct.aiAnalysis.confidence * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <div className="font-medium">{viewingProduct.seller.name}</div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {viewingProduct.seller.rating} • {viewingProduct.seller.totalSales} sales
                </div>
                <div className="text-sm text-gray-500">
                  Member since {new Date(viewingProduct.seller.joinedDate).getFullYear()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(viewingProduct)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handlePurchase(viewingProduct)}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const MyListingsTab = () => {
    const filteredListings = myListingsData.filter((listing) => {
      const matchesSearch = myListingsSearch === "" || 
        listing.title.toLowerCase().includes(myListingsSearch.toLowerCase()) ||
        listing.category.toLowerCase().includes(myListingsSearch.toLowerCase()) ||
        (listing.client && listing.client.toLowerCase().includes(myListingsSearch.toLowerCase()));
      
      const matchesStatus = myListingsStatusFilter === "all" || listing.status === myListingsStatusFilter;
      
      return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
      switch (status) {
        case "active": return "bg-green-100 text-green-800";
        case "sold": return "bg-blue-100 text-blue-800";
        case "payment_pending": return "bg-yellow-100 text-yellow-800";
        case "expired": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
      }
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case "active": return "Active";
        case "sold": return "Sold";
        case "payment_pending": return "Payment Pending";
        case "expired": return "Expired";
        default: return status;
      }
    };

    const activeCount = myListingsData.filter(l => l.status === "active").length;
    const totalRevenue = myListingsData.filter(l => l.status === "sold").reduce((sum, l) => sum + (l.soldPrice || 0), 0);
    const totalViews = myListingsData.reduce((sum, l) => sum + (l.views || 0), 0);

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Listings</h2>
            <p className="text-gray-600">Manage your waste listings and sales</p>
          </div>
          <button
            onClick={() => setActiveTab("scan")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, material, or client..."
                  value={myListingsSearch}
                  onChange={(e) => setMyListingsSearch(e.target.value)}
                  className="border-none outline-none text-sm flex-1 bg-transparent"
                />
              </div>
            </div>
            <select
              value={myListingsStatusFilter}
              onChange={(e) => setMyListingsStatusFilter(e.target.value)}
              className="bg-white px-4 py-2 rounded-lg border text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="payment_pending">Payment Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Active Listings
            </h3>
            <div className="text-3xl font-bold text-green-600">{activeCount}</div>
            <p className="text-sm text-green-700">Currently listed</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Total Sales
            </h3>
            <div className="text-3xl font-bold text-blue-600">KSh{totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-blue-700">Revenue earned</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Total Views
            </h3>
            <div className="text-3xl font-bold text-purple-600">{totalViews}</div>
            <p className="text-sm text-purple-700">Listing views</p>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">Your Listings ({filteredListings.length})</h3>
          </div>
          <div className="divide-y">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {listing.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {listing.quantity.amount} {listing.quantity.unit} • Created {listing.dateCreated}
                    </p>
                    {listing.client && (
                      <p className="text-sm text-blue-600 mt-1">
                        Client: {listing.client}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        Views: {listing.views || 0}
                      </span>
                      <span className="text-sm text-gray-500">
                        Offers: {listing.offers || 0}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      KSh{(listing.status === "sold"
                        ? listing.soldPrice
                        : listing.pricing.askingPrice).toLocaleString()}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                      {getStatusLabel(listing.status)}
                    </span>
                    {listing.status === "sold" && listing.soldDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Completed on {listing.soldDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No listings found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setListings(mockListings);
    setImpactData(mockImpact);
  }, []);

  if (activeTab === "landing") {
    return <LandingPage />;
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
                <h1 className="text-xl font-bold text-gray-900">
                  WasteLink AI
                </h1>
                <p className="text-xs text-gray-500">
                  Africa's Circular Economy Platform
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">
                    WN
                  </span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">
                    Wanyoike Njuguna
                  </div>
                  <div className="text-gray-500">
                    Producer
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("landing")}
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
              { id: "landing", label: "Home", icon: Leaf },
              { id: "marketplace", label: "Marketplace", icon: Search },
              { id: "mylistings", label: "My Listings", icon: Plus },
              { id: "impact", label: "Impact", icon: Globe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
        {viewingProduct ? (
          <ProductDetailView />
        ) : (
          <>
            {activeTab === "scan" && <ScanTab />}
            {activeTab === "marketplace" && <MarketplaceTab />}
            {activeTab === "mylistings" && <MyListingsTab />}
            {activeTab === "impact" && <ImpactTab />}
          </>
        )}
      </main>

      <div className="fixed bottom-6 right-6 space-y-3">
        <button
          onClick={() => setActiveTab('scan')}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          type="button"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          type="button"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border">
          <div className="p-4 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <h3 className="font-semibold">TakaBot</h3>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && (
              <div className="text-gray-500 text-sm">
                Hi! I'm TakaBot, your waste trading assistant. Try the buttons below or ask anything!
              </div>
            )}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`text-sm ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg max-w-xs ${msg.type === 'user' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  {msg.text}
                  {msg.button && (
                    <button
                      onClick={msg.button.action}
                      className="block mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      {msg.button.text}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-left">
                <div className="inline-block p-2 rounded-lg max-w-xs bg-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                    <span className="text-gray-600">TakaBot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            {typingText && (
              <div className="text-sm text-left">
                <div className="inline-block p-2 rounded-lg max-w-xs bg-gray-100">
                  {typingText}<span className="animate-pulse">|</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t space-y-2">
            <div className="grid grid-cols-1 gap-1">
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChatSubmit(q)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded text-left"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && chatInput.trim() && handleChatSubmit(chatInput)}
                placeholder="Ask a question..."
                className="flex-1 p-2 border rounded text-sm"
              />
              <button
                onClick={() => chatInput.trim() && handleChatSubmit(chatInput)}
                className="bg-green-600 text-white px-3 py-2 rounded text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteLinkAI;
