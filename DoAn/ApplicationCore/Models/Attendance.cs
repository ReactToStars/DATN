using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ApplicationCore.Models
{
    public class Attendance : BaseEntity
    {
        public Guid AttendanceID { get; set; }
        public Guid StudentID { get; set; }
        public string StudentCode { get; set; }
        public string FullName { get; set; }
        public Guid PracticeScheduleID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Description { get; set; }
        public int AttendanceStatus { get; set; }
    }
}
