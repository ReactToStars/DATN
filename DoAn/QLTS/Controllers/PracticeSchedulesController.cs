using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace DATN.Controllers
{
    public class PracticeSchedulesController : BaseEntityController<PracticeSchedule>
    {
        IPracticeScheduleService _practiceScheduleService;
        public PracticeSchedulesController(IPracticeScheduleService practiceScheduleService) : base(practiceScheduleService)
        {
            this._practiceScheduleService = practiceScheduleService;
        }

        
    }
}
