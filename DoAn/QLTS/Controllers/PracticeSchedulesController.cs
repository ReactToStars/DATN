using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
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

        public override string GetRole()
        {
            string role = "Admin";
            var roleAccount = HttpContext.Session.GetString("Role");
            if(roleAccount == "TechnicalStaff")
            {
                role = roleAccount;
            }
            if(roleAccount != "Admin" && roleAccount != "TechnicalStaff")
            {
                role = "";
            }
            return role;
        }
    }
}
