
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Sparkles,
  Package,
  Settings,
  Bell,
  Users,
  ShoppingBag,
  ChartNoAxesCombined,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RevenueChart from "./components/RevenueChart";
import OrdersTable from "./components/OrdersTable";

import { stats, orders } from "./data/dashboardData";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return orders;

    return orders.filter((order) =>
      [
        order.id,
        order.customer,
        order.email,
        order.product,
        order.status,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search]);

  const customers = useMemo(() => {
    return Array.from(
      new Map(orders.map((order) => [order.email, order])).values()
    );
  }, []);

  const products = [
    {
      name: "Starter Plan",
      price: "$99",
      description: "Perfect for individuals getting started.",
      color: "bg-blue-50 text-blue-600",
      icon: Package,
    },
    {
      name: "Pro Subscription",
      price: "$249",
      description: "Advanced tools for growing businesses.",
      color: "bg-orange-50 text-orange-600",
      icon: Sparkles,
    },
    {
      name: "Business Plan",
      price: "$499",
      description: "Powerful features for larger teams.",
      color: "bg-violet-50 text-violet-600",
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-64">
        <Header
          activePage={activePage}
          search={search}
          onSearch={setSearch}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {/* DASHBOARD */}
          {activePage === "Dashboard" && (
            <>
              <section className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-orange-600">
                    <Sparkles size={15} />
                    YOUR BUSINESS AT A GLANCE
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Welcome back, Admin 👋
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                    Here’s what’s happening with your business today. Let’s
                    make it a great one.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm">
                  <CalendarDays size={16} />
                  October 2026
                </div>
              </section>

              <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <StatCard key={stat.title} stat={stat} index={index} />
                ))}
              </section>

              <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="min-w-0 xl:col-span-2">
                  <RevenueChart />
                </div>

                <div className="rounded-2xl bg-[#111827] p-6 text-white shadow-lg shadow-slate-300/30">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-white/10 p-2.5 text-orange-400">
                      <Sparkles size={21} />
                    </span>

                    <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      +18.6%
                    </span>
                  </div>

                  <p className="mt-7 text-sm text-slate-400">Net Profit</p>
                  <h3 className="mt-2 text-4xl font-bold tracking-tight">
                    $32,840
                  </h3>

                  <p className="mt-2 text-xs text-slate-400">
                    Compared to the previous month
                  </p>

                  <div className="my-6 h-px bg-white/10" />

                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Monthly target</span>
                    <span className="font-semibold">78%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-orange-500" />
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                    <ArrowUpRight size={16} className="text-emerald-400" />
                    You’re doing great this month!
                  </div>
                </div>
              </section>

              <section className="mb-6">
                <OrdersTable orders={filteredOrders} />
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <ArrowUpRight size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Sales are growing
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Revenue is up compared with last month.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                    <ArrowDownRight size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Keep an eye on expenses
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Review spending to maintain your profit target.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ANALYTICS */}
          {activePage === "Analytics" && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Analytics Overview
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Track your business performance and financial growth.
                </p>
              </section>

              <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                  <StatCard key={stat.title} stat={stat} index={index} />
                ))}
              </section>

              <section className="mb-6">
                <RevenueChart />
              </section>

              <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">Revenue Growth</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    +24.8%
                  </h3>
                  <p className="mt-3 text-xs text-emerald-600">
                    <ArrowUpRight className="mr-1 inline" size={15} />
                    Compared to last year
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm text-slate-500">Expense Overview</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    $18,420
                  </h3>
                  <p className="mt-3 text-xs text-slate-500">
                    Total expenses in this demo
                  </p>
                </div>
              </section>
            </>
          )}

          {/* ORDERS */}
          {activePage === "Orders" && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Orders Management
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Review, search and export customer orders.
                </p>
              </section>

              <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Total Orders</p>
                  <p className="mt-2 text-3xl font-bold">{orders.length}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    {orders.filter((order) => order.status === "Completed").length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Pending</p>
                  <p className="mt-2 text-3xl font-bold text-amber-600">
                    {orders.filter((order) => order.status === "Pending").length}
                  </p>
                </div>
              </section>

              <OrdersTable orders={filteredOrders} />
            </>
          )}

          {/* PRODUCTS */}
          {activePage === "Products" && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Products & Plans
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Explore the subscription plans in this dashboard demo.
                </p>
              </section>

              <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => {
                  const Icon = product.icon;

                  return (
                    <article
                      key={product.name}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className={`mb-5 inline-flex rounded-xl p-3 ${product.color}`}>
                        <Icon size={24} />
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>

                      <p className="mt-6 text-3xl font-bold text-slate-900">
                        {product.price}
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          / plan
                        </span>
                      </p>

                      <div className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
                        Demo subscription product
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          )}

          {/* CUSTOMERS */}
          {activePage === "Customers" && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Customer Management
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Browse the customers represented in the demo orders.
                </p>
              </section>

              <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <Users className="mb-3 text-orange-500" size={22} />
                  <p className="text-sm text-slate-500">Total Customers</p>
                  <p className="mt-2 text-3xl font-bold">{customers.length}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <ShoppingBag className="mb-3 text-blue-500" size={22} />
                  <p className="text-sm text-slate-500">Orders Recorded</p>
                  <p className="mt-2 text-3xl font-bold">{orders.length}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <Bell className="mb-3 text-violet-500" size={22} />
                  <p className="text-sm text-slate-500">Data Source</p>
                  <p className="mt-2 text-xl font-bold">Demo Data</p>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {customers.map((customer) => (
                  <article
                    key={customer.email}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">
                        {customer.initials}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-900">
                          {customer.customer}
                        </h3>
                        <p className="truncate text-xs text-slate-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-xs text-slate-400">Latest Order</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {customer.id}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {customer.product}
                      </p>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}

          {/* SETTINGS */}
          {activePage === "Settings" && (
            <>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Settings
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Manage your demo workspace preferences.
                </p>
              </section>

              <SettingsPanel />
            </>
          )}

          <footer className="mt-8 flex flex-wrap justify-between gap-2 border-t border-slate-200 pt-5 text-[11px] text-slate-400">
            <p>© 2026 NEXORA Dashboard. Portfolio demo.</p>
            <p>Designed with React & Tailwind CSS</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [workspace, setWorkspace] = useState("NEXORA");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [message, setMessage] = useState("");

  function handleSave(event) {
    event.preventDefault();
    setMessage("Demo preferences updated in this session.");
  }

  return (
    <form
      onSubmit={handleSave}
      className="max-w-2xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
          <Settings size={22} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">General Preferences</h3>
          <p className="mt-1 text-xs text-slate-500">
            Customize your dashboard workspace.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="workspace" className="mb-2 block text-sm font-semibold text-slate-700">
          Workspace Name
        </label>
        <input
          id="workspace"
          value={workspace}
          onChange={(event) => setWorkspace(event.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Email Notifications
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Toggle demo notification preferences.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={emailNotifications}
          onClick={() => setEmailNotifications((previous) => !previous)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            emailNotifications ? "bg-orange-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
              emailNotifications ? "left-6" : "left-1"
            }`}
          />
        </button>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
      >
        Save Preferences
      </button>

      {message && (
        <p role="status" className="text-sm text-emerald-600">
          {message}
        </p>
      )}

      <p className="text-xs leading-5 text-slate-400">
        This is a front-end demo. Preferences are not stored in a database.
      </p>
    </form>
  );
}
