import { Link, usePage } from "@inertiajs/react";

export default function Links() {
    const { project, links = [], flash } = usePage().props;

    return (
        <div>
            <h1 className="text-2xl font-bold">
                {project.project_name} - Links
            </h1>

            {flash?.success && (
                <p className="text-green-500">{flash.success}</p>
            )}

            <Link
                href={`/dashboard/projects/${project.project_id}/links/create`}
                className="btn btn-primary"
            >
                + Tambah Link
            </Link>

            {links.length > 0 ? (
                <ul className="mt-4">
                    {links.map((link) => (
                        <li key={link.link_id} className="border-b py-2">
                            <a
                                href={link.original_url}
                                target="_blank"
                                className="text-blue-500"
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 mt-4">Belum ada link.</p>
            )}
        </div>
    );
}
