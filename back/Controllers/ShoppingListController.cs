using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API_Diet_planner.Data;
// using API_Diet_planner.Data.Migrations;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_Diet_planner.Controllers
{
    public class ShoppingListController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ShoppingListController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingListDto>>> GetShoppingLists()
        {
            return await _context.ShoppingLists
            .Include(a => a.AppUser)
            .Include(c => c.IngredientShoppingLists)
            .ThenInclude(i=>i.Ingredient)
            .ProjectTo<ShoppingListDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        [HttpGet("{dayDate}")]
        public async Task<ActionResult<ShoppingListDto>> GetShoppingListByDate(string dayDate)
        {
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.Name)?.Value);

            return await _context.ShoppingLists
            .Where(x => x.AppUser.Id == userId && x.DayDate == DateTime.Parse(dayDate))
            .ProjectTo<ShoppingListDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
        }

        [HttpPut("{shoppingListId}/{ingredientId}/{isChecked}")]
        public async Task<ActionResult<IngredientShoppingList>> UpdateIsChecked(int shoppingListId, int ingredientId, bool isChecked)
        {
            var ingredientShoppingList = await _context.IngredientShoppingLists.FirstOrDefaultAsync(x => (x.ShoppingListId == shoppingListId && x.IngredientId == ingredientId));
            if(ingredientShoppingList != null)
            {
                ingredientShoppingList.isChecked = isChecked;
            }
            _context.Entry(ingredientShoppingList).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return ingredientShoppingList;
        }

        [HttpDelete("{shoppingListId}/{ingredientId}")]
        public async Task<ActionResult<IngredientShoppingList>> RemoveIngredient(int shoppingListId, int ingredientId)
        {
            var ingredientShoppingList = await _context.IngredientShoppingLists.FirstOrDefaultAsync(x => 
            (x.ShoppingListId == shoppingListId  && x.IngredientId == ingredientId));

            if(ingredientShoppingList != null)
                _context.IngredientShoppingLists.Remove(ingredientShoppingList);

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ShoppingList>> InsertIngredient(CreateShoppingListDto shoppingListDto)
        {
            // if(await MealExists(mealDto.MealName)) return BadRequest("Meal exists");
            var userId = Int32.Parse(User.FindFirst(ClaimTypes.Name)?.Value);
            AppUser appUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            ShoppingList shoppingList = await _context.ShoppingLists.FirstOrDefaultAsync(x => (x.DayDate == System.DateTime
            .Parse(shoppingListDto.DayDate) && x.AppUser.Id == userId));

            if(shoppingList == null)
            {
                shoppingList = new ShoppingList
                {
                    AppUser = appUser,
                    DayDate = DateTime.Parse(shoppingListDto.DayDate),
                };
            }


            foreach(var ing in shoppingListDto.IngredientShoppingLists)
            {
                Ingredient ingredient1 = await _context.Ingredients.FirstOrDefaultAsync(x => x.IngredientName.ToLower() == ing.Ingredient.IngredientName.ToLower());
                // if(ingredient1 == null)
                // {
                //     ingredient1 = new Ingredient
                //     {
                //         IngredientName = ing.IngredientName
                //     };

                // }

                var ingredientShoppingList = await _context.IngredientShoppingLists.FirstOrDefaultAsync(x => x.Ingredient == ingredient1 && x.ShoppingList == shoppingList);

                var unit = await _context.Units.FirstOrDefaultAsync(x=>x.UnitName.ToLower() == ing.Unit.UnitName.ToLower());

                if(ingredientShoppingList == null || ingredientShoppingList.Unit.UnitName != ing.Unit.UnitName)
                {
                    ingredientShoppingList = new IngredientShoppingList
                    {
                        ShoppingList  = shoppingList,
                        Ingredient = ingredient1,
                        Quantity = ing.Quantity,
                        Unit = unit,
                        isChecked = false
                    };
                    _context.IngredientShoppingLists.Add(ingredientShoppingList);
                }
                else
                {
                    ingredientShoppingList.ShoppingList = shoppingList;
                    ingredientShoppingList.Quantity += ing.Quantity;
                    ingredientShoppingList.isChecked = false;
                    _context.Entry(ingredientShoppingList).State = EntityState.Modified;
                }
            }



            await _context.SaveChangesAsync();

            return NoContent();

            // return new CategoryDto
            // {
            //     CategoryName = category.CategoryName,
            //     Description = category.Description
            // };
        }
    }
}