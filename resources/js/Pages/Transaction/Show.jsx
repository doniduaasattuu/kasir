import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, Link, router } from "@inertiajs/react";

export default function Transaction({ auth, transaction }) {
    const isAdmin = auth.user.role_id == 1 ?? false;

    console.log(transaction.data.transaction_details);
    // function createNewTransaction() {
    //     router.get(route("transactions.create"));
    // }

    return (
        <AuthenticatedLayout>
            <Head title="Transaction details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Transaction details</h2>
                                <p>The details of transaction</p>
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

                    {/* <div className="px-4 sm:px-0 flex space-x-4">
                        <TextInput
                            id="search"
                            className="mt-1 block w-sm"
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            placeholder="Search transaction data..."
                        />

                        <Link className="text-blue-500 text-sm self-center">
                            Refresh
                        </Link>
                    </div> */}

                    {/* {alert && <Alert alert={alert} />} */}

                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-scroll p-6 text-gray-900 dark:text-gray-300">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaction.data.transaction_details.map(
                                        (detail) => {
                                            const subTotal =
                                                detail.quantity * detail.price;

                                            return (
                                                <tr
                                                    key={detail.id}
                                                    className="hover"
                                                >
                                                    <th>{detail.id}</th>
                                                    <td>
                                                        {detail.product.name}
                                                    </td>
                                                    <td>
                                                        {detail.quantity} Pcs
                                                    </td>
                                                    <td>
                                                        {rupiah(detail.price)}
                                                    </td>
                                                    <td>{rupiah(subTotal)}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="font-semibold text-right">
                                            Total
                                        </td>
                                        <td className="font-semibold text-green-500">
                                            {rupiah(transaction.data.total)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
