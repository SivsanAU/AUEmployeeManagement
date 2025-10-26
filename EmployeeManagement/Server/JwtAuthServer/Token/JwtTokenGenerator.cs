using JwtAuthServer.Models;
using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JwtAuthServer.Config;

namespace JwtAuthServer.Token
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        public JWTTokenResponse ValidateAndGenerateToken(Login user)
        {
            JWTTokenResponse result = null;
            if (user.UserName == "Admin" && user.Password == "Password123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSetting["JWT:Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(issuer: ConfigurationManager.AppSetting["JWT:ValidIssuer"],
                    audience: ConfigurationManager.AppSetting["JWT:ValidAudience"], claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(6), signingCredentials: signinCredentials);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                result = new JWTTokenResponse
                {
                    Token = tokenString
                };
            }

            return result;

        }
    }
}
