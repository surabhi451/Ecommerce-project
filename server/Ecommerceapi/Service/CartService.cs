using Ecommerceapi.Data;
using Ecommerceapi.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerceapi.Service
{
    public class CartService
    {
        private readonly ApplicationDbContext _db;
        public CartService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<CartViewDto>> GetAllCartAsync()
        {
            var cart = await _db.carts

                .Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .Select(c => new CartViewDto
                {
                    Id = c.Id,
                    Product = new()
                    {
                        Id = Product.Id,
                        Name = Product.Name,
                        Description = Product.Description,
                        Category = new()
                        {
                            Id = p.Product.CategoryId,
                            Name = p.Product.Category.Name,
                            Description = p.Product.Category.Description
                        },
                        Available = Product.Available,
                        Price = Product.Price,
                    },
                    ApplicationUser = new()
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Email = c.ApplicationUser.Email,
                        PhoneNumber = c.ApplicationUser.PhoneNumber,
                        DateOfBirth = c.ApplicationUser.DateOfBirth
                    }
                }).ToListAsync();
        }

    }
}
