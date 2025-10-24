import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Leaf,
  Search,
  Plus,
  Globe,
  ShoppingCart,
  LogOut,
  MessageCircle,
  X
} from 'lucide-react';

export default function Layout({ children, cartCount = 0 }) {
  const router = useRouter();
  const [showChatbot, setShowChatbot] = useState(false);
  const [cart, setCart] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { name: 'Home', href: '/', icon: Leaf },
    { name: 'Marketplace', href: '/marketplace', icon: Search },
    { name: 'My Listings', href: '/listings', icon: Plus },
    { name: 'Impact', href: '/impact', icon: Globe },
  ];

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
      
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('glass') && (lowerMessage.includes('near') || lowerMessage.includes('looking'))) {
        fullResponse = "I found 1 glass bottle listing near you! There's a supplier in Thika, Kenya offering 'Glass Bottles - Mixed' (500 kg, Grade B) for KSh 19,500. The listing has medium market demand and is negotiable. Click below to view it in the marketplace.";
        hasButton = { text: "View Glass Bottles", action: () => { router.push('/marketplace'); setSearchQuery('glass'); setShowChatbot(false); } };
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
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
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
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
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
              <Link href="/" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <div className="fixed bottom-6 right-6 space-y-3">
        <Link href="/scanner" className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </Link>
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
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
}