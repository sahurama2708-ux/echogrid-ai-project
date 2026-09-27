export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-600">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}