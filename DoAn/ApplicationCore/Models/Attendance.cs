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
        public Guid SubjectID { get; set; }
        public string SubjectName{ get; set; }
        public Guid PracticeGroupID { get; set; }
        public string PracticeGroupName{ get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public int AttendanceStatus { get; set; }
    }
}
