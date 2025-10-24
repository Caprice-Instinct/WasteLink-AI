import { useState, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import { Camera } from 'lucide-react';

export default function Scanner() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [wasteQuantity, setWasteQuantity] = useState('');
  const [wasteUnit, setWasteUnit] = useState('kg');
  const [wasteDescription, setWasteDescription] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
      alert('Please enter the waste quantity');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setScanResult({
        confidence: 0.92,
        category: 'plastic',
        materials: ['HDPE', 'Polypropylene'],
        grade: 'A',
        estimatedValue: { min: 800, max: 1200, currency: 'KES' },
        recommendations: [
          'Clean thoroughly before sale',
          'Sort by color for 15% price premium',
          'High demand in construction sector',
        ],
        marketTrends: 'HDPE prices up 12% this month',
        potentialBuyers: 8,
      });
      setLoading(false);
    }, 2000);
  }, [wasteQuantity]);

  return (
    <Layout>
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
                    onChange={(e) => setWasteDescription(e.target.value)}
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
                      onChange={(e) => setWasteQuantity(e.target.value)}
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
                      onChange={(e) => setWasteUnit(e.target.value)}
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
                  {loading ? 'Analyzing...' : 'Analyze Waste'}
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
                    {scanResult.materials?.join(', ')}
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
                  onClick={() => alert('Listing created successfully!')}
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
    </Layout>
  );
}