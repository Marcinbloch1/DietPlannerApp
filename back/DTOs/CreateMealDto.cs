using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API_Diet_planner.DTOs
{
    public class CreateMealDto
    {
        public string MealName { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string CategoryName { get; set; }
        public int Kcal { get; set; }
        public int Proteins { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        // public ICollection<CreateMealIngredientDto> Ingredients { get; set; }
        public string Ingredients { get; set; }
        public IFormFile file { get; set; }
    }
}