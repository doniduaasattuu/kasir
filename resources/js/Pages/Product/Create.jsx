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

export default function Create({ auth }) {
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("products.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
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
                    {/* <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-scroll p-6 text-gray-900 dark:text-gray-300">
                            <div>Hello world</div>
                        </div>
                    </div> */}

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
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Saved.
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
