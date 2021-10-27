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
    public class DetailPracticeGroupRepository : BaseRepository<DetailPracticeGroup>, IDetailPracticeGroupRepository
    {
        public DetailPracticeGroupRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
