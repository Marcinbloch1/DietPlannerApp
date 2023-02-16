using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public System.DateTime DayDate { get; set; }
        public AppUser AppUser { get; set; }
        public virtual ICollection<IngredientShoppingList> IngredientShoppingLists { get; set; }
    }
}