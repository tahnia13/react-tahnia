export default function Avatar({ name, src, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  if (src) {
    return (
      <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-hijau flex items-center justify-center text-white font-bold`}>
      {name?.charAt(0) || "?"}
    </div>
  );
}