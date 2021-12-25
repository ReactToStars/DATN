using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// học phần
    /// </summary>
    public class Module : BaseEntity
    {
        public Module()
        {
            ModuleID = new Guid();
        }
        public Guid ModuleID { get; set; }
        [Duplicate("Mã học phần", "Mã học phần đã tồn tại trong hệ thống !")]
        [Required("Mã học phần", "Thông tin mã học phần không được để trống !")]
        [MaxLength("Mã học phần", 20)]
        public string ModuleCode { get; set; }
        [Duplicate("Tên học phần", "Tên học phần đã tồn tại trong hệ thống !")]
        [Required("Tên học phần", "Thông tin tên học phần không được để trống !")]
        public string ModuleName { get; set; }
        [Required("Số tín chỉ", "Thông tin số tín chỉ không được để trống!")]
        public float? NumberOfModule { get; set; }
        [Required("Số tín chỉ LT", "Thông tin số tín chỉ LT không được để trống !")]
        public float? Theory { get; set; }
        [Required("Số tín chỉ TH", "Thông tin số tín chỉ TH không được để trống !")]
        public float? Practice { get; set; }
        [Required("Số tín chỉ TL-BTL-DA", "Thông tin số tín chỉ TL-BTL-DA không được để trống !")]
        public float? BigExercise { get; set; }
        [Required("Bộ môn", "Thông tin bộ môn không được để trống !")]
        public Guid? SubjectID { get; set; }
        public string SubjectName { get; set; }
        public string ModuleClassCode { get; set; }

        //public Guid? TeacherID { get; set; }
        //public string FullName { get; set; }
    }
}
