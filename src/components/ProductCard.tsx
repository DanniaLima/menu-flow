import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isAvailable = product.available;

  return (
    <div
      className={`group bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 transition-all duration-200 ${
        isAvailable
          ? "hover:border-slate-600 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/50"
          : "opacity-60"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-semibold tracking-tight text-slate-100 leading-tight">
            {product.name}
          </h3>
          {!isAvailable && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 whitespace-nowrap">
              Esaurito
            </span>
          )}
        </div>

        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="text-lg font-bold text-blue-400">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={() => onAdd?.(product)}
            disabled={!isAvailable}
            className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
              isAvailable
                ? "bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            {isAvailable ? "+ Aggiungi" : "Esaurito"}
          </button>
        </div>
      </div>
    </div>
  );
}
