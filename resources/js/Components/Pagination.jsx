import { router } from "@inertiajs/react";

export default function Pagination({ meta }) {
    return (
        <div className="p-4 px-6 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 rounded-xl">
            <div className="flex justify-between align-middle flex-wrap flex-row sm:align-middle gap-3">
                <div className="text-sm self-center">
                    <p className="text-sm">
                        Showing
                        <span className="mx-1">{meta.from}</span>
                        to
                        <span className="mx-1">{meta.to}</span>
                        of
                        <span className="mx-1">{meta.total}</span>
                        results
                    </p>
                </div>
                <div className="join flex-wrap ">
                    {meta.links.map((link, index) => {
                        return (
                            <button
                                disabled={!link.url}
                                key={index}
                                onClick={() => {
                                    if (!link.active) {
                                        router.visit(link.url, {
                                            preserveScroll: true,
                                            preserveState: true,
                                        });
                                    }

                                    if (link.active) {
                                        router.reload(link.url, {
                                            preserveScroll: true,
                                            preserveState: true,
                                        });
                                    }
                                }}
                                className={`join-item btn btn-sm sm:btn-md text-sm border-transparent border border-gray-800 hover:bg-gray-800 ${
                                    link.active ? "bg-gray-700" : "bg-gray-900"
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
