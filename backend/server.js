// server.js - Main Express Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wastelink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Models
const User = mongoose.model('User', {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  company: String,
  phone: String,
  location: {
    country: String,
    city: String,
    coordinates: [Number]
  },
  userType: { type: String, enum: ['producer', 'buyer', 'both'], default: 'producer' },
  verified: { type: Boolean, default: false },
  preferences: {
    languages: [String],
    categories: [String],
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false }
    }
  },
  stats: {
    totalTransactions: { type: Number, default: 0 },
    totalValue: { type: Number, default: 0 },
    wasteProcessed: { type: Number, default: 0 },
    co2Saved: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

const WasteListing = mongoose.model('WasteListing', {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  category: {
    type: String,
    enum: ['plastic', 'textile', 'metal', 'electronics', 'organic', 'paper', 'glass', 'other'],
    required: true
  },
  subCategory: String,
  quantity: {
    amount: { type: Number, required: true },
    unit: { type: String, enum: ['kg', 'tonnes', 'pieces', 'cubic_meters'], default: 'kg' }
  },
  quality: {
    grade: { type: String, enum: ['A', 'B', 'C'], default: 'B' },
    condition: String,
    contamination: Number // percentage
  },
  images: [String],
  aiAnalysis: {
    confidence: Number,
    detectedMaterials: [String],
    estimatedValue: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    recommendations: [String],
    marketDemand: String
  },
  location: {
    country: String,
    city: String,
    address: String,
    coordinates: [Number]
  },
  pricing: {
    askingPrice: Number,
    negotiable: { type: Boolean, default: true },
    currency: { type: String, default: 'USD' }
  },
  availability: {
    status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
    availableFrom: Date,
    collectionDeadline: Date
  },
  matches: [{
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    reason: String,
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', {
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteListing', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'negotiating', 'agreed', 'in_transit', 'completed', 'cancelled'],
    default: 'pending'
  },
  pricing: {
    agreedPrice: Number,
    currency: String,
    paymentMethod: { type: String, enum: ['mpesa', 'airtel_money', 'bank_transfer', 'cash'] }
  },
  logistics: {
    pickupDate: Date,
    deliveryDate: Date,
    transportProvider: String,
    trackingId: String
  },
  impact: {
    wasteProcessed: Number,
    co2Saved: Number,
    waterSaved: Number,
    jobsCreated: Number
  },
  messages: [{
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ImpactMetrics = mongoose.model('ImpactMetrics', {
  date: { type: Date, default: Date.now },
  metrics: {
    totalWasteDiverted: Number, // tonnes
    co2Saved: Number, // tonnes
    waterSaved: Number, // liters
    jobsCreated: Number,
    revenue: Number,
    activeUsers: Number,
    transactionsCompleted: Number
  },
  sdgContribution: {
    sdg8: Number, // Decent Work and Economic Growth
    sdg11: Number, // Sustainable Cities
    sdg12: Number, // Responsible Consumption
    sdg13: Number  // Climate Action
  },
  regional: {
    country: String,
    cityBreakdown: Object
  }
});

// AI Waste Analysis Service (Mock - integrate with actual AI service)
const analyzeWasteImage = async (imagePath) => {
  // Mock AI analysis - replace with actual AI service call
  const categories = ['plastic', 'textile', 'metal', 'electronics'];
  const grades = ['A', 'B', 'C'];
  
  return {
    confidence: 0.85 + Math.random() * 0.14,
    detectedMaterials: ['HDPE', 'Polypropylene'],
    category: categories[Math.floor(Math.random() * categories.length)],
    grade: grades[Math.floor(Math.random() * grades.length)],
    estimatedValue: {
      min: Math.floor(Math.random() * 500) + 100,
      max: Math.floor(Math.random() * 1000) + 600,
      currency: 'USD'
    },
    recommendations: [
      'Clean thoroughly before sale',
      'Sort by color for better pricing',
      'High demand in construction industry'
    ],
    marketDemand: 'High'
  };
};

// Matching Algorithm
const findMatches = async (listing) => {
  // Find buyers interested in this category
  const potentialBuyers = await User.find({
    userType: { $in: ['buyer', 'both'] },
    'preferences.categories': listing.category,
    _id: { $ne: listing.userId }
  });

  const matches = potentialBuyers.map(buyer => {
    let score = 0.5; // Base score
    
    // Location proximity (if coordinates available)
    if (listing.location.coordinates && buyer.location.coordinates) {
      const distance = calculateDistance(
        listing.location.coordinates,
        buyer.location.coordinates
      );
      score += distance < 50 ? 0.3 : distance < 200 ? 0.2 : 0.1;
    }
    
    // Category match
    if (buyer.preferences.categories.includes(listing.category)) {
      score += 0.2;
    }
    
    return {
      buyerId: buyer._id,
      score: Math.min(score, 1.0),
      reason: `${Math.round(score * 100)}% match - Same category, good location proximity`
    };
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, 10);
};

// Distance calculation helper
const calculateDistance = (coord1, coord2) => {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, company, phone, location, userType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      company,
      phone,
      location,
      userType
    });
    
    await user.save();
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        stats: user.stats
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Waste Listings Routes
app.post('/api/listings', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const {
      title, category, subCategory, quantity, quality, location, pricing, availability, tags
    } = req.body;
    
    const images = req.files ? req.files.map(file => file.filename) : [];
    
    // AI Analysis
    let aiAnalysis = {};
    if (images.length > 0) {
      aiAnalysis = await analyzeWasteImage(images[0]);
    }
    
    const listing = new WasteListing({
      userId: req.user.userId,
      title,
      category,
      subCategory,
      quantity: JSON.parse(quantity),
      quality: JSON.parse(quality),
      images,
      aiAnalysis,
      location: JSON.parse(location),
      pricing: JSON.parse(pricing),
      availability: JSON.parse(availability),
      tags: JSON.parse(tags || '[]')
    });
    
    // Find matches
    const matches = await findMatches(listing);
    listing.matches = matches;
    
    await listing.save();
    
    res.status(201).json({
      message: 'Listing created successfully',
      listing,
      matches: matches.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/listings', async (req, res) => {
  try {
    const { 
      category, 
      location, 
      minPrice, 
      maxPrice, 
      quality, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    const query = { 'availability.status': 'available' };
    
    if (category) query.category = category;
    if (location) query['location.city'] = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query['pricing.askingPrice'] = {};
      if (minPrice) query['pricing.askingPrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.askingPrice'].$lte = Number(maxPrice);
    }
    if (quality) query['quality.grade'] = quality;
    
    const listings = await WasteListing.find(query)
      .populate('userId', 'name company location')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await WasteListing.countDocuments(query);
    
    res.json({
      listings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AI-Powered Matching Route
app.get('/api/listings/:id/matches', authenticateToken, async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id)
      .populate('matches.buyerId', 'name company location');
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Refresh matches if needed
    if (listing.matches.length === 0) {
      const newMatches = await findMatches(listing);
      listing.matches = newMatches;
      await listing.save();
    }
    
    res.json(listing.matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Transaction Routes
app.post('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { listingId, message, proposedPrice } = req.body;
    
    const listing = await WasteListing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    const transaction = new Transaction({
      listingId,
      sellerId: listing.userId,
      buyerId: req.user.userId,
      pricing: {
        agreedPrice: proposedPrice || listing.pricing.askingPrice,
        currency: listing.pricing.currency
      },
      messages: [{
        senderId: req.user.userId,
        message: message || 'Interested in your listing'
      }]
    });
    
    await transaction.save();
    
    // Update listing status
    listing.availability.status = 'reserved';
    await listing.save();
    
    res.status(201).json({ message: 'Transaction initiated', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard and Analytics Routes
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // User's listings
    const listings = await WasteListing.find({ userId }).limit(5);
    
    // User's transactions
    const transactions = await Transaction.find({
      $or: [{ sellerId: userId }, { buyerId: userId }]
    }).populate('listingId').limit(10);
    
    // User stats
    const user = await User.findById(userId);
    
    // Market insights
    const marketInsights = await WasteListing.aggregate([
      { $match: { 'availability.status': 'available' } },
      { 
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$pricing.askingPrice' },
          totalQuantity: { $sum: '$quantity.amount' }
        }
      }
    ]);
    
    res.json({
      listings,
      transactions,
      stats: user.stats,
      marketInsights
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SMS Integration (using Twilio)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.post('/api/sms/webhook', async (req, res) => {
  try {
    const { From, Body } = req.body;
    
    // Parse SMS: "WASTE PLASTIC 2TONNES ACCRA"
    const parts = Body.toUpperCase().split(' ');
    
    if (parts[0] === 'WASTE' && parts.length >= 4) {
      const category = parts[1].toLowerCase();
      const quantityStr = parts[2];
      const location = parts.slice(3).join(' ');
      
      // Extract quantity and unit
      const quantity = parseFloat(quantityStr.replace(/[^\d.]/g, ''));
      const unit = quantityStr.includes('TONNE') ? 'tonnes' : 'kg';
      
      // Find user by phone
      let user = await User.findOne({ phone: From });
      if (!user) {
        // Create basic user
        user = new User({
          phone: From,
          email: `${From.replace('+', '')}@sms.wastelink.com`,
          name: `SMS User ${From}`,
          password: await bcrypt.hash('temporary', 12),
          location: { city: location },
          userType: 'producer'
        });
        await user.save();
      }
      
      // Create listing
      const listing = new WasteListing({
        userId: user._id,
        title: `${category} waste via SMS`,
        category: ['plastic', 'metal', 'textile', 'paper'].includes(category) ? category : 'other',
        quantity: { amount: quantity, unit },
        location: { city: location },
        pricing: { askingPrice: 0, negotiable: true }
      });
      
      await listing.save();
      
      // Send confirmation SMS
      await twilioClient.messages.create({
        body: `✅ Your ${quantity}${unit} of ${category} waste in ${location} has been listed on WasteLink! ID: ${listing._id.toString().slice(-6)}`,
        from: process.env.TWILIO_PHONE,
        to: From
      });
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('SMS webhook error:', error);
    res.status(500).send('Error');
  }
});

// Impact Metrics Route
app.get('/api/impact', async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    
    // Calculate current metrics
    const completedTransactions = await Transaction.find({ 
      status: 'completed',
      createdAt: { $gte: lastMonth }
    });
    
    const metrics = {
      totalWasteDiverted: completedTransactions.reduce((sum, t) => sum + (t.impact?.wasteProcessed || 0), 0),
      co2Saved: completedTransactions.reduce((sum, t) => sum + (t.impact?.co2Saved || 0), 0),
      waterSaved: completedTransactions.reduce((sum, t) => sum + (t.impact?.waterSaved || 0), 0),
      jobsCreated: completedTransactions.reduce((sum, t) => sum + (t.impact?.jobsCreated || 0), 0),
      revenue: completedTransactions.reduce((sum, t) => sum + t.pricing.agreedPrice, 0),
      activeUsers: await User.countDocuments({ createdAt: { $gte: lastMonth } }),
      transactionsCompleted: completedTransactions.length
    };
    
    res.json({
      currentMonth: metrics,
      sdgContribution: {
        sdg8: metrics.jobsCreated,
        sdg11: metrics.totalWasteDiverted,
        sdg12: metrics.revenue,
        sdg13: metrics.co2Saved
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 WasteLink AI Backend running on port ${PORT}`);
  console.log(`🌍 Ready to transform waste into resources across Africa!`);
});