using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin Khoa
    /// </summary>
    public class Semester:BaseEntity
    {
        public Semester()
        {
            SemesterID = new Guid();
        }

        public Guid SemesterID { get; set; }

        [Duplicate("Học kỳ", "Học kỳ đã tồn tại trong hệ thống !")]
        [Required("Học kỳ", "Thông tin học kỳ không được để trống !")]
        public string SemesterName { get; set; }
    }
}
