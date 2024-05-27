import './card.css'
import imgEditar from './cardImages/editar.png'
import imgDeletar from './cardImages/deletar.png'

interface CardProps {
    id: number,
    nome: string,
    descricao: string,
    quantidade: number

}

export function Card({nome, descricao, quantidade} : CardProps){

    return(
        <div className="card"> 
              
            <div className="card-itens">

                <div id="item-nome" className='item'>
                    <p>{nome}</p>
                </div>
                <div id="item-descricao" className='item'>
                    <p>{descricao}</p>
                </div>
                <div id="item-quantidade" className='item'>
                     <p>{quantidade}</p>  
                </div>
                <div className="card-buttons">
                    <img src={imgEditar} alt="Editar" title='Editar' width={70} height={70} className='btn'/>   
                    <img src={imgDeletar} alt="Deletar" title='Deletar' width={70} height={70} className='btn'/> 
                </div>
            </div>
           

        </div>

    )
}