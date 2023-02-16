using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class MealMacro
    {
        [ForeignKey("Meal")]
        public int Id { get; set; }
        public int Kcal { get; set; }
        public int Proteins { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public virtual Meal Meal { get; set; }
    }
}