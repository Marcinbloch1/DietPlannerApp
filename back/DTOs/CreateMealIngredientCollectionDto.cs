using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class CreateMealIngredientCollectionDto
    {
        public ICollection<CreateMealIngredientDto> Ingredients { get; set; }
    }
}