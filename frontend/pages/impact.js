import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import SDGCard from '../components/SDGCard';
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
          <MetricCard
            icon={Leaf}
            value={`${((impactData.totalWasteDiverted || 0) / 1000).toFixed(1)}K`}
            label="Tonnes Diverted"
            gradient="from-green-500 to-emerald-600"
          />
          <MetricCard
            icon={Globe}
            value={`${((impactData.co2Saved || 0) / 1000).toFixed(1)}K`}
            label="CO₂ Saved (kg)"
            gradient="from-blue-500 to-cyan-600"
          />
          <MetricCard
            icon={DollarSign}
            value={`$${((impactData.revenue || 0) / 1000).toFixed(0)}K`}
            label="Revenue Generated"
            gradient="from-purple-500 to-pink-600"
          />
          <MetricCard
            icon={Users}
            value={impactData.jobsCreated || 0}
            label="Jobs Created"
            gradient="from-orange-500 to-red-600"
          />
          <MetricCard
            icon={TrendingUp}
            value={impactData.transactionsCompleted || 0}
            label="Transactions"
            gradient="from-indigo-500 to-purple-600"
          />
          <MetricCard
            icon={Phone}
            value={`${((impactData.waterSaved || 0) / 1000).toFixed(0)}K`}
            label="Liters Water Saved"
            gradient="from-teal-500 to-green-600"
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            UN SDG Contribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SDGCard
              number="8"
              title="Decent Work"
              description={`${impactData.jobsCreated || 0} jobs created`}
              bgColor="bg-yellow-50"
              textColor="text-yellow-600"
            />
            <SDGCard
              number="11"
              title="Sustainable Cities"
              description={`${((impactData.totalWasteDiverted || 0) / 1000).toFixed(1)}K tonnes processed`}
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <SDGCard
              number="12"
              title="Responsible Consumption"
              description={`$${((impactData.revenue || 0) / 1000).toFixed(0)}K circular revenue`}
              bgColor="bg-green-50"
              textColor="text-green-600"
            />
            <SDGCard
              number="13"
              title="Climate Action"
              description={`${((impactData.co2Saved || 0) / 1000).toFixed(1)}K kg CO₂ saved`}
              bgColor="bg-emerald-50"
              textColor="text-emerald-600"
            />
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