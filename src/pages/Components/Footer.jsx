export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-2">Sedap Restaurant</h2>
        <div className="flex justify-center gap-4 mb-4">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/products" className="hover:text-gray-300">Produk</a>
          <a href="/customers" className="hover:text-gray-300">Customers</a>
        </div>
        <p className="text-gray-500 text-sm">© 2026 Sedap Restaurant Admin. All rights reserved.</p>
      </div>
    </footer>
  );
}