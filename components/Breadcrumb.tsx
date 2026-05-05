import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Server-rendered breadcrumb component.
 * Generates crawler-visible HTML anchor tags on every page it's used on,
 * ensuring Ahrefs and Google can attribute outgoing internal links.
 */
export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`w-full px-2 md:px-4 lg:px-[60px] py-1 md:py-3 bg-white border-b border-gray-100 ${className}`}
    >
      <ol
        className="flex flex-nowrap items-center gap-0.5 md:gap-1 overflow-hidden whitespace-nowrap text-[11px] md:text-sm leading-none md:leading-normal text-gray-500 max-w-8xl mx-auto"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={item.href}
              className="flex min-w-0 items-center gap-0.5 md:gap-1"
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              {index > 0 && (
                <ChevronRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gray-400 flex-shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="text-gray-700 font-medium truncate max-w-[120px] md:max-w-[200px]"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#D52128] transition-colors truncate max-w-[90px] md:max-w-[180px]"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
