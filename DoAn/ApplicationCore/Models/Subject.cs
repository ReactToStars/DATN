using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Bảng bộ môn
    /// </summary>
    public class Subject : BaseEntity
    {
        public Subject()
        {
            SubjectID = new Guid();
        }
        public Guid SubjectID { get; set; }
        [Duplicate("Tên bộ môn", "Tên bộ môn đã tồn tại trong hệ thống !")]
        [Required("Tên bộ môn", "Thông tin tên bộ môn không được để trống !")]
        public string SubjectName { get; set; }
    }
}
