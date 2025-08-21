using AccessoriesEcommerce.API.DTOs;

namespace AccessoriesEcommerce.API.Services;

public interface IProductService
{
    Task<List<ProductDto>> GetAllProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(int id);
    Task<List<ProductDto>> GetFilteredProductsAsync(ProductFilterRequest filter);
    Task<ProductDto> CreateProductAsync(CreateProductRequest request);
    Task<ProductDto?> UpdateProductAsync(int id, UpdateProductRequest request);
    Task<bool> DeleteProductAsync(int id);
    Task<List<string>> GetCategoriesAsync();
    Task<List<string>> GetBrandsAsync();
}
