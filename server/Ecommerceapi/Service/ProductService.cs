using Ecommerceapi.Data;
using Ecommerceapi.Dto;
using Ecommerceapi.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.X509Certificates;

namespace Ecommerceapi.Service
{
    public class ProductService
    {
        private readonly ApplicationDbContext _db;
        public ProductService(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<ProductViewDto> CreateProductAsync(ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                Available = dto.Available,
                Price = dto.Price

            };
            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return new ProductViewDto
            {   
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Category = null,
                Available = product.Available,
                Price = product.Price,
            };
        }
        public async Task<List<ProductViewDto>> GetAllProductAsync()
        {
            return await _db.Products
                .Select(p => new ProductViewDto
                {
                    Id= p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Category = new CategoryViewDto()
                    {
                        Id = p.CategoryId,
                        Name = p.Category.Name,
                        Description = p.Category.Description
                    },
                    Available = p.Available,
                    Price = p.Price,
                }
                ).ToListAsync();
        }
        public async Task<ProductViewDto?> GetIdAsync(int id)
        {
           Product? product = await _db.Products.FindAsync(id);
            return product == null ? null : new ProductViewDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Category = new CategoryViewDto()
                {
                    Id = product.CategoryId,
                    Name = product.Category.Name
                },
                Available = product.Available,
                Price = product.Price,
            };
        }

        public async Task<bool> UpdatesProductAsync(int id, ProductCreateDto obj)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }
    
            product.Name = obj.Name;
            product.Description = obj.Description;
            product.CategoryId = obj.CategoryId;
            product.Available = obj.Available;
            product.Price = obj.Price;

            _db.Products.Update(product);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductAsync(int Id)
        {
            var product = await _db.Products.FindAsync(Id);
            if (product == null)
            {
                return false;
            }
            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<List<ProductViewDto>> GetByCategoryIdasync(int Id)
        {
            return await _db.Products
                .Where(c => c.CategoryId == Id)
                .Select(p => new ProductViewDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Category = new CategoryViewDto()
                    {
                        Id = p.CategoryId,
                        Name = p.Category.Name
                    },
                    Available = p.Available,
                    Price = p.Price,
                    
                }
                ).ToListAsync();
        }
    }
}
