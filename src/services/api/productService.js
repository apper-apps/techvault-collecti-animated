import productsData from "@/services/mockData/products.json"

class ProductService {
  constructor() {
    this.products = [...productsData]
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.products]
  }

  async getById(id) {
    await this.delay()
    const product = this.products.find(p => p.Id === parseInt(id))
    if (!product) {
      throw new Error("Product not found")
    }
    return { ...product }
  }

  async getByBrand(brand) {
    await this.delay()
    return this.products.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
  }

  async getFeatured(limit = 3) {
    await this.delay()
    return this.products
      .filter(p => p.inStock)
      .sort((a, b) => b.price - a.price)
      .slice(0, limit)
      .map(p => ({ ...p }))
  }

  async getInStock() {
    await this.delay()
    return this.products.filter(p => p.inStock).map(p => ({ ...p }))
  }

  async searchProducts(query) {
    await this.delay()
    const searchTerm = query.toLowerCase()
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.processor.toLowerCase().includes(searchTerm)
    ).map(p => ({ ...p }))
  }

  getBrands() {
    return [...new Set(this.products.map(p => p.brand))]
  }

  getPriceRange() {
    const prices = this.products.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }
}

export default new ProductService()