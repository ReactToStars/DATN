using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin Khoa
    /// </summary>
    public class SchoolYear : BaseEntity
    {
        public SchoolYear()
        {
            SchoolYearID = new Guid();
        }

        public Guid SchoolYearID { get; set; }

        [Duplicate("Năm học", "Năm học đã tồn tại trong hệ thống !")]
        [Required("Năm học", "Thông tin năm học không được để trống !")]
        public string SchoolYearName { get; set; }
    }
}
