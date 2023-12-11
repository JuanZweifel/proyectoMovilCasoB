export interface Usuario {
    email:string,
    name: string,
    phone: string,
    password:string,
    solicitado:string,
    ofrecido:string,
    asientos:number,
    auto: {
        marca: string,
        modelo: string,
        patente: string
    }
}
