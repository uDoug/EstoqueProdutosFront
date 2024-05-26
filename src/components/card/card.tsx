interface CardProps {
    nome: string,
    descricao: string,
    quantidade: number

}

export function Card({nome, descricao, quantidade} : CardProps){

    return(
        <div className="card">
            <h1>{nome}</h1>
            <h1>{descricao}</h1>
            <h1>{quantidade}</h1>

        </div>

    )
}