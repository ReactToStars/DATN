using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Nhóm
    /// </summary>
     public class PracticeGroup:BaseEntity
    {
        public PracticeGroup()
        {
            PracticeGroupID = new Guid();
        }

        public Guid PracticeGroupID { get; set; }
        [Duplicate("Mã nhóm", "Mã nhóm đã tồn tại trong hệ thống !")]
        [Required("Mã nhóm", "Thông tin mã nhóm không được để trống !")]
        [MaxLength("Mã nhóm", 20)]
        public string PracticeGroupCode { get; set; }
        public Guid? ModuleClassID { get; set; }
        [Required("Tên nhóm", "Thông tin tên nhóm không được để trống !")]
        public string PracticeGroupName { get; set; }
        [Required("Giảng viên", "Thông tin giảng viên không được để trống !")]
        public Guid TeacherID { get; set; }
        public string FullName { get; set; }
        public string Note { get; set; }
 
        public string ModuleClassCode { get; set; }
        public string ModuleName { get; set; }
        public string SubjectName { get; set; }

    }
}
