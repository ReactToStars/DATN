using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    public class DetailModuleClass : BaseEntity
    {
        public Guid DetailModuleClassID { get; set; }
        [Required("Lớp học phần", "Thông tin lớp học phần không được để trống !")]
        public Guid ModuleClassID { get; set; }
        [Required("Sinh viên", "Thông tin sinh viên không được để trống !")]

        [Duplicate("Mã sinh viên", "Mã sinh viên đã tồn tại trong hệ thống")]
        public Guid StudentID { get; set; }
        public float? FrequentPoints1 { get; set; }
        public float? FrequentPoints2 { get; set; }
        public float? MediumScore { get; set; }
        public string ModuleClassCode { get; set; }
        public string StudentCode { get; set; }
        public string FullName { get; set; }
        public string ClassName { get; set; }
        public string CourseName { get; set; }
        public string MajorsName { get; set; }
    }
}
