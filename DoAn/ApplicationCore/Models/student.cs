using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Bảng sinh viên
    /// </summary>
    public class Student:BaseEntity
    {
        public Student()
        {
            StudentID = new Guid();
            ClassID = new Guid();
        }

        public Guid StudentID { get; set; }
        [Duplicate("Mã sinh viên", "Mã sinh viênn đã tồn tại trong hệ thống !")]
        [Required("Mã sinh viên", "Thông tin mã sinh viên không được để trống !")]
        public string StudentCode { get; set; }
        [Required("Họ tên sinh viên", "Thông tin họ tên sinh viên không được để trống !")]
        public string FullName { get; set; }
        [Required("Ngày tháng năm sinh", "Thông tin ngày tháng năm sinh không được để trống !")]
        public DateTime DateOfBirth { get; set; }
        public int? Gender { get; set; }
        public Guid ClassID { get; set; }
        public string ClassName { get; set; }
        public string ClassCode { get; set; }
    }
}
