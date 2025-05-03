import React, { useState } from "react";
import { Head } from "@inertiajs/react";

export default function PublicView({ project, categories }) {
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (categoryName) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [categoryName]: !prev[categoryName],
        }));
    };

    if (!project || !categories) {
        return <div className="text-center mt-10 text-gray-500">Data tidak ditemukan</div>;
    }

    return (
        <>
            <Head title={project.name} />
            <div className="min-h-screen flex flex-col items-center justify-start bg-white text-center p-6">
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}`}
                    alt="avatar"
                    className="w-20 h-20 rounded-full mb-2"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-6">@{project.slug}</h2>

                <div className="w-full max-w-md space-y-4">
                    {categories.map((categoryItem, index) => {
                        const categoryName = categoryItem.category || "Tanpa Kategori";
                        const isOpen = openDropdowns[categoryName];

                        return (
                            <div key={index} className="bg-white rounded shadow">
                                <button
                                    onClick={() => toggleDropdown(categoryName)}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full transition flex justify-between items-center"
                                >
                                    <span>{categoryName}</span>
                                    <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
                                </button>

                                {isOpen && (
                                    <div className="mt-3 bg-white border rounded-lg shadow-sm py-2 px-4 space-y-2 transition-all">
                                        {categoryItem.links.map((link, i) => (
                                            <div key={i}>
                                                <a
                                                    href={link.original_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded transition"
                                                >
                                                    {link.title}
                                                </a>

                                                {Array.isArray(link.children) && link.children.length > 0 && (
                                                    <div className="ml-4 mt-2 space-y-1">
                                                        {link.children.map((child, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={child.original_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block text-sm text-gray-600 hover:underline"
                                                            >
                                                                ↳ {child.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
