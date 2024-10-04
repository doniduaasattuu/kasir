import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, router } from "@inertiajs/react";
import { useState, useMemo, useEffect, useRef } from "react";

export default function Product({ auth, products }) {
    function createNewProduct() {
        router.get(route("products.create"));
    }

    const initialRender = useRef(true);
    const urlParams = new URLSearchParams(window.location.search);
    const [inputSearch, setInputSearch] = useState(
        urlParams.get("search") ?? ""
    );
    const [searchTerm, setSearchTerm] = useState(urlParams.get("search") ?? "");

    let userUrl = useMemo(() => {
        const url = new URL(route("products.index"));

        if (searchTerm) {
            url.searchParams.append("search", searchTerm);
        }

        return url.href;
    }, [searchTerm]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(userUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    }, [userUrl]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(inputSearch);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputSearch]);

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Products</h2>
                                <p>A list of all product</p>
                            </div>
                            <div>
                                <PrimaryButton
                                    onClick={() => createNewProduct()}
                                >
                                    New
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div>
                        <TextInput
                            id="search"
                            className="mt-1 block w-sm"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            placeholder="Search product data..."
                        />
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-scroll p-6 text-gray-900 dark:text-gray-300">
                            <table className="table min-w-max">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>SKU</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => {
                                        return (
                                            <tr
                                                key={product.id}
                                                className="hover"
                                            >
                                                <th>{product.name}</th>
                                                <th>{product.sku}</th>
                                                <th>{rupiah(product.price)}</th>
                                                <th>{product.stock} pcs</th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {products.meta.links.length > 3 && (
                        <Pagination meta={products.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
