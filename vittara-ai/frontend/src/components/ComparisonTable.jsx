import React from "react";

/**
 * Generic comparison table for loan or insurance options.
 * rows: [{ label, values: [v1, v2, ...] }]
 * headers: [name1, name2, ...]
 */
export default function ComparisonTable({ headers, rows }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-navy/10">
            <th className="text-left font-medium text-navy/50 px-5 py-4">Feature</th>
            {headers.map((h) => (
              <th key={h} className="text-left font-display font-semibold text-navy px-5 py-4">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-navy/[0.02]" : ""}>
              <td className="px-5 py-3 text-navy/60 font-medium">{row.label}</td>
              {row.values.map((v, idx) => (
                <td key={idx} className="px-5 py-3 text-navy">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
