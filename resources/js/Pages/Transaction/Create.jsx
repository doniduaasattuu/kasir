import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { rupiah } from "@/Utils/helper";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    // SCANNER
    const [scannedProducts, setScannedProducts] = useState([]);
    const [productNotFound, setProductNotFound] = useState(false);
    const [amount, setAmount] = useState(0);
    const [cash, setCash] = useState(0);
    const [change, setChange] = useState(0);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 1,
            qrbox: { width: 300, height: 250 },
        });

        scanner.render(onScanSuccess);

        return () => {
            scanner.clear();
        };
    }, []);

    let onScanSuccess = (decodedText) => {
        axios
            .get(`/products?sku=${decodedText}`)
            .then((response) => {
                setProductNotFound(false);

                if (response.data.id != null) {
                    const product = {
                        id: response.data.id,
                        sku: response.data.sku,
                        name: response.data.name,
                        price: response.data.price,
                        quantity: 1,
                        subTotal: response.data.price,
                    };

                    setScannedProducts((prevProducts) => {
                        const existingProduct = prevProducts.find(
                            (p) => p.sku === product.sku
                        );

                        if (existingProduct) {
                            return prevProducts.map((p) =>
                                p.sku === product.sku
                                    ? {
                                        ...p,
                                        quantity: p.quantity + 1,
                                        subTotal: (p.quantity + 1) * p.price,
                                    }
                                    : p
                            );
                        } else {
                            return [...prevProducts, product];
                        }
                    });
                } else {
                    setProductNotFound(true)
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    function decrementQty(id) {
        setScannedProducts(
            scannedProducts.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        quantity:
                            product.quantity > 1
                                ? (product.quantity -= 1)
                                : product.quantity,
                        subTotal:
                            product.quantity >= 1
                                ? product.quantity * product.price
                                : product.subTotal,
                    }
                    : product
            )
        );
    }

    function incrementQty(id) {
        setScannedProducts(
            scannedProducts.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        quantity: (product.quantity += 1),
                        subTotal: product.quantity * product.price,
                    }
                    : product
            )
        );
    }

    function deleteProductFromCart(id) {
        setScannedProducts(p => p.filter(p => p.id != id));
    }

    useEffect(() => {
        let total = 0
        scannedProducts.map((p) => {
            total += p.subTotal;
        })

        setAmount(total);
    }, [scannedProducts])

    useEffect(() => {
        const change = cash - amount;
        setChange(change)
    }, [cash, scannedProducts]);

    // SUBMIT
    const submit = (e) => {
        e.preventDefault();

        router.post(route("transactions.store"), {
            data: scannedProducts,
            cash: Number(cash),
            change: Number(change),
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="New Transaction" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>New Transaction</h2>
                                <p>Create new sales transaction</p>
                            </div>
                            <div>
                                <SecondaryButton
                                    onClick={() => window.history.back()}
                                >
                                    Back
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>



                    <div
                        className="text-center shadow border border-neutral-600/40 w-[300px] mx-auto"
                    >
                        <div>
                            Scan QR Product
                        </div>
                        <div id="qr-reader"></div>
                    </div>

                    {productNotFound &&
                        <div role="alert" className="alert alert-error rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Product not found</span>
                        </div>}

                    {scannedProducts.length > 0 && (
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>SKU</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scannedProducts.map(
                                                (product, index) => (
                                                    <tr key={index}>
                                                        <th>{index + 1}</th>
                                                        <th>{product.sku}</th>
                                                        <td>{product.name}</td>
                                                        <td>
                                                            {rupiah(
                                                                product.price
                                                            )}
                                                        </td>
                                                        <td className="space-x-4 min-w-44">
                                                            <SecondaryButton
                                                                onClick={() =>
                                                                    decrementQty(
                                                                        product.id
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </SecondaryButton>
                                                            <span>
                                                                {
                                                                    product.quantity
                                                                }
                                                            </span>
                                                            <SecondaryButton
                                                                onClick={() =>
                                                                    incrementQty(
                                                                        product.id
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </SecondaryButton>
                                                        </td>
                                                        <td className="min-w-36">
                                                            {rupiah(
                                                                product.subTotal
                                                            )}
                                                        </td>
                                                        <td
                                                            className="cursor-pointer text-red-500"
                                                            onClick={() => deleteProductFromCart(product.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                            </svg>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr key="amount">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="font-semibold text-right">Amount:</td>
                                                <td className="text-orange-500">{rupiah(amount)}</td>
                                                <td></td>
                                            </tr>
                                            <tr key="cash">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="font-semibold text-right">Cash:</td>
                                                <td>
                                                    <TextInput
                                                        className="w-full"
                                                        value={cash}
                                                        onChange={(e) => setCash(e.target.value)}
                                                        onFocus={(e) => {
                                                            if (e.target.value.length <= 1) {
                                                                e.target.value = ''
                                                            }
                                                        }}
                                                    /></td>
                                                <td>IDR</td>
                                            </tr>
                                            <tr key="change">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="font-semibold text-right w-40">Change:</td>
                                                <td>{rupiah(change)}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton
                                        disabled={cash == 0}
                                    >Save</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
