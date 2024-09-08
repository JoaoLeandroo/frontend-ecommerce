import Container from "../Container";
import Link from "next/link";
import { Search, Grip } from "lucide-react";
import AdminNavBar from "./AdminNavBar";

const NavBar = () => {
  return (
    <header className="bg-indigo-800/80 py-3 static top-0">
      <Container>
        <div className="w-full h-14 flex justify-between">
          <div className="relative h-full w-24 sm:w-40">
            <Link href={"/"} title="Tec Imports" className="font-bold text-2xl md:text-3xl">
              Tec<span className="text-yellow-500/80 absolute top-4 left-0 sm:left-6">Imports</span>
            </Link>
          </div>
          <nav className="relative w-[55%] sm:w-[400px] lg:w-[470px] xl:w-[600px] flex items-center">
            <div>
              <Search className="w-5 h-5 absolute top-[18px] right-3 hover:scale-110 cursor-pointer" />
              <span className="sr-only">pesquisar item</span>
            </div>
            <input
              type="text"
              className="input h-11 w-full pr-10 placeholder:text-white"
              placeholder="Qual item você busca?"
            />
          </nav>
          <div className="hidden lg:flex items-center gap-x-3 font-semibold">
            <Link
              href={"/session"}
              className="px-4 h-11 border-2 border-white hover:bg-indigo-700 text-center flex items-center rounded-lg shadow"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="px-4 h-11 border-2 border-white hover:bg-indigo-700 text-center flex items-center rounded-lg shadow"
            >
              Cadastre-se
            </Link>
          </div>
          <AdminNavBar/>

          <div className="drawer drawer-end flex lg:hidden w-8 items-center justify-center">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
              <label htmlFor="my-drawer" className="drawer-button">
                <Grip className="w-8 h-8 cursor-pointer drawer-button" />
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
