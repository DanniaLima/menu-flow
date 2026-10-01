import type { CartItem } from "../types";

interface CartPanelProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onSendOrder: () => void;
}

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

export function CartPanel({
  isOpen,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onSendOrder,
}: CartPanelProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-vg-text/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-vg-bg z-50 transform transition-transform duration-300 flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between p-6 border-b border-vg-border">
          <div>
            <h2 className="text-lg font-semibold text-vg-text tracking-tight">
              Il tuo ordine
            </h2>
            <p className="text-vg-muted text-xs mt-0.5">
              {itemCount} {itemCount === 1 ? "articolo" : "articoli"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-vg-muted hover:text-vg-text transition-colors p-2 rounded-full hover:bg-vg-surface-muted"
            aria-label="Chiudi"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-vg-text text-sm font-medium mb-1">
                Il carrello è vuoto
              </p>
              <p className="text-vg-muted text-xs">
                Aggiungi qualcosa dal menu
              </p>
            </div>
          ) : (
            <div className="divide-y divide-vg-border">
              {items.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-sm font-semibold text-vg-text flex-1">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-vg-muted hover:text-vg-error transition-colors text-xs"
                      aria-label="Rimuovi"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDecrease(item.product.id)}
                        className="w-8 h-8 rounded-full border border-vg-border hover:border-vg-text/40 text-vg-text text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-6 text-center text-vg-text">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onIncrease(item.product.id)}
                        className="w-8 h-8 rounded-full border border-vg-border hover:border-vg-text/40 text-vg-text text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-vg-text">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-vg-border p-6 space-y-4 bg-vg-surface">
            <div className="flex items-center justify-between">
              <span className="text-vg-muted text-sm">Totale</span>
              <span className="text-xl font-semibold tracking-tight text-vg-text">
                {formatPrice(total)}
              </span>
            </div>

            <button
              onClick={onSendOrder}
              className="w-full bg-vg-accent hover:bg-[#A9573A] text-white font-medium py-3.5 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-vg-accent/20 hover:shadow-vg-accent/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-vg-accent focus-visible:outline-offset-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Invia ordine su WhatsApp
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
