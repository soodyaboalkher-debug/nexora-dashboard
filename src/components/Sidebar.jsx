
import {
  LayoutDashboard, ChartNoAxesCombined, ShoppingBag,
  Package, Users, Settings, HelpCircle, Zap, X
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Orders", icon: ShoppingBag },
  { label: "Products", icon: Package },
  { label: "Customers", icon: Users },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close menu overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#111827] text-white transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
              <Zap size={23} fill="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">NEXORA</h2>
              <p className="text-[10px] tracking-[3px] text-gray-400">CONTROL CENTER</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
            <X size={22} />
          </button>
        </div>

        <div className="px-4 pt-8">
          <p className="mb-4 px-3 text-[10px] font-bold tracking-[2px] text-gray-500">
            WORKSPACE
          </p>

          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  onNavigate(label);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  activePage === label
                    ? "bg-orange-500 font-semibold text-white shadow-lg shadow-orange-950/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {label}
                {label === "Orders" && (
                  <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 text-xs">8</span>
                )}
              </button>
            ))}
          </nav>

          <p className="mb-4 mt-9 px-3 text-[10px] font-bold tracking-[2px] text-gray-500">
            PREFERENCES
          </p>

          <button
            onClick={() => {
              onNavigate("Settings");
              onClose();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
              activePage === "Settings"
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={19} /> Settings
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400">
              <HelpCircle size={20} />
            </div>
            <h3 className="text-sm font-semibold">Need assistance?</h3>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              Our support team is here to help.
            </p>
            <button
              onClick={() => window.open("mailto:support@example.com")}
              className="mt-3 w-full rounded-lg border border-white/10 py-2 text-xs font-medium hover:bg-white/10"
            >
              Contact Support
            </button>
          </div>
          <p className="mt-5 text-center text-[10px] text-gray-500">
            NEXORA DASHBOARD · v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
