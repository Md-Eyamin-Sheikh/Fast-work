import { ContactPage } from '@/app/components/ContactPage';
import { MegaMenu } from '@/app/components/MegaMenu';

export default function Contact() {
  return (
    <>
      <MegaMenu cartCount={0} isAuthenticated={false} />
      <ContactPage />
    </>
  );
}
