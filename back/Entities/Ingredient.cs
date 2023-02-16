using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string IngredientName { get; set; }
        public virtual ICollection<MealIngredient> MealIngredients { get; set; }
        public virtual ICollection<IngredientShoppingList> IngredientShoppingLists { get; set; }
    }
}