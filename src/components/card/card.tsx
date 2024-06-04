import './card.css'
import imgEditar from './cardImages/editar.png'
import imgDeletar from './cardImages/deletar.png'
import { useProductDataDelete } from '../../hooks/useProductDataDelete'
import { useState } from 'react';
import { Update } from '../update/update';



interface CardProps {
    id: number,
    nome: string,
    descricao: string,
    quantidade: number

}



export function Card({ id, nome, descricao, quantidade} : CardProps){

    console.log({id, nome, descricao, quantidade});
    
    const { mutate: deleteProduct } = useProductDataDelete();


    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    const handlesOpenModal = () => {
        setIsUpdateOpen(prev => !prev)
    }  

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
                    <img src={imgEditar} alt="Editar" title='Editar' width={70} height={70} className='btn' onClick={handlesOpenModal}/>   
                    <img src={imgDeletar} alt="Deletar" title='Deletar' width={70} height={70} className='btn' onClick={() => deleteCard(id)}/> 
                </div>

                {isUpdateOpen && <Update closeUpdate={handlesOpenModal} id={id} />}
            </div>
           

        </div>

    )
}