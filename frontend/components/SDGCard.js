export default function SDGCard({ number, title, description, bgColor = "bg-green-50", textColor = "text-green-600" }) {
  return (
    <div className={`text-center p-4 ${bgColor} rounded-lg`}>
      <div className={`text-3xl font-bold ${textColor}`}>SDG {number}</div>
      <div className="text-sm text-gray-700 mt-1">{title}</div>
      <div className="text-xs text-gray-600">{description}</div>
    </div>
  );
}
