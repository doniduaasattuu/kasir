import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useEffect, useMemo, useRef } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard({
    auth,
    transactions,
    start_date,
    end_date,
}) {
    const urlParams = new URLSearchParams(window.location.search);
    const [startDate, setStartDate] = useState(
        urlParams.get("start_date") ?? start_date
    );
    const [endDate, setEndDate] = useState(
        urlParams.get("end_date") ?? end_date
    );
    const initialRender = useRef(true);

    let dashboardUrl = useMemo(() => {
        const url = new URL(route("dashboard"));

        if (startDate) {
            url.searchParams.append("start_date", startDate);
        }

        if (endDate) {
            url.searchParams.append("end_date", endDate);
        }

        return url.href;
    }, [startDate, endDate]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        // console.log(dashboardUrl);
        router.visit(dashboardUrl, {
            replace: true,
        });
    }, [dashboardUrl]);

    const data = transactions.data.map((t) => {
        return {
            name: t.created_at,
            Transaction: t.total,
        };
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 overflow-x-auto sm:px-0 flex space-x-4">
                        <div>
                            <InputLabel for="periodic" value="Periodic" />
                            <SelectInput
                                className="mt-1"
                                id="periodic"
                                options={[
                                    {
                                        value: "daily",
                                        label: "Daily",
                                    },
                                ]}
                            />
                        </div>

                        <div>
                            <InputLabel for="start_date" value="Start date" />
                            <TextInput
                                className="mt-1"
                                id="start_date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date"
                            />
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5 self-center mt-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <InputLabel for="end_date" value="End date" />
                            <TextInput
                                className="mt-1"
                                id="end_date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                    width={730}
                                    height={250}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="Transaction"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#82ca9d"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                        dataKey="name"
                                    />
                                    <Legend verticalAlign="top" height={44} />
                                    <YAxis
                                        tick={{
                                            fontSize: 11,
                                        }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip
                                        wrapperStyle={{
                                            fontSize: 13,
                                            color: "black",
                                        }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    <Area
                                        type="monotone"
                                        dataKey="Transaction"
                                        stroke="#82ca9d"
                                        fillOpacity={1}
                                        fill="url(#Transaction)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
