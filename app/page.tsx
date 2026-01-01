import { HomePage } from "./components/HomePage";
import { MegaMenu } from "./components/MegaMenu";
import { Product } from "./data/products";

// Helper to fetch products
async function getProducts(): Promise<Product[]> {
  // In development, we can fetch directly or use an absolute URL. 
  // For Server Components in Next.js, it's often better to call the DB directly if possible, 
  // but to strictly follow the "API" architectural step requested, we'll fetch from the API.
  // Note: Fetching from own API in Server Components requires absolute URL.
  // Ideally, valid data fetching logic should be separated from API routes for reuse.
  // For this task, assuming we are running on localhost:3000 or similar.
  // However, a more robust way for Server Components is to just use the DB logic directly.
  // Let's settle on fetching from the local API for strict adherence to the requested flow.
  try {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' }); // Ensure fresh data
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts(); // This will be dynamic from MongoDB

  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={true} /> 
      {/* 
        MegaMenu might need 'products' passed to it if we want it to be dynamic based on DB too 
        (e.g. for "Featured" items as planned before). 
        For now, let's keep it simple as per original request to just connect the display.
      */}
      <HomePage
        // We need to update HomePage to accept 'products' prop instead of importing text file
        initialProducts={products}
      />
    </>
  );
}
