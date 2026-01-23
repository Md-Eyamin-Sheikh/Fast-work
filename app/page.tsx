import { HomePage } from "./components/HomePage";
import { MegaMenu } from "./components/MegaMenu";
import { Product } from "./data/products";

// Helper to fetch products
import clientPromise from '@/app/lib/mongodb';

async function getProducts(): Promise<Product[]> {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('products');
    
    const products = await collection.find({}).toArray();
    
    if (products.length === 0) {
      console.info('ℹ️ Using demo products (database empty)');
      // Import static products
      const { products: staticProducts } = await import('./data/products');
      return staticProducts;
    }
    
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      id: product.id || product._id.toString()
    })) as unknown as Product[];
    
  } catch (error) {
    // Gracefully fallback to demo data when database is unavailable
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Database connection failure:', error);
      console.info('ℹ️ Using demo products (database offline)');
    }
    // Import static products as fallback
    const { products: staticProducts } = await import('./data/products');
    return staticProducts;
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
