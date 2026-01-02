import { AdminLayout } from '@/app/components/admin/AdminLayout';
import { AllBlogs } from '@/app/components/admin/AllBlogs';

export default function BlogsPage() {
  return (
    <AdminLayout>
      <AllBlogs />
    </AdminLayout>
  );
}
