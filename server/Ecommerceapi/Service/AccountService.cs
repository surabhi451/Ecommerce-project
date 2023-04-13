using Ecommerceapi.Data;
using Ecommerceapi.Dto;
using Ecommerceapi.Model;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Ecommerceapi.Service
{
    public class AccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        public AccountService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<bool> UserRegisterAsync(UserCreateDto obj)
        {
            var user = new ApplicationUser()
            {
                Name = obj.Name,
                Email = obj.Email,
                Dob = obj.Dob,
                PhoneNumber = obj.Phonenumber,
                UserName = Guid.NewGuid().ToString(),
            };
            var user1= await _userManager.CreateAsync(user, obj.Password);
            if (!user1.Succeeded)
            {
                return false;
            }
            await _userManager.AddToRoleAsync(user, "User");
            return true;



        }

        public async Task<string> LoginAsync(LoginDto obj)
        {
            var user = await _userManager.FindByEmailAsync(obj.Email);
            if (user == null)
            {
                return "user doesn't exist";
            }
            var signin = await _signInManager.CheckPasswordSignInAsync(user, obj.Password, true);
            if (signin.Succeeded)
            {
                string result = GenerateToken(user);
                return result;

            }
            if (signin.IsLockedOut)
                return "account is lockedout";
            else if (signin.IsNotAllowed)
               return "You are not allowed to signin.";
            else
               return "Invalid email/password.";
          
        }
        private string GenerateToken(ApplicationUser user)
        {
            var role = _userManager.GetRolesAsync(user)
                .GetAwaiter().GetResult().First();

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Name),
                new Claim(ClaimTypes .Name, user.Name),
                new Claim(ClaimTypes.Role, role)
            };

            string issuer = _configuration["jwt:Issuer"];
            string key = _configuration["jwt:Key"];
            string audience = _configuration["jwt:Audience"];

            var signinkey =new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(signinkey, "HS256");

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }

}
