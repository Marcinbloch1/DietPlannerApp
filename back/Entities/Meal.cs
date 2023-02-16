using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class Meal
    {
        public Meal()
        {
            this.DayPlans = new HashSet<DayPlan>();
        }
        public int Id { get; set; }
        public string MealName { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public Category Category { get; set; }
        public virtual ICollection<DayPlan> DayPlans { get; set; }
        public virtual MealMacro MealMacro { get; set; }
        public virtual ICollection<MealIngredient> MealIngredients { get; set; }
        public virtual Photo Photo { get; set; }

    }
}