import Alert from "@/Components/Alert";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { rupiah } from "@/Utils/helper";
import { Head, Link, router } from "@inertiajs/react";

export default function Transaction({ auth, transactions }) {
    const isAdmin = auth.user.role_id == 1 ?? false;
    function createNewTransaction() {
        router.get(route("transactions.create"));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <div>
                                <h2>Transactions</h2>
                                <p>A transactions history</p>
                            </div>
                            <div>
                                <PrimaryButton
                                    onClick={() => createNewTransaction()}
                                >
                                    New
                                </PrimaryButton>
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
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Total</th>
                                        <th>Created by</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.data.map((transaction) => {
                                        return (
                                            <tr
                                                key={transaction.id}
                                                className="hover"
                                            >
                                                <th>
                                                    <Link
                                                        href={
                                                            isAdmin
                                                                ? route(
                                                                      "transactions.edit",
                                                                      transaction.id
                                                                  )
                                                                : undefined
                                                        }
                                                        className={
                                                            isAdmin
                                                                ? "link underline-offset-2 hover:text-blue-500"
                                                                : undefined
                                                        }
                                                    >
                                                        {transaction.id}
                                                    </Link>
                                                </th>
                                                <td>
                                                    {rupiah(transaction.total)}
                                                </td>
                                                <td>
                                                    {transaction.created_by}
                                                </td>
                                                <td>
                                                    {transaction.created_at}
                                                </td>
                                                <td>
                                                    <Link
                                                        className="text-sm p-2 text-blue-500"
                                                        href={route(
                                                            "transactions.show",
                                                            transaction.id
                                                        )}
                                                    >
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {transactions.meta.links.length > 3 && (
                        <Pagination meta={transactions.meta} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
