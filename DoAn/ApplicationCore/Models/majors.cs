using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin ngành
    /// </summary>
    public class Majors : BaseEntity
    {
        public Majors()
        {
            MajorsID = new Guid();
        }

        public Guid MajorsID { get; set; }
        [Duplicate("Mã ngành", "Mã ngành đã tồn tại trong hệ thống !")]
        [Required("Mã ngành ", "Thông tin mã ngành không được để trống !")]
        [MaxLength("Mã ngành ", 20)]
        public string MajorsCode { get; set; }
        [Duplicate("Tên ngành ", "Tên ngành đã tồn tại trong hệ thống !")]
        [Required("Tên ngành ", "Thông tin tên ngành không được để trống !")]
        public string MajorsName { get; set; }
        public Guid? OlogyID { get; set; }
        public string OlogyName { get; set; }
    }
}
