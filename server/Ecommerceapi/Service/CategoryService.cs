using Ecommerceapi.Data;
using Ecommerceapi.Dto;
using Ecommerceapi.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerceapi.Service
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _db;

        public CategoryService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<CategoryViewDto>> GetAllAsync()
        {
            return await _db.Categories
                .Select(c => new CategoryViewDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                })
                .ToListAsync();

        }

        public async Task<CategoryViewDto?> GetByIdAsync(int id)
        {
            Category? category = await _db.Categories.FindAsync(id);
            return category == null ? null : new CategoryViewDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
            };
        }

        public async Task<CategoryViewDto> CreateAsync(CategoryCreateDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description,
            };

            _db.Categories.Add(category);
            await _db.SaveChangesAsync();

            return new CategoryViewDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
                return false;

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();

              return true;

        }

        public async Task<bool> UpdateAsync(int id, CategoryCreateDto dto)
        {
            var response = new CategoryCreateDto();
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
                return false;

            category.Name = dto.Name;
            category.Description = dto.Description;
            _db.Categories.Update(category);
            await _db.SaveChangesAsync();
            return true;


        }
    }
}
