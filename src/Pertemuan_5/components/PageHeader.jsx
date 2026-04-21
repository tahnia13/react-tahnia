export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex flex-col gap-2 p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold">
                    Dashboard
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2 text-gray-500">
                    <span id="breadcrumb-home">Home</span>
                    <span id="breadcrumb-separator">/</span>
                    <span id="breadcrumb-detail">Home Detail</span>
                    <span id="breadcrumb-separator">/</span>
                    <span id="breadcrumb-current">Home Very Detail</span>
                </div>
            </div>
        </div>
    );
}

