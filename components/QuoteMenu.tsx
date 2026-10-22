"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

export type PriceGroup = {
  key: string;
  name: string;
  items: { name: string; range: string }[];
};

/**
 * The live thing on the home page: pick a treatment category, read its real
 * indicative prices. Without JavaScript every category is visible (the
 * default state), so nothing is hidden from readers or crawlers.
 */
export default function QuoteMenu({
  groups,
  labels,
}: {
  groups: PriceGroup[];
  labels: { all: string; request: string };
}) {
  const [active, setActive] = useState<string | null>(null);

  const tabs = [{ key: "__all", name: labels.all }, ...groups];

  return (
    <div>
      {/* category switcher — plain text links, the active one underlined */}
      <div className="flex flex-wrap gap-x-7 gap-y-2" role="tablist" aria-label={labels.all}>
        {tabs.map((tab) => {
          const isActive = active === tab.key || (active === null && tab.key === "__all");
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.key === "__all" ? null : tab.key)}
              className={`text-[18px] transition-colors ${
                isActive
                  ? "font-bold text-ink underline decoration-cta decoration-[3px] underline-offset-[6px]"
                  : "font-semibold text-body/70 hover:text-ink"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* the menu itself */}
      <div className="mt-10 space-y-12">
        {groups.map((group) => {
          const hidden = active !== null && active !== group.key;
          return (
            <section key={group.key} hidden={hidden} aria-label={group.name}>
              <h3 className="text-[24px] font-extrabold tracking-tight text-ink">{group.name}</h3>
              <ul className="mt-4">
                {group.items.map((item, i) => (
                  <li
                    key={item.name}
                    className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-3 py-3.5 ${
                      i % 2 === 1 ? "bg-brand-soft" : ""
                    }`}
                  >
                    <span className="text-[18px] text-ink">{item.name}</span>
                    <span className="text-[18px] font-bold tabular-nums text-brand">
                      {item.range}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <Link
        href="/consultation"
        className="mt-10 inline-block text-[18px] font-bold text-ink underline decoration-cta decoration-[3px] underline-offset-[6px] transition-colors hover:text-brand"
      >
        {labels.request}
      </Link>
    </div>
  );
}
