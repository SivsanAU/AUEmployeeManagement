using JwtAuthServer.Models;


namespace JwtAuthServer.Token
{
    public interface IJwtTokenGenerator
    {
        JWTTokenResponse ValidateAndGenerateToken(Login user);
    }
}
