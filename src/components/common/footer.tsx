import Link from "next/link";

// address
const contactInfo = (
  <p className="text-base leading-tight">
    Prinsengracht 123, <br />
    1016 GV Amsterdam, <br />
    The Netherlands
  </p>
);

// Navigation links
const navigationLinks = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Projects", href: "/projects" },
  { text: "Contact", href: "/contact" },
].map(({ text, href }) => (
  <Link
    key={text}
    href={href}
    className="mt-4 block w-fit text-sm transition-colors duration-200 hover:text-primary"
  >
    {text}
  </Link>
));

// Social links
const socialLinks = [
  { text: "Instagram", href: "https://www.instagram.com/zaidkhan3419" },
  { text: "Linkedin", href: "https://www.linkedin.com/in/zaid-k-6a824310b" },
  { text: "Dribble", href: "https://dribbble.com/zaidkhan3419" },
  {
    text: "Framer",
    href: "https://www.framer.com/marketplace/creator/zaid-khan/",
  },
].map(({ text, href }) => (
  <Link
    key={text}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm transition-colors duration-200 hover:text-primary"
  >
    {text}
  </Link>
));

const Footer: React.FC = () => {
  return (
    <footer className="w-full overflow-hidden bg-cover bg-center">
      {/* Container */}
      <div className="mx-auto flex flex-col gap-8 px-4 pb-32 md:pb-16">
        {/* Footer Top */}
        <div className="flex flex-col items-start gap-16 md:flex-row md:gap-0">
          <div className="flex-1">
            {contactInfo}
            <Link
              href="mailto:mrzaidsaeed@gmail.com"
              className="mt-4 block w-fit text-sm transition-colors duration-200 hover:text-primary"
            >
              hello@kaeldonovan.com
            </Link>
          </div>

          <div className="flex flex-1 flex-col items-start gap-4">
            {navigationLinks}
          </div>
        </div>

        {/* Divider */}
        <div className="bg-borderColor h-px w-full" />

        {/* Footer Bottom */}
        <div className="flex flex-col-reverse items-start gap-16 md:flex-row md:gap-0">
          <div className="flex-1">
            <p className="text-sm">© All rights reserved / 2024</p>
          </div>

          <div className="flex flex-1 flex-wrap gap-12">{socialLinks}</div>
        </div>
      </div>

      {/* Big Text */}
      <h2 className="block bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-center text-[14.8vw] font-light uppercase leading-[0.75] tracking-[-1vw] text-transparent">
        Zoltan Fodor
      </h2>
    </footer>
  );
};

export default Footer;
