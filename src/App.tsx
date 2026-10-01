import { useState } from "react";
import { ProductCard } from "./components/ProductCard";
import {
  mockBusiness,
  mockCategories,
  mockProducts,
} from "./services/mockData";
import type { Category } from "./types";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredProducts =
    selectedCategory === null
      ? mockProducts
      : mockProducts.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header do negócio */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {mockBusiness.name}
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              {mockBusiness.openingHours}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-slate-500 text-xs">{mockBusiness.address}</p>
            <p className="text-blue-400 text-xs font-medium mt-0.5">
              {mockBusiness.whatsappNumber}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Categorias */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === null
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
            }`}
          >
            Tutto
          </button>
          {mockCategories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grid de produtos */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-slate-500 py-12">
            Nessun prodotto in questa categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center">
          <p className="text-slate-600 text-xs">
            Powered by{" "}
            <span className="text-slate-400 font-medium">MenuFlow</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
