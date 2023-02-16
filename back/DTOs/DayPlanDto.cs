using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class DayPlanDto
    {
        public DayPlanDto()
        {
            this.Meals = new HashSet<MealDto>();
        }
        public int Id { get; set; }
        public string DayDate { get; set; }
        public int appUserId { get; set; }
        public virtual ICollection<MealDto> Meals { get; set; }
    }
}