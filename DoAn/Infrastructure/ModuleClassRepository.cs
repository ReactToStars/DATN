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
    public class ModuleClassRepository : BaseRepository<ModuleClass>, IModuleClassRepository
    {
        public ModuleClassRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
