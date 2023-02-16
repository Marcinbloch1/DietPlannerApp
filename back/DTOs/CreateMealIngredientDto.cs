using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class CreateMealIngredientDto
    {
        public string IngredientName { get; set; }
        public float Quantity { get; set; }
        public string UnitName { get; set; }
    }
}