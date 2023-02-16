using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Diet_planner.DTOs
{
    public class MacroUpdateDto
    {
        public int Kcal { get; set; }
        public int Proteins { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
    }
}