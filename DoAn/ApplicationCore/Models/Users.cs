using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Giáo viên
    /// </summary>
    public class User : BaseEntity
    {
        public User()
        {
            UserID = new Guid();
        }
        public Guid UserID { get; set; }
        [Required("Tên giảng viên", "Thông tin tên giảng viên không được để trống !")]
        public string FullName { get; set; }
        [Duplicate("UserName", "UserName đã tồn tại trong hệ thống !")]
        [Required("UserName", "Thông tin UserName không được để trống !")]
        public string UserName { get; set; }
        [MaxLength("PassWord", 20)]
        [Required("PassWord", "Thông tin PassWord không được để trống !")]
        public string PassWord { get; set; }
        [Duplicate("Số điện thoại", "Số điện thoại đã tồn tại trong hệ thống !")]
        [Required("Số điện thoại", "Thông tin số điện thoại không được để trống !")]
        [MaxLength("Số điện thoại", 12)]
        public string PhoneNumber { get; set; }
        [Duplicate("Email", "Email đã tồn tại trong hệ thống !")]
        [Required("Email", "Thông tin email không được để trống !")]
        public string Email { get; set; }
        public Guid? PermissionID { get; set; }
        public string PermissionName { get; set; }
    }
}
