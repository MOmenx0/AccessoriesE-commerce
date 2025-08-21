using AccessoriesEcommerce.API.Models;

namespace AccessoriesEcommerce.API.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    bool ValidateToken(string token);
    int GetUserIdFromToken(string token);
}
