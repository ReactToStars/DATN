using System;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Bảng cán bộ kỹ thuật
    /// </summary>
    /// Created By NTHung (13/11/2021)
    public class TechnicalStaff:BaseEntity
    {
        public TechnicalStaff()
        {
            this.TechnicalStaffID = new Guid();
        }
        public Guid TechnicalStaffID { get; set; }

        [Required("Mã cán bộ kỹ thuật", "Mã cán bộ kỹ thuật không được để trống !")]
        [Duplicate("Mã cán bỗ kỹ thuật", "Mã cán bộ kỹ thuật đã tồn tại trong hệ thống")]
        [MaxLength("Mã cán bộ kỹ thuật", 20)]
        public string TechnicalStaffCode { get; set; }

        [Required("Tên cán bộ kỹ thuật", "Tên cán bộ kỹ thuật không được để trống !")]
        public string FullName { get; set; }

        [Required("Số điện thoại", "Số điện thoại không được để trống !")]
        [Duplicate("Số điện thoại", "Số điện thoại đã tồn tại trong hệ thống !")]
        [MaxLength("Số điện thoại", 12)]
        public string PhoneNumber { get; set; }

        [Duplicate("Email", "Email đã tồn tại trong hệ thống !")]
        public string Email { get; set; }
    }
}
