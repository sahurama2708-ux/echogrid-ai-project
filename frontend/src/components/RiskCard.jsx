export default function RiskCard({ prediction, confidence, risk }) {
  const color =
    risk === "High"
      ? "bg-red-100 text-red-600"
      : risk === "Medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div className={`rounded-2xl p-6 ${color}`}>
      <h2 className="text-2xl font-bold">{prediction}</h2>
      <p className="mt-2">Confidence: {confidence}%</p>
      <p className="font-semibold">Risk: {risk}</p>
    </div>
  );
}