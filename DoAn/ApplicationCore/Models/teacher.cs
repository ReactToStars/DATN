using System;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Giáo viên
    /// </summary>
    public class Teacher:BaseEntity
    {
        public Teacher()
        {
            TeacherID = new Guid();
        }
        public Guid TeacherID { get; set; }
        [Required("Tên giảng viên", "Thông tin tên giảng viên không được để trống !")]
        public string FullName { get; set; }
        [Duplicate("Số điện thoại", "Số điện thoại đã tồn tại trong hệ thống !")]
        [Required("Số điện thoại", "Thông tin số điện thoại không được để trống !")]
        [MaxLength("Số điện thoại", 20)]
        public string PhoneNumber { get; set; }
        [Duplicate("Email", "Email đã tồn tại trong hệ thống !")]
        [Required("Email", "Thông tin email không được để trống !")]
        public string Email { get; set; }
        public Guid? SubjectID { get; set; }
        public string SubjectName { get; set; }
    }
}
