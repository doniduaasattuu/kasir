import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, router } from "@inertiajs/react";

export default function Product({ auth, products }) {
    function createNewProduct() {
        router.get(route("products.create"));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Products</h2>
                                <p>A list of products</p>
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
