export interface Usuario {
    email:string,
    name: string,
    phone: string,
    password:string,
    solicitado:string,
    auto: {
        marca: string,
        modelo: string,
        patente: string
    }
}
