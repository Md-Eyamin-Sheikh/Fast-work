import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { EditProduct } from '@/app/components/admin/EditProduct';

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  
  return (
    <AdminLayout>
      <EditProduct id={id} />
    </AdminLayout>
  );
}
