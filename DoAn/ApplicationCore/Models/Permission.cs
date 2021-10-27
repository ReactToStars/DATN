using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin Khoa
    /// </summary>
    public class Permission : BaseEntity
    {
        public Permission()
        {
            PermissionID = new Guid();
        }

        public Guid PermissionID { get; set; }
        public string PermissionName { get; set; }
    }
}
