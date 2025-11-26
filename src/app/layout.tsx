import "./global.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="min-h-screen flex">
          <aside className="w-64 border-r border-sidebar-border/40 bg-sidebar/80 backdrop-blur-xl px-6 py-8 flex flex-col">
            <div className="text-lg font-semibold tracking-tight text-white mb-6">
              Command Menu
            </div>
            <nav className="space-y-2 text-sm font-medium text-white/80">
              {[
                {
                  label: "ZRH60 Operations Console",
                  href: "/",
                },
                {
                  label: "New Tools ZRH",
                  href: "/new-tools",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg border border-white/5 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
