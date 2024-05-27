import './App.css'
import { Card } from './components/card/card';
import { useProductData } from './hooks/useProductData';
//import { ProductData } from './interface/ProductData';


function App() {
  const { data } = useProductData();

  return (
    <div className='app'>
      <h1>Estoque</h1>  
      <div className="card-grid">
        {data?.map(productData => <Card nome={productData.nome} descricao={productData.descricao} quantidade={productData.quantidade} />)}
      </div>  
    </div>
  )
}

export default App
