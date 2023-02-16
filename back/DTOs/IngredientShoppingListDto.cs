using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class IngredientShoppingListDto
    {
        public int ShoppingListId { get; set; }
        public int IngredientId { get; set; }
        public float Quantity { get; set; }
        public UnitDto Unit { get; set; }
        public bool isChecked { get; set; }
        public virtual IngredientDto Ingredient { get; set; }
    }
}