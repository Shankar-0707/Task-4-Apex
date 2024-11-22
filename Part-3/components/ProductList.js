export class ProductList {
  constructor(products) {
    this.products = products;
    this.filteredProducts = [...products];
    this.productsGrid = document.getElementById('products-grid');
    this.setupSortListener();
  }

  setupSortListener() {
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', () => {
      this.sortProducts(sortSelect.value);
    });
  }

  sortProducts(criteria) {
    switch (criteria) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this.filteredProducts.sort((a, b) => a.id - b.id);
    }
    this.render();
  }

  updateProducts(filtered) {
    this.filteredProducts = filtered;
    this.render();
  }

  render() {
    this.productsGrid.innerHTML = this.filteredProducts
      .map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
              <span class="star-rating">★</span>
              ${product.rating.toFixed(1)}
            </div>
          </div>
        </div>
      `)
      .join('');
  }
}