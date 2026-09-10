import Link from "next/link";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-border">
          <span className="text-xl font-bold">Admin<span className="text-primary">Panel</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/quotes" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-surface-hover rounded-lg font-medium transition-colors">
            <FileText className="w-5 h-5" /> Quotes
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-surface-hover rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-surface-hover rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold">
              JD
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
