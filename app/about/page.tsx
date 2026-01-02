import { AboutPage } from '@/app/components/AboutPage';
import { MegaMenu } from '@/app/components/MegaMenu';

export default function About() {
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={false} />
      <AboutPage />
    </>
  );
}
