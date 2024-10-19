"use client";

import { memo, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const LINKS = [
  {
    name: "Home",
    href: "#gamer-hub-hero-section",
  },
  {
    name: "Products",
    href: "#gamer-hub-product-section",
  },
  {
    name: "About",
    href: "#gamer-hub-about-section",
  },
];

function NavbarWrapper() {
  const [open, setOpen] = useState<boolean>(false);
  const toggleMenu = () => setOpen(!open);

  const btnToogle = useMemo(
    () => (
      <div className="-mr-2 flex md:hidden">
        <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
    ),
    [open]
  );

  return (
    <Navbar links={LINKS} btnComponent={btnToogle}>
      {open ? (
        <div className="md:hidden border-t-2 w-full">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center divide-y-2 w-full">
            {LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-primary-foreground hover:text-primary px-3 py-2 flex justify-center text-sm font-medium w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </Navbar>
  );
}

export default memo(NavbarWrapper);
