using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.DTOs;
using API_Diet_planner.Entities;
using AutoMapper;

namespace API_Diet_planner.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<DayPlan, DayPlanDto>();
            CreateMap<Meal, MealDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<MacroUpdateDto, Macro>();
            CreateMap<Macro, MacroUpdateDto>();
            CreateMap<MealMacro, MealMacroDto>();
            CreateMap<MealIngredient, MealIngredientDto>();
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<ShoppingList, ShoppingListDto>();
            CreateMap<IngredientShoppingList, IngredientShoppingListDto>();
            CreateMap<Unit, UnitDto>();
        }
    }
}