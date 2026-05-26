import PageHeader from "../components/PageHeader";

export default function FiturXYZ() {
    return (
        <div id="fitur-xyz-page" className="mt-6">
            <PageHeader title="Fitur XYZ" breadcrumbs={["fitur XYZ"]} />
            <div className="rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-lg text-gray-600">Ini Halaman Fitur Xyz</p>
            </div>
        </div>
    );
}