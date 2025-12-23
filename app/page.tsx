"use client";

import { HomePage } from "./components/HomePage";
import { MegaMenu } from "./components/MegaMenu";

export default function Home() {
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} />
      <HomePage
        onAddToCart={(product) => {
          console.log("Add to cart", product);
        }}
      />
    </>
  );
}
