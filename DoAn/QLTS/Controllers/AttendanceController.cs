using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DATN.Controllers
{
    public class AttendanceController : BaseEntityController<Attendance>
    {
        IAttendanceService _attendanceService;
        public AttendanceController(IAttendanceService baseService) : base(baseService)
        {
            this._attendanceService = baseService;
        }

        public override string GetRole()
        {
            string role = "Admin";
            string roleAccount = HttpContext.Session.GetString("Role");
            if(roleAccount == "Teacher")
            {
                role = roleAccount;
            }
            if(roleAccount != "Admin" && roleAccount != "Teacher")
            {
                role = "";
            }
            return role;
        }
    }
}
