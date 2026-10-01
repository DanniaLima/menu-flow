import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
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

  return (
    <div className="min-h-screen bg-vg-bg text-vg-text">
      {/* Header */}
      <header className="border-b border-vg-border bg-vg-bg/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-vg-text">
              {mockBusiness.name}
            </h1>
            <p className="text-vg-muted text-xs mt-0.5">
              {mockBusiness.openingHours}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-vg-muted text-xs">{mockBusiness.address}</p>
              <p className="text-vg-accent text-xs font-medium mt-0.5">
                {mockBusiness.whatsappNumber}
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative border border-vg-border hover:border-vg-text/40 p-3 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-vg-accent focus-visible:outline-offset-2"
              aria-label="Apri carrello"
            >
              <svg
                className="w-5 h-5 text-vg-text"
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
                <span className="absolute -top-1 -right-1 bg-vg-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 pb-32 sm:pb-8">
        {/* Categorias */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === null
                ? "bg-vg-primary text-vg-bg"
                : "border border-vg-border text-vg-muted hover:text-vg-text hover:border-vg-text/40"
            }`}
          >
            Tutto
          </button>
          {mockCategories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-vg-primary text-vg-bg"
                  : "border border-vg-border text-vg-muted hover:text-vg-text hover:border-vg-text/40"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de produtos */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-vg-muted py-12 text-sm">
            Nessun prodotto in questa categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-vg-border mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center">
          <p className="text-vg-muted text-xs">
            Powered by{" "}
            <span className="text-vg-text font-medium">MenuFlow</span>
          </p>
        </div>
      </footer>

      {/* Bottom bar mobile do carrinho */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-vg-surface border-t border-vg-border p-4 z-20">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-vg-primary text-vg-bg font-medium py-3.5 px-4 rounded-full transition-all duration-200 flex items-center justify-between"
          >
            <span className="text-sm">
              {totalItems} {totalItems === 1 ? "prodotto" : "prodotti"}
            </span>
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
          </button>
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
