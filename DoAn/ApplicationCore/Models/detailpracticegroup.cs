using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    public class DetailPracticeGroup :BaseEntity
    {
        public Guid DetailPracticeGroupID { get; set; }
        [Required("Nhóm thực hành - thí nghiệm", "Thông tin nhóm thực hành - thí nghiệm không được để trống !")]

        public Guid PracticeGroupID { get; set; }
        [Required("Sinh viên", "Thông tin sinh viên không được để trống !")]

        public Guid StudentID { get; set; }
        public string Note { get; set; }

        public string PracticeGroupCode { get; set; }
        public string PracticeGroupName { get; set; }
        public string StudentCode { get; set; }
        public string FullName { get; set; }
        public string ClassName { get; set; }
    }
}
