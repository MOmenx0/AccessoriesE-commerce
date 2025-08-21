using AccessoriesEcommerce.API.Models;

namespace AccessoriesEcommerce.API.Data;

public static class SeedData
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (context.Users.Any())
            return;

        // Create admin user
        var adminUser = new User
        {
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@accessories.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        };

        context.Users.Add(adminUser);

        // Create sample client user
        var clientUser = new User
        {
            FirstName = "John",
            LastName = "Doe",
            Email = "john@example.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
            Role = "Client",
            CreatedAt = DateTime.UtcNow
        };

        context.Users.Add(clientUser);

        // Create sample products
        var products = new List<Product>
        {
            new Product
            {
                Name = "Luxury Leather Wallet",
                Description = "Handcrafted premium leather wallet with multiple card slots and RFID protection. Perfect for everyday use.",
                Price = 89.99m,
                Category = "Wallets",
                Brand = "LuxuryLeather",
                ImageUrl = "/images/download (2).jpg",
                AdditionalImages = new List<string> { "/images/download (3).jpg", "/images/download (4).jpg" },
                StockQuantity = 50,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Designer Sunglasses",
                Description = "Elegant designer sunglasses with UV400 protection and premium frame materials. Available in multiple colors.",
                Price = 199.99m,
                Category = "Eyewear",
                Brand = "DesignerVision",
                ImageUrl = "https://via.placeholder.com/300",
                AdditionalImages = new List<string> { "https://via.placeholder.com/300", "https://via.placeholder.com/300" },
                StockQuantity = 30,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Premium Watch",
                Description = "Luxury timepiece with Swiss movement, sapphire crystal, and water resistance. A statement piece for any occasion.",
                Price = 599.99m,
                Category = "Watches",
                Brand = "LuxuryTime",
                ImageUrl = "https://via.placeholder.com/300",
                AdditionalImages = new List<string> { "https://via.placeholder.com/300", "https://via.placeholder.com/300" },
                StockQuantity = 25,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Silk Scarf",
                Description = "Hand-rolled silk scarf with intricate patterns. Perfect accessory for both casual and formal occasions.",
                Price = 79.99m,
                Category = "Scarves",
                Brand = "SilkElegance",
                ImageUrl = "https://via.placeholder.com/300",
                AdditionalImages = new List<string> { "https://via.placeholder.com/300", "https://via.placeholder.com/300" },
                StockQuantity = 40,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Leather Belt",
                Description = "Genuine leather belt with premium buckle. Available in multiple sizes and colors.",
                Price = 69.99m,
                Category = "Belts",
                Brand = "LeatherCraft",
                ImageUrl = "https://via.placeholder.com/300",
                AdditionalImages = new List<string> { "https://via.placeholder.com/300", "https://via.placeholder.com/300" },
                StockQuantity = 35,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            },
            new Product
            {
                Name = "Jewelry Box",
                Description = "Elegant jewelry box with velvet lining and multiple compartments. Perfect for organizing precious accessories.",
                Price = 149.99m,
                Category = "Storage",
                Brand = "LuxuryStorage",
                ImageUrl = "https://via.placeholder.com/300",
                AdditionalImages = new List<string> { "https://via.placeholder.com/300", "https://via.placeholder.com/300" },
                StockQuantity = 20,
                IsAvailable = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        context.Products.AddRange(products);

        await context.SaveChangesAsync();
    }
}
