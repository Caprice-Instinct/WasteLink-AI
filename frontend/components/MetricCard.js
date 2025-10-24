export default function MetricCard({
  icon: Icon,
  value,
  label,
  subtext,
  gradient = "from-green-500 to-emerald-600"
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-xl text-center`}>
      {Icon && <Icon className="w-8 h-8 mx-auto mb-2" />}
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
      {subtext && <div className="text-xs opacity-75 mt-1">{subtext}</div>}
    </div>
  );
}
