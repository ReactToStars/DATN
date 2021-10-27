using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Tòa nhà
    /// </summary>
    public class Building:BaseEntity
    {
        public Building()
        {
            BuildingID = new Guid();
        }
        public Guid BuildingID { get; set; }
        [Duplicate("Tên tòa nhà", "Tên tòa nhà đã tồn tại trong hệ thống !")]
        [Required("Tên tòa nhà", "Thông tin tên tòa nhà không được để trống !")]
        public string BuildingName { get; set; }
        [Required("Tên cơ sở", "Thông tin cơ sở không được để trống !")]
        public string BaseBuilding { get; set; }
    }
}
