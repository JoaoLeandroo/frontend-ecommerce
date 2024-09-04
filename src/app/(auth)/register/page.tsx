"use client";

import Container from "@/components/Container";
import { FormEvent, useState } from "react";
import { api } from "@/services/api";
import { RegisterSchema } from "@/services/zod";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
  const router = useRouter()

  const [nameUser, setNameUser] = useState<string | null>("")
  const [email, setEmail] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("")
  const [password1, setPassword1] = useState<string | null>("")
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [sucess, setSucess] = useState<boolean>(false)

  const registerUser = async (event: FormEvent) => {
    event.preventDefault()

    const parseResult = RegisterSchema.safeParse({nameUser, email, password, password1})
    if(!parseResult.success) {
      setErrors(parseResult.error.flatten().fieldErrors)
      return
    }
    setErrors({})
    if(email === "" || nameUser === "" || password === "" || password1 === "") {
      return
    }

    if(password != password1) {
      setErrors((prevState:any) => ({
        ...prevState,
        password: ["As senhas devem ser iguais."],
        password1: ["As senhas devem ser iguais."]
    }))
    return
    }

    setLoading(true)
    const check = await api.post("/check-email", {
      email: email,
    })

    if(check.data.message != "Email disponivel para uso.") {
      setErrors((prevState:any) => ({
        ...prevState,
        email: ["Usuario já cadastrado."]
    }))
    setLoading(false)
      return
    }

    const response = await api.post("/register", {
      name: nameUser,
      email: email,
      password: password,
    })

    setSucess(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSucess(false)
    setLoading(false)
    router.push("/session")
    return response
  }

  return (
    <Container>
      {
        sucess ? 
        <div role="alert" className="alert alert-success absolute -top-20 left-0 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Usuario registrado com sucesso!</span>
      </div>
         : ""
      }
      <div className="flex items-center justify-center mt-24">


        
        <form className="max-w-[500px] w-full border border-white rounded-lg p-3" onSubmit={registerUser}>
          <div className="w-full text-center mb-4 relative select-none">
            <h1 className="font-bold text-xl leading-3">Tec</h1>
            <span className="text-yellow-500/80 leading-3 font-bold text-2xl">
              Imports
            </span><br />
            <span className="font-bold text-lg absolute -top-2 left-0">Cadastre-se</span>
          </div>
          <section className="flex flex-col gap-y-3">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" onChange={(e) => setNameUser(e.target.value)}/>
                <span className="sr-only">Campo para registrar o nome do usuario</span>
              </label>
                {errors.nameUser && <p className="text-red-500 text-sm">{errors.nameUser[0]}</p>}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <span className="sr-only">Campo para registrar o email do usuario</span>
              </label>
                {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="password" className="grow" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                <span className="sr-only">Campo pora informar a senha do usuario</span>
              </label>
                {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>

            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input type="password" className="grow" placeholder="Repita a senha" onChange={(e) => setPassword1(e.target.value)}/>
                <span className="sr-only">campo para repetir a senha informada pelo usuario</span>
              </label>
                {errors.password1 && <p className="text-red-500 text-sm">{errors.password1[0]}</p>}
            </div>

            <button className="btn btn-warning h-11 text-xl  flex items-center justify-center font-bold uppercase mt-4" type="submit">
              {loading ? <span className="loading loading-spinner loading-md"></span> : "Registrar"}
              <span className="sr-only">Registrar o usuario</span>
            </button>
          </section>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
