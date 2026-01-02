import { BlogPage } from '@/app/components/BlogPage';
import { MegaMenu } from '@/app/components/MegaMenu';

export default function Blog() {
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={false} />
      <BlogPage />
    </>
  );
}
