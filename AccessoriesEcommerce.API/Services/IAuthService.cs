using AccessoriesEcommerce.API.DTOs;

namespace AccessoriesEcommerce.API.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<UserDto?> GetUserByIdAsync(int userId);
    Task<UserDto> GetUserFromTokenAsync(string token);
}
