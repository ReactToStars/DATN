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
    public class SemesterRepository : BaseRepository<Semester>, ISemesterRepository
    {
        public SemesterRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
