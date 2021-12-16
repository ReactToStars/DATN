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
        public Guid PracticalLaboratoryID{ get; set; }

        public string PracticalLaboratoryName { get; set; }

        public Nullable<DateTime> StartedDate{ get; set; }
        public Nullable<DateTime> EndedDate{ get; set; }

        [Required("Mã cán bộ kỹ thuật", "Mã cán bộ kỹ thuật không được để trống")]
        public Guid TechnicalStaffID { get; set; }
        public string TechnicalStaffCode { get; set; }
        public string FullName { get; set; }

        public int MaintainanceStatus { get; set; }
        public string Description { get; set; }
    }
}
