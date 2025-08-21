using System.ComponentModel.DataAnnotations;

namespace AccessoriesEcommerce.API.DTOs;

public class CreateProductRequest
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string Brand { get; set; } = string.Empty;
    
    public string ImageUrl { get; set; } = string.Empty;
    
    public List<string> AdditionalImages { get; set; } = new();
    
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
    
    public bool IsAvailable { get; set; } = true;
}

public class UpdateProductRequest
{
    [StringLength(200)]
    public string? Name { get; set; }
    
    public string? Description { get; set; }
    
    [Range(0.01, double.MaxValue)]
    public decimal? Price { get; set; }
    
    [StringLength(100)]
    public string? Category { get; set; }
    
    [StringLength(100)]
    public string? Brand { get; set; }
    
    public string? ImageUrl { get; set; }
    
    public List<string>? AdditionalImages { get; set; }
    
    [Range(0, int.MaxValue)]
    public int? StockQuantity { get; set; }
    
    public bool? IsAvailable { get; set; }
}

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> AdditionalImages { get; set; } = new();
    public int StockQuantity { get; set; }
    public bool IsAvailable { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ProductFilterRequest
{
    public string? SearchTerm { get; set; }
    public string? Category { get; set; }
    public string? Brand { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public bool? IsAvailable { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 12;
}
