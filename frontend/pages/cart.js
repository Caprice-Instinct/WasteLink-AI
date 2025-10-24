import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Trash2, ArrowLeft, Tag, Undo2 } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [removedItem, setRemovedItem] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');

  // Mock cart item (Glass Bottles)
  const mockCartItem = {
    _id: "6",
    title: "Glass Bottles - Mixed",
    category: "glass",
    quantity: { amount: 500, unit: "kg" },
    quality: { grade: "B" },
    location: { city: "Thika", country: "Kenya" },
    pricing: { askingPrice: 19500 },
    images: ["/glassbottles.png"],
    seller: { name: "John Kamau" }
  };

  useEffect(() => {
    // Check if there's an item in cart from localStorage or props
    const hasCartItem = localStorage.getItem('cartItem');
    if (hasCartItem) {
      setCartItems([mockCartItem]);
    }
  }, []);

  const removeItem = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    setRemovedItem(item);
    setCartItems(cartItems.filter(item => item._id !== itemId));
    
    // Start 5-second undo timer
    const timer = setTimeout(() => {
      setRemovedItem(null);
      localStorage.removeItem('cartItem');
    }, 5000);
    setUndoTimer(timer);
  };

  const undoRemove = () => {
    if (removedItem) {
      setCartItems([removedItem]);
      setRemovedItem(null);
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'WASTE10') {
      setDiscount(0.9999);
      setAppliedPromo(promoCode);
    } else if (promoCode === 'RECYCLE5') {
      setDiscount(0.05);
      setAppliedPromo(promoCode);
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setDiscount(0);
    setAppliedPromo('');
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricing.askingPrice, 0);
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.16; // 16% VAT
  const total = subtotal - discountAmount + tax;

  return (
    <Layout cartCount={cartItems.length}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {/* Undo Banner */}
        {removedItem && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-yellow-800">Item removed from cart</span>
            <button
              onClick={undoRemove}
              className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            >
              <Undo2 className="w-4 h-4 mr-1" />
              Undo
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">Your cart is empty</div>
                <button
                  onClick={() => router.push('/marketplace')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Browse Marketplace
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg border p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {item.quantity.amount} {item.quantity.unit} • Grade {item.quality.grade}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Seller: {item.seller.name} • {item.location.city}, {item.location.country}
                        </p>
                        <div className="mt-2">
                          <span className="text-xl font-bold text-green-600">
                            KSh {item.pricing.askingPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({Math.round(discount * 100)}%)</span>
                      <span>-KSh {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>VAT (16%)</span>
                    <span>KSh {tax.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>KSh {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      disabled={appliedPromo !== ''}
                      className={`flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        appliedPromo !== '' ? 'bg-gray-100 text-gray-600' : ''
                      }`}
                    />
                    {appliedPromo === '' ? (
                      <button
                        onClick={applyPromoCode}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center"
                      >
                        <Tag className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={removePromoCode}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'mpesa', name: 'M-Pesa', icon: '📱' },
                      { id: 'visa', name: 'Visa', icon: '💳' },
                      { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                      { id: 'mastercard', name: 'Mastercard', icon: '💳' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                          selectedPayment === method.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <span>{method.icon}</span>
                          <span>{method.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Proceeding with ${selectedPayment}...`)}
                  disabled={!selectedPayment}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    selectedPayment
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {selectedPayment ? 'Proceed to Checkout' : 'Select Payment Method'}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout • Multiple payment options
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}