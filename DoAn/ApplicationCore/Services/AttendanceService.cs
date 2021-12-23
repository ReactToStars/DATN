using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class AttendanceService : BaseService<Attendance>, IAttendanceService
    {
        protected IAttendanceRepository _attendanceRepository;
        public AttendanceService(IAttendanceRepository baseRepository) : base(baseRepository)
        {
            this._attendanceRepository = baseRepository;
        }
    }
}
