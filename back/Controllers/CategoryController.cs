using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Controllers
{
    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        public CategoryController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> InsertCategory(CategoryDto categoryDto)
        {
            if(await CategoryExists(categoryDto.CategoryName)) return BadRequest("Category exists");

            var category = new Category
            {
                CategoryName = categoryDto.CategoryName,
                Description = categoryDto.Description
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                CategoryName = category.CategoryName,
                Description = category.Description
            };
        }

        private async Task<bool> CategoryExists(string categoryName)
        {
            return await _context.Categories.AnyAsync(x => x.CategoryName.ToLower() == categoryName.ToLower());
        }
    }
}