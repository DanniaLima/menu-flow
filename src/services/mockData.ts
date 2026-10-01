import type { Business, Category, Product } from "../types";

export const mockBusiness: Business = {
  id: 1,
  name: "Via del Grano",
  slug: "via-del-grano",
  whatsappNumber: "+39 333 1234567",
  address: "Via Roma, 42 - Milano",
  openingHours: "Lun-Dom · 7:00 - 22:00",
};

export const mockCategories: Category[] = [
  { id: 1, name: "Pizze", slug: "pizze" },
  { id: 2, name: "Panini", slug: "panini" },
  { id: 3, name: "Dolci", slug: "dolci" },
  { id: 4, name: "Bevande", slug: "bevande" },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Pomodoro, mozzarella, basilico fresco",
    price: 8.5,
    categoryId: 1,
    available: true,
  },
  {
    id: 2,
    name: "Pizza Diavola",
    description: "Pomodoro, mozzarella, salame piccante",
    price: 10.0,
    categoryId: 1,
    available: true,
  },
  {
    id: 3,
    name: "Pizza Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmigiano, fontina",
    price: 11.5,
    categoryId: 1,
    available: true,
  },
  {
    id: 4,
    name: "Panino Milanese",
    description: "Cotoletta, insalata, pomodoro, maionese",
    price: 7.0,
    categoryId: 2,
    available: true,
  },
  {
    id: 5,
    name: "Panino Vegetariano",
    description: "Zucchine grigliate, melanzane, formaggio",
    price: 6.5,
    categoryId: 2,
    available: true,
  },
  {
    id: 6,
    name: "Tiramisù",
    description: "Ricetta tradizionale della nonna",
    price: 5.0,
    categoryId: 3,
    available: true,
  },
  {
    id: 7,
    name: "Cannolo Siciliano",
    description: "Ricotta fresca e pistacchi",
    price: 4.5,
    categoryId: 3,
    available: false,
  },
  {
    id: 8,
    name: "Acqua Naturale",
    description: "Bottiglia 500ml",
    price: 1.5,
    categoryId: 4,
    available: true,
  },
  {
    id: 9,
    name: "Coca-Cola",
    description: "Lattina 330ml",
    price: 3.0,
    categoryId: 4,
    available: true,
  },
];
