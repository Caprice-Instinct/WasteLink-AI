import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ListingCard from '../components/ListingCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { Camera } from 'lucide-react';

export default function Marketplace() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');

  // Check for URL parameters on mount
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }
    if (router.query.location) {
      setLocationFilter(router.query.location);
    }
  }, [router.query]);



  // Mock data
  const mockListings = [
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
      _id: "6",
      title: "Glass Bottles - Mixed",
      category: "glass",
      quantity: { amount: 500, unit: "kg" },
      quality: { grade: "B", contamination: 10 },
      location: { city: "Thika", country: "Kenya" },
      pricing: { askingPrice: 19500, currency: "KES", negotiable: true },
      images: ["/glassbottles.png"],
      aiAnalysis: {
        confidence: 0.85,
        estimatedValue: { min: 120, max: 180 },
        marketDemand: "Medium",
      },
    },
    {
      _id: "7",
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

  useEffect(() => {
    // Load mock listings
    let allListings = [...mockListings];

    // Check if user has created a listing
    const userListing = localStorage.getItem('userListing');
    if (userListing) {
      const parsedListing = JSON.parse(userListing);
      // Add user's listing at the beginning
      allListings = [parsedListing, ...allListings];
    }

    setListings(allListings);
  }, []);

  const filteredListings = listings.filter(
    (listing) =>
      (locationFilter === "all" || listing.location?.country === locationFilter) &&
      (searchQuery === "" ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const makeOffer = (listingId, message, proposedPrice) => {
    alert("Offer sent successfully! (Demo mode)");
  };



  return (
    <Layout>
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

          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search materials..."
            filterValue={locationFilter}
            onFilterChange={setLocationFilter}
            filterOptions={[
              { value: 'all', label: 'All Locations' },
              { value: 'Ghana', label: 'Ghana' },
              { value: 'Nigeria', label: 'Nigeria' },
              { value: 'Kenya', label: 'Kenya' },
              { value: 'South Africa', label: 'South Africa' }
            ]}
          />
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
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No listings found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}


      </div>
    </Layout>
  );
}