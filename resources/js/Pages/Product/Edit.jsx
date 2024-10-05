import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, router } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Select, Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";

export default function Create({ auth, product }) {
    const {
        data,
        setData,
        patch,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: product.data.name,
        sku: product.data.sku,
        price: product.data.price,
        stock: product.data.stock,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("products.update", product.data.id), {});
    };

    function deleteProduct(id) {
        if (confirm("Are you sure to delete this product?")) {
            router.delete(route("products.destroy", id));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Edit Product</h2>
                                <p>Update product data and information</p>
                            </div>
                            <div>
                                <DangerButton
                                    onClick={() =>
                                        deleteProduct(product.data.id)
                                    }
                                >
                                    Delete
                                </DangerButton>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form
                            onSubmit={submit}
                            className="mt-6 space-y-6 max-w-xl"
                        >
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="sku" value="SKU" />

                                <TextInput
                                    id="sku"
                                    className="mt-1 block w-full"
                                    value={data.sku}
                                    onChange={(e) =>
                                        setData("sku", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.sku}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price" />

                                <TextInput
                                    id="price"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                    inputMode="numeric"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />

                                <TextInput
                                    id="stock"
                                    className="mt-1 block w-full"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    required
                                    inputMode="numeric"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <SecondaryButton
                                    onClick={() => window.history.back()}
                                >
                                    Back
                                </SecondaryButton>
                                <PrimaryButton disabled={processing}>
                                    Update
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Updated.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
