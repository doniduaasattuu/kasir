import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { rupiah } from "@/Utils/helper";

export default function Create({ auth }) {
    // SCANNER
    const [scannedProducts, setScannedProducts] = useState([]);

    useEffect(() => {
        // Initialize QR code scanner
        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 1, // Frames per second for the scanner
            qrbox: { width: 300, height: 250 }, // QR scanning box dimensions
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
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    // useEffect(() => {
    //     console.log("Scanned products updated: ", scannedProducts);
    // }, [scannedProducts]);

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

    // SUBMIT
    function submit(e) {
        e.preventDefault();

        router.post(route("transactions.store"), {
            data: scannedProducts,
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
                        id="qr-reader"
                    ></div>

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
                                                        <td className="space-x-4 w-48">
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
                                                        <td className="w-40">
                                                            {rupiah(
                                                                product.subTotal
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton>Save</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
