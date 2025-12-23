"use client";

import { HomePage } from "./components/HomePage";

export default function Home() {
  return (
    <HomePage
      onNavigate={(page, productId) => {
        console.log(`Navigate to ${page} ${productId ? `with id ${productId}` : ""}`);
      }}
      onAddToCart={(product) => {
        console.log("Add to cart", product);
      }}
    />
  );
}
