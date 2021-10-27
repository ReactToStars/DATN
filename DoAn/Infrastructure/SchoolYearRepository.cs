using ApplicationCore.Interface;
using ApplicationCore.Models;
using ApplicationCore.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Infrastructure
{
    public class SchoolYearRepository : BaseRepository<SchoolYear>, ISchoolYearRepository
    {
        public SchoolYearRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
