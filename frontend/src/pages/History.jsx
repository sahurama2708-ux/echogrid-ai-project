import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function History({ historyList }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-100">Scan History</h2>
        <p className="text-xs text-slate-400">View and manage your previous scans.</p>
      </div>

      <div className="bg-cardBg border border-cardBorder rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cardBorder text-[10px] text-slate-400 uppercase bg-slate-900/60 tracking-wider">
                <th className="py-3.5 px-5">Image</th>
                <th className="py-3.5 px-5">Result</th>
                <th className="py-3.5 px-5">Confidence</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cardBorder text-xs">
              {historyList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-5">
                    <div className="w-10 h-7 rounded-lg bg-slate-900 border border-cardBorder flex items-center justify-center text-[9px] text-slate-500">IMG</div>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium ${
                      row.type === 'high' ? 'bg-rose-950/50 text-rose-400 border border-rose-900/40' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/40'
                    }`}>
                      {row.type === 'high' ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {row.result}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-200 font-semibold">{row.confidence}</td>
                  <td className="py-3 px-5 text-slate-400">{row.date}</td>
                  <td className="py-3 px-5 text-right">
                    <button className="px-3 py-1.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-900/40 hover:bg-blue-600 hover:text-white transition text-xs font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}