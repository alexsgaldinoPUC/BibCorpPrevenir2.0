import { Emprestimo } from "../emprestimo"


export interface Usuario{
    id: number
    isAdmin: boolean
    nome: string
    localizacao: string
    email: string
    password: string
    userName:string
    phoneNumber:string
    fotoURL: string
    Emprestimos: Emprestimo[]
    token: string
}
