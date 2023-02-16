using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Entities;

namespace API_Diet_planner.DTOs
{
    public class MealDto
    {
        public int Id { get; set; }
        public string MealName { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public CategoryDto Category { get; set; }
        public MealMacroDto MealMacro { get; set; }
        public virtual ICollection<MealIngredientDto> MealIngredients { get; set; }
        public virtual PhotoDto Photo { get; set; }
    }
}