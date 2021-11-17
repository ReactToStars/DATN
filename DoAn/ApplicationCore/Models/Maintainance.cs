using System;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Bảng bảo trì
    /// </summary>
    /// Created By NTHung (13/11/2021)
    public class Maintainance:BaseEntity
    {
        public Maintainance()
        {
            this.MaintainanceID = new Guid();
        }

        public Guid MaintainanceID { get; set; }
        [Required("Mã phòng TNTH", "Mã phòng thực hành không được để trống")]
        [Duplicate("Mã phòng TNTH", "Mã phòng thực hành đã tồn tại trong hệ thống!")]
        public Guid PraticalLaboratoryID{ get; set; }
        public Nullable<DateTime> StartedDate{ get; set; }
        public Nullable<DateTime> EndedDate{ get; set; }

        [Required("Mã cán bộ kỹ thuật", "Mã cán bộ kỹ thuật không được để trống")]
        public Guid TechnicalStaffID{ get; set; }
    }
}
