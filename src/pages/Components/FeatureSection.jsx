export default function FeatureSection({ features }) {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}