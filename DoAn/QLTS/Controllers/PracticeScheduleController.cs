using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PracticeScheduleController : BaseEntityController<PracticeSchedule>
    {
        IPracticeScheduleService _practiceScheduleService;
        public PracticeScheduleController(IPracticeScheduleService practiceScheduleService):base(practiceScheduleService)
        {
            this._practiceScheduleService = practiceScheduleService;
        }
    }
}
