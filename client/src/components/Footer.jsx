const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center bg-transparent text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - Designed by Alex Geer Web
          Designs{" "}
        </p>
      </aside>
    </footer>
  );
};
export default Footer;
// Footer design by Arya: https://tailwindflex.com/@arya/very-simple-footer
