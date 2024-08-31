import Container from "./Container";
import Link from "next/link";
import { Search, Grip } from "lucide-react";

const NavBar = () => {
  return (
    <header className="bg-indigo-800/80 py-3 static top-0">
      <Container>
        <div className="w-full flex justify-between items-center">
          <div>
            <Link href={"/"} title="Tec Imports" className="font-bold text-xl">
              Tec<span className="text-yellow-500">Imports</span>
            </Link>
          </div>
          <nav className="relative">
            <div>
              <Search className="w-5 h-5 absolute top-3 right-3 hover:scale-110 cursor-pointer" />
              <span className="sr-only">pesquisar item</span>
            </div>
            <input
              type="text"
              className="input w-[250px] md:w-[400px] lg:w-[500px] pr-10"
              placeholder="Qual item você deseja?"
            />
          </nav>
          <div className="hidden lg:flex gap-x-3 font-semibold">
            <Link
              href={"/"}
              className="px-4 py-1 border-4 border-white hover:bg-indigo-700 rounded-full"
            >
              Login
            </Link>
            <Link
              href={"/"}
              className="px-4 py-1 border-4 border-white hover:bg-indigo-700 rounded-full"
            >
              Cadastre-se
            </Link>
          </div>

          <div className="drawer drawer-end flex lg:hidden w-10">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button">
                <Grip className="w-10 h-10 cursor-pointer drawer-button" />
                <span className="sr-only">Menu burguer</span>
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  
                </li>
                <li>
                  <Link href={"#"}>Produtos digitais</Link>
                </li>
                <li>
                  <Link href={"#"}>Produtos fisicos</Link>
                </li>
                <li>
                  <Link href={"#"}>Suporte</Link>
                </li>
                <span className="flex-grow"></span>
                <div className="h-20">
                    <Link href={"/"}>Login</Link>
                </div> 
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default NavBar;
