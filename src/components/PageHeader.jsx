export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white border-b border-gray-100">
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold text-gray-900">
                    {title || "Dashboard"}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2 text-gray-500 text-sm">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span className={index === breadcrumb.length - 1 ? "text-gray-900 font-bold" : ""}>
                                    {item}
                                </span>
                                {index < breadcrumb.length - 1 && <span>/</span>}
                            </div>
                        ))
                    ) : (
                        <span>{breadcrumb || "Home"}</span>
                    )}
                </div>
            </div>

            {/* Slot untuk tombol Add (children) */}
            <div id="pageheader-right">
                {children}
            </div>
        </div>
    );
}