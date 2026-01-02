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
    
    // Fetch all products, convert _id to string if needed, and cast to Product[]
    // Note: In a real app we might want to limit fields or limit count
    const products = await collection.find({}).toArray();
    
    // Serialize _id to string for Client Components to handle easily if strictly typed, 
    // or just pass as is if the type allows. simpler to map.
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      id: product.id || product._id.toString()
    })) as unknown as Product[];
    
  } catch (error) {
    console.error("Error fetching products from DB:", error);
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
