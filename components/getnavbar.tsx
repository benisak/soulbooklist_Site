"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import NavbarAlt from "@/components/navbaralt";
import { AllPostCategories } from "@/shared/entities/PostCategory";

interface GetNavbarProps {
  topAndOtherCategories: AllPostCategories;
  Categoriesmobile3: AllPostCategories;
  CategoriesmobileList: AllPostCategories;
}

export default function GetNavbar({
  topAndOtherCategories, Categoriesmobile3, CategoriesmobileList
}: GetNavbarProps) {
  const pathname = usePathname();
  const altnav = pathname === "/home/minimal";

  return (
    <>
      {altnav ? (
        <NavbarAlt topAndOtherCategories={topAndOtherCategories} />
      ) : (
        <Navbar topAndOtherCategories={topAndOtherCategories} Categoriesmobile3={Categoriesmobile3} CategoriesmobileList={CategoriesmobileList}/>
      )}
    </>
  );
}
