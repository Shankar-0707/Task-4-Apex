import { products } from './products.js';
import { ProductList } from './components/ProductList.js';
import { FilterManager } from './components/FilterManager.js';

// Initialize the product list and filter manager
const productList = new ProductList(products);
const filterManager = new FilterManager(products, productList);

// Initial render
productList.render();