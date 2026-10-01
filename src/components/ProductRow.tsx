import type { Product } from "../types";

interface ProductRowProps {
  product: Product;
  onAdd?: (product: Product) => void;
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

export function ProductRow({ product, onAdd }: ProductRowProps) {
  const isAvailable = product.available;

  return (
    <article
      className={`flex gap-5 py-6 border-b border-vg-border last:border-b-0 ${
        !isAvailable ? "opacity-55" : ""
      }`}
    >
      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-vg-surface-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-vg-muted/40">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-vg-text leading-tight">
            {product.name}
          </h3>
          <span className="text-base sm:text-lg font-semibold text-vg-text whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-sm text-vg-muted leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2 text-xs">
            {product.isVegetarian && (
              <span className="inline-flex items-center gap-1.5 text-vg-secondary">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15c-.28 0-.53-.11-.71-.29L7.3 13.7a.996.996 0 111.41-1.41L11 14.59l4.29-4.29a.996.996 0 111.41 1.41l-5 5c-.18.18-.43.29-.7.29z" />
                </svg>
                Vegetariana
              </span>
            )}
            {!isAvailable && (
              <span className="font-semibold uppercase tracking-wider text-vg-error">
                Esaurito
              </span>
            )}
          </div>

          <button
            onClick={() => onAdd?.(product)}
            disabled={!isAvailable}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
              isAvailable
                ? "bg-vg-accent text-white hover:bg-[#A9573A] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-vg-accent focus-visible:outline-offset-2 shadow-sm"
                : "bg-vg-surface-muted text-vg-muted cursor-not-allowed"
            }`}
          >
            {isAvailable ? "+ Aggiungi" : "Esaurito"}
          </button>
        </div>
      </div>
    </article>
  );
}
