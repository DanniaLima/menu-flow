import { useState } from "react";
import { ProductRow } from "./components/ProductRow";
import { CartPanel } from "./components/CartPanel";
import {
  mockBusiness,
  mockCategories,
  mockProducts,
} from "./services/mockData";
import type { Category, CartItem, Product } from "./types";

function formatPrice(price: number): string {
  return `€ ${price.toFixed(2).replace(".", ",")}`;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    selectedCategory === null
      ? mockProducts
      : mockProducts.filter((p) => p.categoryId === selectedCategory);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleIncrease = (productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleDecrease = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemove = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSendOrder = () => {
    const lines = cart.map(
      (item) =>
        `- ${item.quantity}x ${item.product.name} (€ ${(
          item.product.price * item.quantity
        )
          .toFixed(2)
          .replace(".", ",")})`,
    );

    const message = [
      `Ciao ${mockBusiness.name}!`,
      `Vorrei ordinare:`,
      "",
      ...lines,
      "",
      `Totale: € ${totalPrice.toFixed(2).replace(".", ",")}`,
    ].join("\n");

    const phone = mockBusiness.whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const allCategories: { id: number | null; name: string }[] = [
    { id: null, name: "Tutti" },
    ...mockCategories.map((c: Category) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div className="min-h-screen bg-vg-bg text-vg-text">
      {/* Header espresso */}
      <header className="bg-[#292522] border-b border-vg-ocre/20 sticky top-0 z-30 shadow-md shadow-black/10">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="w-10 flex-shrink-0">
              <svg
                className="w-8 h-8 text-vg-ocre"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22V12" />
                <path d="M12 12c0-3 1-5 4-6-1 3 0 5-4 6z" />
                <path d="M12 12c0-3-1-5-4-6 1 3 0 5 4 6z" />
                <path d="M12 17c0-3 1-5 4-6-1 3 0 5-4 6z" />
                <path d="M12 17c0-3-1-5-4-6 1 3 0 5 4 6z" />
                <path d="M12 7c0-2 1-3 3-4-1 2 0 3-3 4z" />
                <path d="M12 7c0-2-1-3-3-4 1 2 0 3 3 4z" />
              </svg>
            </div>

            <div className="flex-1 text-center">
              <h1 className="text-lg sm:text-xl font-semibold tracking-[0.3em] text-vg-bg uppercase">
                {mockBusiness.name}
              </h1>
              <p className="text-[10px] tracking-[0.25em] text-vg-ocre uppercase mt-1">
                Pizza · Pane · Cucina
              </p>
            </div>

            <div className="w-10 flex-shrink-0 flex justify-end">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative border border-vg-ocre/40 hover:border-vg-ocre p-2.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-vg-ocre focus-visible:outline-offset-2"
                aria-label="Apri carrello"
              >
                <svg
                  className="w-4 h-4 text-vg-bg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-vg-ocre text-vg-text text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-32">
        {/* Hero editorial */}
        <section className="py-12 sm:py-16 border-b border-vg-border">
          <p className="text-[11px] tracking-[0.25em] text-vg-muted uppercase mb-6">
            Il nostro menu
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-vg-text leading-[1.1] mb-6">
            Ingredienti semplici,
            <br />
            <span className="text-vg-accent">grandi sapori.</span>
          </h2>
          <p className="text-vg-muted text-base leading-relaxed max-w-xl">
            Pizza e pane artigianali, preparati ogni giorno con farine
            selezionate e ingredienti di qualità.
          </p>
        </section>

        {/* Tabs de categorias editorial */}
        <nav className="py-6 px-6 border-b border-vg-border bg-vg-surface-muted/60">
          <div className="flex gap-6 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
            {allCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id ?? "tutti"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative pb-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-vg-text"
                      : "text-vg-muted hover:text-vg-text"
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-vg-accent rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Lista de produtos */}
        <section className="pt-2">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-vg-muted py-16 text-sm">
              Nessun prodotto in questa categoria.
            </p>
          ) : (
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 divide-y divide-vg-border md:divide-y-0">
              {filteredProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer editorial */}
      <footer className="border-t border-vg-border bg-vg-surface">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.25em] text-vg-text uppercase mb-1">
              {mockBusiness.name}
            </p>
            <p className="text-[10px] tracking-[0.25em] text-vg-muted uppercase mb-6">
              Pizza · Pane · Cucina
            </p>
            <div className="text-xs text-vg-muted space-y-1 mb-6">
              <p>{mockBusiness.address}</p>
              <p>{mockBusiness.openingHours}</p>
              <p className="text-vg-accent font-medium">
                {mockBusiness.whatsappNumber}
              </p>
            </div>
            <p className="text-[11px] text-vg-muted border-t border-vg-border pt-6">
              © 2026 {mockBusiness.name} · Design by{" "}
              <span className="text-vg-text font-medium">Dania Lima</span> ·
              Powered by{" "}
              <span className="text-vg-text font-medium">MenuFlow</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom bar do carrinho */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-vg-surface border-t border-vg-border z-20">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-vg-muted uppercase tracking-wider mb-0.5">
                Il tuo ordine
              </p>
              <p className="text-sm text-vg-text">
                {totalItems} {totalItems === 1 ? "prodotto" : "prodotti"} ·{" "}
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-vg-accent hover:bg-[#A9573A] text-white font-medium py-3 px-6 rounded-full transition-all duration-200 flex items-center gap-2 shadow-lg shadow-vg-accent/20 hover:shadow-vg-accent/30 hover:-translate-y-0.5 text-sm"
            >
              Vai al carrello
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <CartPanel
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
        onSendOrder={handleSendOrder}
      />
    </div>
  );
}

export default App;
