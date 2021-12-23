using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class PracticeShiftRepository: BaseRepository<PracticeShift>, IPracticeShiftRepository
    {
        public PracticeShiftRepository(IConfiguration configuration):base(configuration)
        {

        }
    }
}
