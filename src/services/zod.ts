import { z } from "zod"

export const RegisterSchema = z.object({
    nameUser: z.string().min(3, {message: "Insira um nome válido."}),
    email: z.string().email({message: "Informe um email válido."}),
    password: z.string().min(6, {message: "A senha deve ter no minímo 6 caracteres."}),
    password1: z.string().min(6, {message: "A senha deve ter no minímo 6 caracteres."})
})

export const SessionSchema = z.object({
    email: z.string().email({message: "Informe um email válido."}),
    password: z.string().min(6, {message: "A senha deve ter no minímo 6 caracteres."})
})