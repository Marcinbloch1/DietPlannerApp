using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Data;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using API_Diet_planner.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using Json.Net;

namespace API_Diet_planner.Controllers
{
    public class MealController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public MealController(DataContext context, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<IEnumerable<MealDto>>> GetMeals(int categoryId)
        {
            return await _context.Meals
            .Include(c => c.Category)
            .Include(m=>m.MealMacro)
            .Include(p=>p.Photo)
            .Include(mi=>mi.MealIngredients)
            .ThenInclude(u=>u.Unit)
            .Include(mi=>mi.MealIngredients)
            .ThenInclude(i=>i.Ingredient)
            .Where(x => x.Category.Id == categoryId)
            .ProjectTo<MealDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Meal>> InsertCategory([FromForm] CreateMealDto mealDto)
        {
            if(await MealExists(mealDto.MealName)) return BadRequest("Meal exists");

            var meme = mealDto;

            var result = await _photoService.AddPhotoAsync(mealDto.file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo  = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            var meal = new Meal
            {
                MealName = mealDto.MealName,
                Description = mealDto.Description,
                ImagePath = mealDto.ImagePath,
                Photo = photo
            };

            

            Category category = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName.ToLower() == mealDto.CategoryName.ToLower());

            if(category == null) return BadRequest("Category doesn't exists");

            meal.Category = category;

            

            var macro = new MealMacro
            {
                Kcal = mealDto.Kcal,
                Proteins = mealDto.Proteins,
                Fat = mealDto.Fat,
                Carbs = mealDto.Carbs,
            };

            meal.MealMacro=macro;
            macro.Meal=meal;

            // ICollection<CreateMealIngredientDto> ingredientsObject = JsonSerializer.Deserialize<ICollection<CreateMealIngredientDto>>(mealDto.Ingredients);
            ICollection<CreateMealIngredientDto> ingredientsObject = JsonNet.Deserialize<ICollection<CreateMealIngredientDto>>(mealDto.Ingredients);


            // foreach(var ing in mealDto.Ingredients)
            foreach(var ing in ingredientsObject)
            {
                Ingredient ingredient1 = await _context.Ingredients.FirstOrDefaultAsync(x => x.IngredientName.ToLower() == ing.IngredientName.ToLower());
                if(ingredient1 == null)
                {
                    ingredient1 = new Ingredient
                    {
                        IngredientName = ing.IngredientName
                    };

                }

                var unit = await _context.Units.FirstOrDefaultAsync(x=>x.UnitName.ToLower() == ing.UnitName.ToLower());
                if(unit == null) return  BadRequest("Unit doesn't exist");

                var mealIngredient = new MealIngredient
                {
                    Meal=meal,
                    Ingredient=ingredient1,
                    Quantity = ing.Quantity,
                    Unit = unit
                };

                _context.MealIngredients.Add(mealIngredient);
            }


            // _context.Meals.Add(meal);
            _context.MealMacros.Add(macro);


            await _context.SaveChangesAsync();

            return NoContent();

            // return new CategoryDto
            // {
            //     CategoryName = category.CategoryName,
            //     Description = category.Description
            // };
        }

        private async Task<bool> MealExists(string mealName)
        {
            return await _context.Meals.AnyAsync(x => x.MealName == mealName.ToLower());
        }
    }
}