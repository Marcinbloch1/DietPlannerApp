using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Diet_planner.Entities;

namespace API_Diet_planner.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}