using AccessoriesEcommerce.API.Data;
using AccessoriesEcommerce.API.DTOs;
using AccessoriesEcommerce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AccessoriesEcommerce.API.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductDto>> GetAllProductsAsync()
    {
        var products = await _context.Products
            .Where(p => p.IsAvailable)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return products.Select(MapToDto).ToList();
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        return product != null ? MapToDto(product) : null;
    }

    public async Task<List<ProductDto>> GetFilteredProductsAsync(ProductFilterRequest filter)
    {
        var query = _context.Products.AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(filter.SearchTerm))
        {
            query = query.Where(p => p.Name.Contains(filter.SearchTerm) || 
                                   p.Description.Contains(filter.SearchTerm) ||
                                   p.Brand.Contains(filter.SearchTerm));
        }

        if (!string.IsNullOrEmpty(filter.Category))
        {
            query = query.Where(p => p.Category == filter.Category);
        }

        if (!string.IsNullOrEmpty(filter.Brand))
        {
            query = query.Where(p => p.Brand == filter.Brand);
        }

        if (filter.MinPrice.HasValue)
        {
            query = query.Where(p => p.Price >= filter.MinPrice.Value);
        }

        if (filter.MaxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= filter.MaxPrice.Value);
        }

        if (filter.IsAvailable.HasValue)
        {
            query = query.Where(p => p.IsAvailable == filter.IsAvailable.Value);
        }

        // Apply pagination
        var totalCount = await query.CountAsync();
        var products = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

        return products.Select(MapToDto).ToList();
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductRequest request)
    {
        var product = new Product
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            Category = request.Category,
            Brand = request.Brand,
            ImageUrl = request.ImageUrl,
            AdditionalImages = request.AdditionalImages,
            StockQuantity = request.StockQuantity,
            IsAvailable = request.IsAvailable
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return MapToDto(product);
    }

    public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductRequest request)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return null;

        // Update only provided fields
        if (!string.IsNullOrEmpty(request.Name))
            product.Name = request.Name;
        
        if (!string.IsNullOrEmpty(request.Description))
            product.Description = request.Description;
        
        if (request.Price.HasValue)
            product.Price = request.Price.Value;
        
        if (!string.IsNullOrEmpty(request.Category))
            product.Category = request.Category;
        
        if (!string.IsNullOrEmpty(request.Brand))
            product.Brand = request.Brand;
        
        if (!string.IsNullOrEmpty(request.ImageUrl))
            product.ImageUrl = request.ImageUrl;
        
        if (request.AdditionalImages != null)
            product.AdditionalImages = request.AdditionalImages;
        
        if (request.StockQuantity.HasValue)
            product.StockQuantity = request.StockQuantity.Value;
        
        if (request.IsAvailable.HasValue)
            product.IsAvailable = request.IsAvailable.Value;

        await _context.SaveChangesAsync();
        return MapToDto(product);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<string>> GetCategoriesAsync()
    {
        return await _context.Products
            .Where(p => p.IsAvailable)
            .Select(p => p.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();
    }

    public async Task<List<string>> GetBrandsAsync()
    {
        return await _context.Products
            .Where(p => p.IsAvailable)
            .Select(p => p.Brand)
            .Distinct()
            .OrderBy(b => b)
            .ToListAsync();
    }

    private static ProductDto MapToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Category = product.Category,
            Brand = product.Brand,
            ImageUrl = product.ImageUrl,
            AdditionalImages = product.AdditionalImages,
            StockQuantity = product.StockQuantity,
            IsAvailable = product.IsAvailable,
            CreatedAt = product.CreatedAt
        };
    }
}
