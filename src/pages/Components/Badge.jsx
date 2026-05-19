export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-hijau text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-600 text-white",
    danger: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-600 text-white",
  };
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-medium`}>
      {children}
    </span>
  );
}