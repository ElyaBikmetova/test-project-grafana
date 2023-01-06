import ReactDOM from 'react-dom';
import './index.scss';
import './reset.scss';
import { ProductPage } from './components/ProductPage';

ReactDOM.render(
  <ProductPage/>,
  document.getElementById('root') as HTMLElement
);
