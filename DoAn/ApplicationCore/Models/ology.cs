using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin Khoa
    /// </summary>
    public class Ology:BaseEntity
    {
        public Ology()
        {
            OlogyID = new Guid();
        }

        public Guid OlogyID { get; set; }

        [Duplicate("Tên khoa", "Tên khoa đã tồn tại trong hệ thống !")]
        [Required("Tên khoa", "Thông tin tên khoa không được để trống !")]
        public string OlogyName { get; set; }
    }
}
