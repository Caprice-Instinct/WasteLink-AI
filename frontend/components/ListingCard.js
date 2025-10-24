import { MapPin, Camera, Eye, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ListingCard({ listing }) {
  const router = useRouter();
  const isOwnListing = listing.isOwnListing;

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        {listing.images && listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
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

        {isOwnListing ? (
          <div className="w-full bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center border border-green-300">
            <CheckCircle className="w-4 h-4 mr-2" />
            Your Listing
          </div>
        ) : (
          <button
            onClick={() => router.push(`/product/${listing._id}`)}
            className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </button>
        )}
      </div>
    </div>
  );
}
