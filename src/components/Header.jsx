
import { Search, Bell, Menu, ChevronDown } from "lucide-react";

export default function Header({ onMenuClick, search, onSearch, activePage }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <p className="hidden text-xs text-slate-400 sm:block">Workspace / Overview</p>
          <h1 className="truncate text-lg font-bold text-slate-800 sm:mt-1 sm:text-xl">
            {activePage}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <label className="hidden h-10 w-44 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 md:flex xl:w-64">
          <Search size={17} className="shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
          />
        </label>

        <button aria-label="Notifications" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-700">
            SA
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-800">Admin User</p>
            <p className="mt-0.5 text-[10px] text-slate-400">Administrator</p>
          </div>
          <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
