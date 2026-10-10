
import { ArrowUpRight, DollarSign, ShoppingCart, Users, Percent } from "lucide-react";

const icons = {
  revenue: DollarSign,
  orders: ShoppingCart,
  customers: Users,
  conversion: Percent,
};

export default function StatCard({ stat, index }) {
  const Icon = icons[stat.icon];

  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {stat.value}
          </h3>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          index === 0 ? "bg-orange-50 text-orange-600" :
          index === 1 ? "bg-blue-50 text-blue-600" :
          index === 2 ? "bg-violet-50 text-violet-600" :
          "bg-emerald-50 text-emerald-600"
        }`}>
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-1 text-xs font-semibold text-emerald-600">
          <ArrowUpRight size={14} /> {stat.change}
        </span>
        <span className="text-xs text-slate-400">vs last month</span>
      </div>
    </article>
  );
}
