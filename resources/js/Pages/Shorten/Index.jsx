import React, { useState } from "react";
import { Head, usePage, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth }) {
    const { shortends = [], flash } = usePage().props;
    const [copiedId, setCopiedId] = useState(null);
    const { delete: destroy } = useForm();

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus link ini?")) {
            destroy(route('shorten.destroy', id));
        }
    };

    const baseUrl = window.location.origin + "/s/";

    const getCustomFavicon = (url) => {
        try {
            const hostname = new URL(url).hostname.replace(/^www\./, "");

            const customIcons = {
                "github.com": "/icons/github.svg",
                "facebook.com": "/icons/facebook.svg",
                "twitter.com": "/icons/twitter.svg",
                "linkedin.com": "/icons/linkedin.svg",
                "youtube.com": "/icons/youtube.svg",
                "figma.com": "/icons/figma.svg",
            };

            if (customIcons[hostname]) {
                return customIcons[hostname];
            }

            // Fallback ke favicon dari Google
            return `https://www.google.com/s2/favicons?domain=${hostname}`;
        } catch (error) {
            // Fallback icon default lokal (opsional)
            return "/icons/default.svg";
        }
    };    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Shorten Links Dashboard
                </h2>
            }
        >
            <Head title="Shorten Links Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 flex justify-between items-center text-gray-900 dark:text-gray-100">
                            <span>
                                Total Short Links: {shortends.length === 0 ? "Belum ada link" : shortends.length}
                            </span>

                            <Link
                                href="/dashboard/shorten/create"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Tambah Link
                            </Link>
                        </div>

                        {flash?.success && (
                            <div className="px-6 text-green-500">
                                {flash.success}
                            </div>
                        )}

                        <div className="overflow-x-auto px-6 pb-6">
                            <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <tr>
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">Short Link</th>
                                        <th className="px-4 py-2">Original URL</th>
                                        <th className="px-4 py-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shortends.length > 0 ? (
                                        shortends.map((link, index) => {
                                            const finalCode = link.custom_alias || link.short_code;
                                            const fullShortUrl = `${baseUrl}${finalCode}`;

                                            return (
                                                <tr
                                                    key={link.id}
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <td className="px-4 py-2">{index + 1}</td>
                                                    <td className="px-4 py-2 font-medium">
                                                        <a
                                                            href={fullShortUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 underline"
                                                        >
                                                            {fullShortUrl}
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-2 max-w-xs">
                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                            <img
                                                                src={getCustomFavicon(link.original_url)}
                                                                alt="favicon"
                                                                className="w-5 h-5 shrink-0"
                                                                onError={(e) => {
                                                                    const hostname = new URL(link.original_url).hostname;
                                                                    e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${hostname}`;
                                                                }}
                                                            />
                                                            <span className="truncate">{link.original_url}</span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-2 flex gap-2">
                                                        <Link
                                                            href={`/dashboard/shorten/${link.id}/edit`}
                                                            className="text-yellow-500 hover:underline"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            onClick={() => handleDelete(link.id)}
                                                            className="text-red-500 hover:underline"
                                                        >
                                                            Hapus
                                                        </button>

                                                        <button
                                                            onClick={() => copyToClipboard(fullShortUrl, link.id)}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {copiedId === link.id ? "Disalin!" : "Salin Link"}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                            >
                                                Belum ada short link yang tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
