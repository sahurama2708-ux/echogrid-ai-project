import React, { useEffect, useState } from 'react';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ total_scanned: 0, cracks_detected: 0, high_risk: 0, safe_structures: 0 });
  const [graphData, setGraphData] = useState({ timestamps: [], stress_levels: [], cracks_detected: [] });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:8000/analytics-data');
      const data = await response.json();
      
      if (data && data.success) {
        setStats(data.stats);
        // Ensure arrays are valid
        setGraphData({
          timestamps: data.graph?.timestamps || [],
          stress_levels: data.graph?.stress_levels || [],
          cracks_detected: data.graph?.cracks_detected || []
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Har 1 second mein auto-sync hoga
    const interval = setInterval(fetchAnalytics, 1000);
    return () => clearInterval(interval);
  }, []);

  // Safe SVG calculation
  const maxStress = 100;
  const stressArr = graphData.stress_levels || [];
  const points = stressArr.map((val, index) => {
    const x = (index / (Math.max(stressArr.length - 1, 1))) * 500;
    const y = 150 - ((val || 0) / maxStress) * 130;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="p-6 space-y-6 text-white bg-slate-950 min-h-screen">
      <h2 className="text-2xl font-bold">Live Structural Analytics & Graph</h2>
      
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">Total Scanned</p>
          <h3 className="text-2xl font-bold">{stats.total_scanned}</h3>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">Cracks Detected</p>
          <h3 className="text-2xl font-bold text-red-400">{stats.cracks_detected}</h3>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">High Risk</p>
          <h3 className="text-2xl font-bold text-orange-400">{stats.high_risk}</h3>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">Safe Structures</p>
          <h3 className="text-2xl font-bold text-emerald-400">{stats.safe_structures}</h3>
        </div>
      </div>

      {/* Real Visual SVG Graph Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Live Stress Levels Trend (Graph & History)</h3>
        
        <div className="relative w-full overflow-x-auto bg-slate-950/50 p-4 rounded-lg border border-slate-800">
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading live analytics...</div>
          ) : stressArr.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No prediction history available yet. Try running a prediction!</div>
          ) : (
            <>
              <svg viewBox="0 0 500 160" className="w-full h-48 overflow-visible">
                {/* Background Grid Lines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#334155" strokeDasharray="4" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#334155" strokeDasharray="4" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#334155" strokeDasharray="4" />

                {/* Line Graph Path */}
                {stressArr.length > 1 && (
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    points={points}
                  />
                )}

                {/* Data Points & Values */}
                {stressArr.map((val, index) => {
                  const x = (index / (Math.max(stressArr.length - 1, 1))) * 500;
                  const y = 150 - ((val || 0) / maxStress) * 130;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="4" fill="#38bdf8" />
                      <text x={x} y={y - 10} fill="#94a3b8" fontSize="10" textAnchor="middle">{val}%</text>
                    </g>
                  );
                })}
              </svg>

              {/* Timestamps X-Axis */}
              <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                {(graphData.timestamps || []).map((t, idx) => (
                  <span key={idx}>{t}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}