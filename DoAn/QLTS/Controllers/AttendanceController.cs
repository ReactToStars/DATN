using ApplicationCore.Interface;
using ApplicationCore.Models;
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
    }
}
