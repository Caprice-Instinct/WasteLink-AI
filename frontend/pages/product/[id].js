import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { MapPin, Star, ChevronLeft, ChevronRight, ArrowLeft, Heart } from 'lucide-react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [toast, setToast] = useState(null);

  const mockProducts = {
    "6": {
      _id: "6",
      title: "Glass Bottles - Mixed",
      category: "glass",
      quantity: { amount: 500, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 19500, currency: "KES", negotiable: true },
      images: [
        "/glassbottles.png",
        "/glass2.png",
        "/glass3.png",
        "/glass4.png",
      ],
      aiAnalysis: {
        confidence: 0.85,
        estimatedValue: { min: 120, max: 180 },
        marketDemand: "Medium",
      },
      seller: {
        name: "John Kamau",
        rating: 4.7,
        totalSales: 156,
        verified: true
      },
      description: "High-quality mixed glass bottles collected from restaurants and hotels. Bottles are clean and sorted by color. Perfect for recycling into new glass products. Available for immediate pickup.",
      specifications: {
        colors: "Clear, Brown, Green",
        condition: "Clean, sorted",
        packaging: "Bulk collection",
        availability: "Immediate"
      }
    }
  };

  useEffect(() => {
    if (id) {
      setProduct(mockProducts[id] || null);
    }
  }, [id]);

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  if (!product) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout cartCount={isInCart ? 1 : 0}>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {product.location.city}, {product.location.country}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Grade {product.quality.grade}
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{product.seller.name} ({product.seller.rating})</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.seller.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{product.seller.totalSales} sales</span>
                  </div>
                </div>
                {product.seller.verified && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white border rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">
                KSh {product.pricing.askingPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                AI Estimated Value: ${product.aiAnalysis.estimatedValue.min}-${product.aiAnalysis.estimatedValue.max}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <div className="font-medium">{product.quantity.amount} {product.quantity.unit}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <div className="font-medium capitalize">{product.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Market Demand:</span>
                    <div className={`font-medium ${
                      product.aiAnalysis.marketDemand === "High" ? "text-green-600" :
                      product.aiAnalysis.marketDemand === "Medium" ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {product.aiAnalysis.marketDemand}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">AI Confidence:</span>
                    <div className="font-medium">{Math.round(product.aiAnalysis.confidence * 100)}%</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(`${product.title} ${isWishlisted ? 'removed from' : 'added to'} your wishlist`);
                }}
                className="p-3 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
              </button>
              <button 
                onClick={() => {
                  setIsInCart(!isInCart);
                  if (!isInCart) {
                    localStorage.setItem('cartItem', 'true');
                  } else {
                    localStorage.removeItem('cartItem');
                  }
                  showToast(`${product.title} ${isInCart ? 'removed from' : 'added to'} your cart`);
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isInCart 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}