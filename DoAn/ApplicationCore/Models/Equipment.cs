using System;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Trang thiết bị
    /// </summary>
    /// Created By NTHung (13/11/2021)
    public class Equipment:BaseEntity
    {
        public Equipment()
        {
            this.EquipmentID = new Guid();
        }
        public Guid EquipmentID { get; set; }

        [Required("Mã thiết bị", "Mã thiết bị không được để trống !")]
        [MaxLength("Mã nhân viên",20)]
        [Duplicate("Mã thiết bị", "Mã thiết bị đã tồn tại trong hệ thống !")]
        public string EquipmentCode { get; set; }

        [Required("Mã phòng TNTH", "Mã phòng TNTH không được để trống !")]
        public Guid PracticalLaboratoryID { get; set; }

        [Required("Tên trang thiết bị", "Tên trang thiết bị không được để trống !")]
        public string EquipmentName { get; set; }
        public string Description { get; set; }
        public int EquipmentStatus { get; set; }
    }
}
