export class FilterManager {
  constructor(products, productList) {
    this.products = products;
    this.productList = productList;
    this.categories = [...new Set(products.map(p => p.category))];
    
    this.setupCategoryFilters();
    this.setupPriceFilter();
  }

  setupCategoryFilters() {
    const categoryFilters = document.getElementById('category-filters');
    
    this.categories.forEach(category => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" value="${category}">
        ${category}
      `;
      categoryFilters.appendChild(label);
    });

    categoryFilters.addEventListener('change', () => this.applyFilters());
  }

  setupPriceFilter() {
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');

    priceFilter.addEventListener('input', (e) => {
      priceValue.textContent = `$${e.target.value}`;
      this.applyFilters();
    });
  }

  applyFilters() {
    const selectedCategories = [...document.querySelectorAll('#category-filters input:checked')]
      .map(input => input.value);
    
    const maxPrice = parseInt(document.getElementById('price-filter').value);

    let filtered = this.products.filter(product => 
      product.price <= maxPrice &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category))
    );

    this.productList.updateProducts(filtered);
  }
}