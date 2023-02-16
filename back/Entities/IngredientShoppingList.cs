using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class IngredientShoppingList
    {
        public int IngredientId { get; set; }
        public int ShoppingListId { get; set; }
        public float Quantity { get; set; }
        public Unit Unit { get; set; }
        public bool isChecked { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public virtual ShoppingList ShoppingList { get; set; }
    }
}