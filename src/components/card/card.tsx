import './card.css'
import imgEditar from './cardImages/editar.png'
import imgDeletar from './cardImages/deletar.png'
import { useProductDataDelete } from '../../hooks/useProductDataDelete'
import { useState } from 'react';
import { Update } from '../update/update';
import Swal from 'sweetalert2'




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
        Swal.fire({
            title: "Você tem certeza que deseja deletar?",
            text: "Esta ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Não"
          }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(idCard);
              Swal.fire({
                title: "Deletado!",
                text: "O produto foi deletado com sucesso",
                icon: "success"
              });
            }
          });
        
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

                {isUpdateOpen && <Update closeUpdate={handlesOpenModal} id={id} nome={nome} descricao={descricao} quantidade={quantidade} />}
            </div>
           

        </div>

    )
}