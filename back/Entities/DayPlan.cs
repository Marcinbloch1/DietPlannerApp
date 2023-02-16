using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.Entities
{
    public class DayPlan
    {
        public DayPlan()
        {
            this.Meals = new HashSet<Meal>();
        }
        public int Id { get; set; }
        public System.DateTime DayDate { get; set; }
        public AppUser AppUser { get; set; }
        public virtual ICollection<Meal> Meals { get; set; }
    }
}