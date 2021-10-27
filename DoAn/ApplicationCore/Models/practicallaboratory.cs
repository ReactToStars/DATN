using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Phòng thực hành
    /// </summary>
    public class PracticalLaboratory : BaseEntity
    {

        public PracticalLaboratory()
        {
            PracticalLaboratoryID = new Guid();
        }

        public Guid PracticalLaboratoryID { get; set; }
        [Duplicate("Mã phòng thực hành", "Mã phòng thực hành đã tồn tại trong hệ thống !")]
        [Required("Mã phòng thực hành", "Thông tin mã phòng thực hành không được để trống !")]
        [MaxLength("Mã phòng thực hành", 20)]
        public string PracticalLaboratoryCode { get; set; }
        [Required("Tên phòng thực hành", "Thông tin tên phòng thực hành không được để trống !")]
        public string PracticalLaboratoryName { get; set; }
        [Required("Số chỗ", "Thông tin số chỗ không được để trống !")]
        public int? NumberOfSeats { get; set; }
        public string Description { get; set; }

        [Required("Tòa nhà", "Thông tin tòa nhà không được để trống !")]
        public Guid? BuildingID { get; set; }
        public string BuildingName { get; set; }

        [Required("Khoa", "Thông tin khoa không được để trống !")]
        public Guid? OlogyID { get; set; }
        public string OlogyName { get; set; }

        [Required("Bộ môn", "Thông tin bộ môn không được để trống !")]
        public Guid? SubjectID { get; set; }
        public string SubjectName { get; set; }

    }
}
