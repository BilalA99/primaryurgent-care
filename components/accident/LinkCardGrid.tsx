import Link from "next/link";

type Item = { href: string; title: string; desc?: string };

export default function LinkCardGrid({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className="group block rounded-xl border-2 border-[#D52128] bg-gradient-to-br from-[#D52128] to-[#b81b22] p-8 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-[#a0171a] focus:outline-none focus:ring-4 focus:ring-[#D52128]/30 transform hover:-translate-y-1 h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{it.title}</h3>
                </div>
                {/* arrow icon */}
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10 10.293 6.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </span>
              </div>
              {it.desc && (
                <div className="flex-1 flex items-end">
                  <p className="text-sm text-white/90 leading-relaxed">{it.desc}</p>
                </div>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
