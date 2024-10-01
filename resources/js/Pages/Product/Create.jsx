import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, router } from "@inertiajs/react";

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    New Product
                </h2>
            }
        >
            <Head title="New Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>New Product</h2>
                                <p>Create a new product</p>
                            </div>
                            {/* <div>
                                <PrimaryButton
                                    onClick={() => createNewProduct()}
                                >
                                    New
                                </PrimaryButton>
                            </div> */}
                        </div>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-scroll p-6 text-gray-900 dark:text-gray-300">
                            <div>Hello world</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
