import { JSX } from "react";
import { Navbar } from "../components/Navbar";
import { DropdownAvatar } from "@/components/home/DropdownAvatar";

export default async function Home(): Promise<JSX.Element> {
  const dropdown = await DropdownAvatar();
  
  return (
    <>
      <Navbar brand={"Itsu"} items={[{ label: "Trang chủ", href: "/" }, { label: "Danh sách sân", href: "/courts" }]} rightContent={dropdown} />
    </>
  );
}