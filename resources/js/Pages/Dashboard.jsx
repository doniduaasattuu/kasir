import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { date } from "@/Utils/helper";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Dashboard({ auth, transactions, start_date, end_date }) {
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);

    const data = transactions.data.map((t) => {
        return {
            name: t.created_at,
            total: t.total,
        };
    })

    // const data = [
    //     {
    //         "name": "Page A",
    //         "uv": 4000,
    //         "pv": 2400,
    //         "amt": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "uv": 3000,
    //         "pv": 1398,
    //         "amt": 2210
    //     },
    //     {
    //         "name": "Page C",
    //         "uv": 2000,
    //         "pv": 9800,
    //         "amt": 2290
    //     },
    //     {
    //         "name": "Page D",
    //         "uv": 2780,
    //         "pv": 3908,
    //         "amt": 2000
    //     },
    //     {
    //         "name": "Page E",
    //         "uv": 1890,
    //         "pv": 4800,
    //         "amt": 2181
    //     },
    //     {
    //         "name": "Page F",
    //         "uv": 2390,
    //         "pv": 3800,
    //         "amt": 2500
    //     },
    //     {
    //         "name": "Page G",
    //         "uv": 3490,
    //         "pv": 4300,
    //         "amt": 2100
    //     }
    // ]

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

                    <div className="px-4 sm:px-0 flex space-x-4">
                        <div>
                            <InputLabel
                                for="periodic"
                                value="Periodic"
                            />
                            <SelectInput
                                id="periodic"
                                options={[
                                    {
                                        value: 'daily',
                                        label: 'Daily',
                                    },
                                    // {
                                    //     value: 'monthly',
                                    //     label: 'Monthly',
                                    // },
                                ]}
                            />
                        </div>

                        <div>
                            <InputLabel
                                for="start_date"
                                value='Start date'
                            />
                            <TextInput
                                id="start_date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="date" />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 self-center mt-4">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <InputLabel
                                for="end_date"
                                value='End date'
                            />
                            <TextInput
                                id="end_date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                disabled
                                type="date" />
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart width={730} height={250} data={data}
                                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient> */}
                                        {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient> */}
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        tickMargin={12}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                        dataKey="name"
                                    />
                                    <YAxis
                                        tick={{
                                            fontSize: 11,
                                        }}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Tooltip />
                                    {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
                                    {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                                    <Area type="monotone" dataKey="total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTotal)" />
                                </AreaChart>

                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
