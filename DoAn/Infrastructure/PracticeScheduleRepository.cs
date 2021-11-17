using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public class PracticeScheduleRepository : BaseRepository<PracticeSchedule>, IPracticeScheduleRepository
    {
        
        public PracticeScheduleRepository(IConfiguration configuration) : base(configuration)
        {

        }
            
    }
}
