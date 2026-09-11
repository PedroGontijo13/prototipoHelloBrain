import { Check, Minus } from "lucide-react";
import { compare } from "@/lib/proto2-data";

/**
 * Desktop keeps the classic table. On mobile a horizontally-scrolling table is a
 * common antipattern (the extra column is easy to miss) — Gray Matter / Gruns
 * both restructure comparisons as stacked, single-column cards on small screens.
 */
export default function CompareTable() {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border-2 border-foreground bg-card shadow-pop-card md:block">
        <table className="w-full min-w-[520px] border-collapse font-body text-sm">
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="p-4 text-left font-body text-xs font-bold uppercase text-foreground/50">&nbsp;</th>
              <th className="bg-accent/10 p-4 text-left font-heading text-base font-extrabold text-accent">
                Hellobrain
              </th>
              <th className="p-4 text-left font-heading text-base font-bold text-foreground/70">Café + energético</th>
            </tr>
          </thead>
          <tbody>
            {compare.map((r) => (
              <tr key={r.k} className="border-b border-foreground/10 last:border-0">
                <th scope="row" className="p-4 text-left font-body font-semibold text-foreground">
                  {r.k}
                </th>
                <td className="bg-accent/5 p-4 font-semibold text-foreground">{r.hb}</td>
                <td className="p-4 text-foreground/70">{r.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {compare.map((r) => (
          <div key={r.k} className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-pop-card">
            <span className="mb-3 block font-body text-xs font-bold uppercase tracking-wide text-foreground/50">
              {r.k}
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 rounded-md bg-accent/10 p-2">
                <Check size={16} className="mt-0.5 flex-none text-accent" />
                <div>
                  <span className="block font-heading text-xs font-bold uppercase text-accent">Hellobrain</span>
                  <span className="font-body text-sm font-semibold text-foreground">{r.hb}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2">
                <Minus size={16} className="mt-0.5 flex-none text-foreground/40" />
                <div>
                  <span className="block font-heading text-xs font-bold uppercase text-foreground/50">
                    Café + energético
                  </span>
                  <span className="font-body text-sm text-foreground/70">{r.other}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
