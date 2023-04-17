using Ecommerceapi.Data;
using Ecommerceapi.Dto;
using Ecommerceapi.Model;
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
           
                 return await _db.carts
                .Select(c => new CartViewDto
                {
                    Id = c.Id,
                    Product = new() 
                    { 
                    Id = c.product.Id,
                    Name = c.product.Name,
                    Description = c.product.Description,
                    Category = new CategoryViewDto()
                    {
                        Id = c.product.CategoryId,
                        Name = c.product.Category.Name,
                        Description = c.product.Category.Description
                    },
                    Available = c.product.Available,
                    Price = c.product.Price,
                    },

                    ApplicationUser = new ()
                    {
                        Id = c.ApplicationUserId,
                        Name = c.ApplicationUser.Name,
                        Email = c.ApplicationUser.Email,
                        Dob = c.ApplicationUser.Dob
                    }

                }).ToListAsync();




        }

    }

}

