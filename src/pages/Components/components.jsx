import PageHeader from "../../components/PageHeader";
import Button from "./Button";
import Badge from "./Badge";
import Avatar from "./Avatar";
import Container from "./Container";
import Footer from "./Footer";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import ProductSection from "../components/ProductSection";
import { useState } from "react";

export default function Components() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", category: "" });

  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  const options = [
    { value: "elektronik", label: "Elektronik" },
    { value: "fashion", label: "Fashion" },
    { value: "aksesoris", label: "Aksesoris" }
  ];

  const features = [
    { icon: "🚀", title: "Cepat", description: "Proses yang sangat cepat" },
    { icon: "🔒", title: "Aman", description: "Data terjamin keamanannya" },
    { icon: "💎", title: "Premium", description: "Kualitas terbaik" }
  ];

  const productItems = [
    { name: "Product 1", price: "Rp 100.000", image: "https://via.placeholder.com/300" },
    { name: "Product 2", price: "Rp 200.000", image: "https://via.placeholder.com/300" },
    { name: "Product 3", price: "Rp 300.000", image: "https://via.placeholder.com/300" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="components-page">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      <div className="p-5 space-y-6">
        {/* 1. Basic Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">1. Basic Component</h3>
          <p className="text-gray-600 mb-4">Basic Component adalah component kecil dan sederhana yang sering digunakan berulang di banyak halaman.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: Button, Badge, Avatar</p>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Button</h4>
            <div className="flex gap-3">
              <Button type="success">Simpan</Button>
              <Button type="danger">Hapus</Button>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Badge</h4>
            <div className="flex gap-3">
              <Badge type="success">Aktif</Badge>
              <Badge type="warning">Pending</Badge>
              <Badge type="primary">Selesai</Badge>
              <Badge type="danger">Baru</Badge>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Avatar</h4>
            <div className="flex gap-3">
              <Avatar name="Budi" />
              <Avatar name="Siti" />
            </div>
          </div>
        </div>

        {/* 2. Layout Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">2. Layout Component</h3>
          <p className="text-gray-600 mb-4">Layout Component digunakan untuk menyusun struktur besar halaman.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: Container, Footer</p>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Container</h4>
            <Container className="bg-gray-100 rounded-xl">
              <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>
              <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
            </Container>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Footer</h4>
            <Footer />
          </div>
        </div>

        {/* 3. Data Display Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">3. Data Display Component</h3>
          <p className="text-gray-600 mb-4">Data Display Component digunakan untuk menampilkan informasi atau data kepada pengguna.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: Card, ProductCard, Table</p>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Card</h4>
            <Card>
              <h2 className="text-xl font-bold">Judul Card</h2>
              <p className="text-gray-600">Ini adalah isi dari card.</p>
            </Card>
          </div>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">ProductCard</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductCard
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                title="Sepatu Sport"
                category="Fashion"
                price="Rp 450.000"
                description="Sepatu sport modern dengan desain nyaman dan ringan"
              />
              <ProductCard
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                title="Smartphone"
                category="Elektronik"
                price="Rp 4.500.000"
                description="Smartphone dengan performa cepat, kamera jernih"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Table</h4>
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{index + 1}</td>
                  <td className="border px-4 py-3">{product.name}</td>
                  <td className="border px-4 py-3">{product.category}</td>
                  <td className="border px-4 py-3">{product.price}</td>
                  <td className="border px-4 py-3">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded">Detail</button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>

        {/* 4. Form Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">4. Form Component</h3>
          <p className="text-gray-600 mb-4">Form Component digunakan untuk menerima input dari pengguna.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: InputField, TextArea, SelectField</p>

          <div className="mt-4">
            <InputField label="Nama" name="name" placeholder="Masukkan nama" value={formData.name} onChange={handleChange} />
            <InputField label="Email" type="email" name="email" placeholder="Masukkan email" value={formData.email} onChange={handleChange} />
            <TextArea label="Deskripsi" name="description" placeholder="Masukkan deskripsi" />
            <SelectField label="Kategori" name="category" options={options} value={formData.category} onChange={handleChange} />
            <Button type="primary">Submit</Button>
          </div>
        </div>

        {/* 5. Feedback Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">5. Feedback Component</h3>
          <p className="text-gray-600 mb-4">Feedback Component digunakan untuk memberikan respon kepada pengguna setelah terjadi suatu aksi.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: Alert, Modal, Loading</p>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Alert</h4>
            {showAlert && (
              <Alert type="success" message="Data berhasil disimpan!" onClose={() => setShowAlert(false)} />
            )}
            <Alert type="error" message="Terjadi kesalahan pada sistem." />
            <Alert type="warning" message="Periksa kembali data Anda." />
            <Alert type="info" message="Informasi terbaru untuk Anda." />
          </div>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Modal</h4>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>Buka Modal</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Informasi">
              <p>Ini adalah contoh modal component.</p>
            </Modal>
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Loading</h4>
            <Loading />
          </div>
        </div>

        {/* 6. Section Component */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">6. Section Component</h3>
          <p className="text-gray-600 mb-4">Section Component adalah component yang mewakili satu bagian besar dalam halaman.</p>
          <p className="text-gray-500 text-sm mb-4">Contoh: HeroSection, FeatureSection, ProductSection</p>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">HeroSection</h4>
            <HeroSection title="Selamat Datang" subtitle="Ini adalah aplikasi React terbaik" buttonText="Mulai Sekarang" />
          </div>

          <div className="mt-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-2">FeatureSection</h4>
            <FeatureSection features={features} />
          </div>

          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">ProductSection</h4>
            <ProductSection title="Produk Unggulan" products={productItems} />
          </div>
        </div>
      </div>
    </div>
  );
}