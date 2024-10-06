import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, Link, router } from "@inertiajs/react";

export default function Transaction({ auth, transaction }) {
    const isAdmin = auth.user.role_id == 1 ?? false;
    const cash = transaction.data.cash;
    const change = transaction.data.change;

    return (
        <AuthenticatedLayout>
            <Head title="Transaction details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Transaction details</h2>
                                <p className="opacity-50">{transaction.data.created_at}</p>
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

                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="overflow-x-auto p-6 text-gray-900 dark:text-gray-300">
                            <table className="table min-w-max">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product name</th>
                                        <th>Quantity</th>
                                        <th>@Price</th>
                                        <th>Total</th>
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
                                                        {detail.product?.name ?? <span className="text-red-500">[Product deleted]</span>}
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
                                    <tr key="total">
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
                                    <tr key="cash">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right">
                                            Cash
                                        </td>
                                        <td>
                                            {rupiah(cash)}
                                        </td>
                                    </tr>
                                    <tr key="change">
                                        <td className="opacity-50 w-16">Cashier:</td>
                                        <td className="opacity-50">{transaction.data.created_by}</td>
                                        <td></td>
                                        <td className="text-right">
                                            Change
                                        </td>
                                        <td>
                                            {rupiah(change)}
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
