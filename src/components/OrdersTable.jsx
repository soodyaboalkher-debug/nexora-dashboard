
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";

export default function OrdersTable({ orders }) {
  const statusStyles = {
    Completed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-rose-50 text-rose-700",
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
        <div>
          <h2 className="font-bold text-slate-900">Recent Orders</h2>
          <p className="mt-1 text-xs text-slate-400">Track your latest transactions</p>
        </div>
        <button
          onClick={() => {
            const csv = [
              ["Order ID", "Customer", "Product", "Date", "Amount", "Status"],
              ...orders.map((o) => [o.id, o.customer, o.product, o.date, o.amount, o.status]),
            ].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

            const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "nexora-orders.csv";
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4 font-semibold">Order</th>
              <th className="px-4 py-4 font-semibold">Customer</th>
              <th className="px-4 py-4 font-semibold">Product</th>
              <th className="px-4 py-4 font-semibold">Amount</th>
              <th className="px-4 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order, index) => (
              <tr key={order.id} className="transition hover:bg-slate-50/80">
                <td className="px-6 py-4 text-xs font-semibold text-slate-700">{order.id}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      index % 2 === 0 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
                    }`}>
                      {order.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{order.customer}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{order.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-xs text-slate-500">{order.product}</td>
                <td className="px-4 py-4 text-xs font-bold text-slate-800">{order.amount}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${statusStyles[order.status]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">
                  No orders match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-4 text-xs text-slate-400 sm:px-6">
        <span>Showing {orders.length} orders</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <ArrowUpRight size={14} /> Live demo data
        </span>
      </div>
    </section>
  );
}
