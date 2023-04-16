import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" w-full  items-center flex justify-between  px-7   ">
      <Link href={"/"}>
        <Image src="/logo.png" alt="logo" width={130} height={130} />
      </Link>
      <Link
        href="https://github.com/ChetanXpro/draw-ai"
        target="_blank"
        className="flex items-center gap-2 rounded-3xl bg-slate-200 px-3 py-1 h-14 hover:bg-slate-300"
      >
        <Image
          alt="Github Logo"
          src="/github-mark.svg"
          className="w-7 h-7"
          width={25}
          height={25}
        />
        <span className="font-medium">Star on GitHub</span>
      </Link>
    </header>
  );
};

export default Header;
