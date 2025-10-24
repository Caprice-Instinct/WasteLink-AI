import Layout from '../components/Layout';
import {
  Leaf,
  Globe,
  DollarSign,
  Users,
  TrendingUp,
  Phone,
} from 'lucide-react';

export default function Impact() {
  const impactData = {
    totalWasteDiverted: 12450,
    co2Saved: 8930,
    waterSaved: 45600,
    jobsCreated: 234,
    revenue: 890000,
    transactionsCompleted: 1247,
  };

  return (
    <Layout>
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
    </Layout>
  );
}