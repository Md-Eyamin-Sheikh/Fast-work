import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AllProducts } from '@/app/components/admin/AllProducts';

export default function ProductsPage() {
  return (
    <AdminLayout>
      <AllProducts />
    </AdminLayout>
  );
}
