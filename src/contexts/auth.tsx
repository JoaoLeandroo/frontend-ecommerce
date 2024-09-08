"use client"
import { createContext, useState, useEffect } from "react";
import { api } from "@/services/api";
export const AuthContext = createContext<any>({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [idUser, setIdUser] = useState<any>("")
  const [adminBtn, setAdminBtn] = useState<boolean>(false)

  useEffect(() => {
    console.log("Pagina atualizada.")
    const userAdmin = async () => {
      const user = await api.post("/check-admin", {
        id: idUser
      });

      if(user.data?.message === "Usuario autorizado.") {
        setAdminBtn(true)
        return console.log("Usuario autorizado.")
      }

      setAdminBtn(false)
      return console.log("Usuario não autorizado")
    }
    
    userAdmin()
  }, [idUser])

  return (
    <AuthContext.Provider value={{ idUser, setIdUser, adminBtn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;