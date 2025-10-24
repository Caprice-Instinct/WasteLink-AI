export default function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "payment_pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "sold":
        return "Sold";
      case "payment_pending":
        return "Payment Pending";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
