using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class CreateIngredientShoppingListDto
    {
        public string IngredientName { get; set; }
        public float Quantity { get; set; }
        public UnitDto Unit { get; set; }
        public bool isChecked { get; set; }
    }
}