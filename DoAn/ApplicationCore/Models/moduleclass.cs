using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Lớp học phần
    /// </summary>
    public class ModuleClass : BaseEntity
    {
        public ModuleClass()
        {
            ModuleClassID = new Guid();
            ModuleID = new Guid();
        }
        public Guid ModuleClassID { get; set; }
        [Duplicate("Mã lớp học phần", "Mã lớp học phần đã tồn tại trong hệ thống!")]
        [Required("Mã lớp học phần", "Thông tin mã lớp học phần không được để trống!")]
        [MaxLength("Mã lớp học phần", 20)]
        public string ModuleClassCode { get; set; }
        public Guid? ModuleID { get; set; }
        [Required("Học kỳ", "Thông tin học kỳ không được để trống!")]
        public Guid SemesterID { get; set; }
        public string SemesterName { get; set; }
        [Required("Trạng thái", "Thông tin trạng thái không được để trống!")]
        public int? Status { get; set; }
        [Required("Thời gian bắt đầu", "Thông tin thời gian bắt đầu không được để trống !")]

        public DateTime StartTime { get; set; }
        [Required("Thời gian kết thúc", "Thông tin thời gian kết thúc không được để trống !")]

        public DateTime EndTime { get; set; }
        public string ModuleName { get; set; }
        public string ModuleCode { get; set; }
        public string SubjectName { get; set; }
        public string FullName { get; set; }
        public int NumberOfModule { get; set; }

        [Required("Giảng viên", "Thông tin giảng viên không được để trống!")]
        public Guid TeacherID { get; set; }
        [Required("Năm học", "Thông tin năm học không được để trống!")]
        public Guid SchoolYearID { get; set; }
        public string SchoolYearName { get; set; }
    }
}
