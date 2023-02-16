using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class MealIngredient
    {
        public int MealId { get; set; }
        public int IngredientId { get; set; }
        public float Quantity { get; set; }
        public Unit Unit { get; set; }
        public virtual Meal Meal { get; set; }
        public virtual Ingredient Ingredient { get; set; }
    }
}