"use client";

import Container from "@/components/Container";
import { api } from "@/services/api";
import { SessionSchema } from "@/services/zod";
import { FormEvent, useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

const SessionPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<any>({});
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const sessionUser = async (event: FormEvent) => {
    event.preventDefault();

    const parseResult = SessionSchema.safeParse({ email, password });
    if (!parseResult.success) {
      setErrors(parseResult.error.flatten().fieldErrors);
      return;
    }

    if (email === "" || password === "") {
      return;
    }

    const user = await api.post("/session", {
      email: email,
      password: password,
    });

    if (user.data?.Error?.message === "Usuario ou senha inválido.") {
      setErrors((prevState: any) => ({
        ...prevState,
        email: ["Login ou senha inválido"],
        password: ["Login ou senha inválido."],
      }));
      return;
    }

    setCookie(null, "@e-commerce.token", user.data?.token)
    router.push("/dashboard")
  };

  return (
    <Container>
      <div className="flex items-center justify-center mt-24">
        <form
          className="max-w-[500px] w-full border border-white rounded-lg p-3"
          onSubmit={sessionUser}
        >
          <div className="w-full text-center mb-4 relative select-none">
            <h1 className="font-bold text-xl leading-3">Tec</h1>
            <span className="text-yellow-500/80 leading-3 font-bold text-2xl">
              Imports
            </span>
            <br />
            <span className="font-bold text-lg absolute -top-2 left-0">
              Login
            </span>
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
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="sr-only">
                  Campo para informar o email do usuario
                </span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email[0]}</p>
              )}
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
                <input
                  type="password"
                  className="grow"
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="sr-only">
                  Campo pora informar a senha do usuario
                </span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password[0]}</p>
              )}
            </div>

            <button
              className="btn btn-warning h-11 text-xl font-bold uppercase mt-4"
              type="submit"
            >
              Entrar
              <span className="sr-only">Fazer login</span>
            </button>
          </section>
        </form>
      </div>
    </Container>
  );
};

export default SessionPage;
