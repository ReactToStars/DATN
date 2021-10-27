using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Khóa học
    /// </summary>
    public class Course:BaseEntity
    {
        public Course()
        {
            CourseID = new Guid();
        }

        public Guid CourseID { get; set; }
        [Duplicate("Tên khóa học", "Tên khóa học đã tồn tại trong hệ thống !")]
        [Required("Tên khóa học", "Thông tin tên khóa học không được để trống !")]
        public string CourseName { get; set; }
        [Required("Thời gian bắt đầu", "Thông tin thời gian bắt đầu không được để trống !")]
        public DateTime? StartTime { get; set; }
        [Required("Thời gian kết thúc", "Thông tin thời gian kết thúc không được để trống !")]
        public DateTime? EndTime { get; set; }
    }
}
