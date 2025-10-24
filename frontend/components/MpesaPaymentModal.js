import { useState, useEffect } from 'react';
import { X, Loader, CheckCircle } from 'lucide-react';

export default function MpesaPaymentModal({ isOpen, onClose, amount }) {
  const [step, setStep] = useState('input'); // 'input', 'processing', 'success'
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset to input step when modal closes
      setTimeout(() => setStep('input'), 300);
      setPhoneNumber('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    // Start processing
    setStep('processing');

    // Simulate STK push processing (5 seconds)
    setTimeout(() => {
      setStep('success');

      // Auto close after showing success for 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white relative">
          <button
            onClick={onClose}
            disabled={step === 'processing'}
            className="absolute top-4 right-4 text-white hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">M-Pesa Payment</h2>
          <p className="text-blue-100 text-sm mt-1">
            Total: KSh {amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Phone Number Input */}
          {step === 'input' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your M-Pesa number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g., 0712345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  maxLength="10"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  You will receive an STK push notification on this number
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all"
              >
                Send STK Push
              </button>
            </form>
          )}

          {/* Step 2: Processing Payment */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <Loader className="w-16 h-16 text-green-600 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing Payment...
              </h3>
              <p className="text-gray-600 mb-4">
                Please check your phone for the M-Pesa prompt
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Enter your M-Pesa PIN</strong> to complete the transaction
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Sent to: {phoneNumber}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your payment has been processed
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm text-green-800">
                  <p><strong>Transaction Complete</strong></p>
                  <p className="text-xs mt-1">Amount: KSh {amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="text-xs">Phone: {phoneNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
