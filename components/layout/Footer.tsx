
import NewsletterForm from './NewsletterForm';
import { FOOTER_LINKS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <nav className="footer-links" aria-label="Footer navigation">
            <h3>Quick Links</h3>

            <div className="footer-links-grid">
              {FOOTER_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="footer-newsletter">
            <h3>Join our community</h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Donatia. All rights reserved.
          </p>
          <span>Made with care for a better future.</span>
        </div>
      </div>
    </footer>
  );
}
