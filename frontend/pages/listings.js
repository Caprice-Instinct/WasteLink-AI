import { useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { Search, Plus, Eye } from 'lucide-react';

export default function Listings() {
  const [myListingsSearch, setMyListingsSearch] = useState('');
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState('all');

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
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Listings</h2>
            <p className="text-gray-600">Manage your waste listings and sales</p>
          </div>
          <Link
            href="/scanner"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </Link>
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
                      <span className="text-sm text-gray-500 flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
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
    </Layout>
  );
}