using Microsoft.Extensions.Configuration;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class BuildingRepository : BaseRepository<Building>, IBuildingRepository
    {
        public BuildingRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
