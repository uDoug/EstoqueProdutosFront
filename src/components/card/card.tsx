import './card.css'
import imgEditar from './cardImages/editar.png'
import imgDeletar from './cardImages/deletar.png'
import { useProductDataDelete } from '../../hooks/useProductDataDelete'


interface CardProps {
    id: number,
    nome: string,
    descricao: string,
    quantidade: number

}



export function Card({ id, nome, descricao, quantidade} : CardProps){

    const { mutate: deleteProduct } = useProductDataDelete();

    function deleteCard(idCard: number) {
        deleteProduct(idCard);
    } 

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
                    <img src={imgDeletar} alt="Deletar" title='Deletar' width={70} height={70} className='btn' onClick={() => deleteCard(id)}/> 
                </div>
            </div>
           

        </div>

    )
}