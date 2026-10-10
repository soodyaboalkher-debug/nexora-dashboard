
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { revenueData } from "../data/dashboardData";
import { MoreHorizontal } from "lucide-react";

export default function RevenueChart() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Revenue Overview</h2>
          <p className="mt-1 text-xs text-slate-400">Revenue and expenses throughout the year</p>
        </div>
        <button aria-label="Chart options" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="mt-6 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eef2f7" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Legend verticalAlign="top" align="right" height={35} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#f97316" strokeWidth={2.5} fill="url(#revenueGradient)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#94a3b8" strokeWidth={2} fill="url(#expensesGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
