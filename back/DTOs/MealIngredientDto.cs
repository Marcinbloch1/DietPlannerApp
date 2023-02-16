using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class MealIngredientDto
    {
        public int MealId { get; set; }
        public int IngredientId { get; set; }
        public float Quantity { get; set; }
        public virtual UnitDto Unit { get; set; }
        public virtual IngredientDto Ingredient { get; set; }
    }
}