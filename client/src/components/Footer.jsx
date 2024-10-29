const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-transparent text-white py-4 px-3 mt-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8 flex justify-center">
          <p className="text-xs text-gray-400 md:text-sm">
            Copyright {year} &copy; All Rights Reserved
          </p>
        </div>
        <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8 flex justify-center">
          <p className="text-xs text-gray-400 md:text-sm">
            Created by Alex Geer Web Designs.
          </p>
        </div>
        {/* <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
         <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li className="mx-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul> 
        </div> */}
      </div>
    </footer>
  );
};
export default Footer;
// Footer design by Arya: https://tailwindflex.com/@arya/very-simple-footer
