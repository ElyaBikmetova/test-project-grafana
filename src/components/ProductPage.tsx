import { Table, Spinner } from '@grafana/ui';
import { useProducts } from '../hooks/products';
import './ProductPage.scss';

export function ProductPage() {
    const {products, loading} = useProducts();
    
    return(
        <div className='products__mainPage'>
            <div className='products__mainPage-title'>Products</div>
            <div>
                {loading ? 
                            (<Spinner size={50} style={{color: 'white'}} inline={true} />) : 
                            (<Table data={products} width={1100} height={600} columnMinWidth={100} />)}
            </div>
        </div>
    )
}