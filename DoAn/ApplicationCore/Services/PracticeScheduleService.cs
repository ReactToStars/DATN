using ApplicationCore.Interface;
using ApplicationCore.Models;

namespace ApplicationCore.Services
{
    public class PracticeScheduleService : BaseService<PracticeSchedule>, IPracticeScheduleService
    {
        IPracticeScheduleRepository _practiceScheduleRepository;
        public PracticeScheduleService(IPracticeScheduleRepository practiceScheduleRepository):base(practiceScheduleRepository)
        {
            this._practiceScheduleRepository = practiceScheduleRepository;
        }
    }
}
