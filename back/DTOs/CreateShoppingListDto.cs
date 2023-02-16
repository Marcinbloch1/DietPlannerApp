using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class CreateShoppingListDto
    {
        public string DayDate { get; set; }
        // public int AppUserId { get; set; }
        public ICollection<IngredientShoppingListDto> IngredientShoppingLists { get; set; }
    }
}