using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    public class @Class : BaseEntity
    {
        /// <summary>
        /// Bảng lớp học
        /// </summary>
        public @Class()
        {
            ClassID = new Guid();
            StudentID = new Guid();
            MajorsID = new Guid();
        }

        public Guid ClassID { get; set; }
        [Duplicate("Mã lớp", "Mã lớp đã tồn tại trong hệ thống !")]
        [Required("Mã lớp", "Thông tin mã lớp không được để trống !")]
        [MaxLength("Mã lớp", 20)]
        public string ClassCode { get; set; }
        [Required("Tên lớp", "Thông tin tên lớp không được để trống !")]
        public string ClassName { get; set; }
        [Required("Khóa học", "Thông tin khóa học không được để trống !")]

        public Guid? CourseID { get; set; }
        [Required("Ngành học", "Thông tin ngành học không được để trống !")]

        public Guid? MajorsID { get; set; }
        public string MajorsName { get; set; }
        public string MajorsCode { get; set; }
        public string CourseName { get; set; }

        public Guid? StudentID { get; set; }
        public string FullName { get; set; }
    }

}
