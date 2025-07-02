export default function PackageCard({ price, selected, onSelect }) {
  const isActive = selected === price;

  return (
    <button
      onClick={() => onSelect(price)}
      className={`
    border rounded-lg p-4 flex flex-col items-center justify-center transition shadow-md hover:shadow-lg
    ${isActive
      ? 'bg-blue-600 text-white dark:bg-blue-700'
      : 'bg-white text-gray-900 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'}
  `}
    >
      <span className="text-lg font-semibold">Rp {price.toLocaleString('id-ID')}</span>
      <span className="text-sm mt-1">Paket {price / 1000}K</span>
    </button>
  );
}
