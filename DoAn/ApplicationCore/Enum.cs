using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore
{
    /// <summary>
    /// MISACode để xác định trạng thái của validate
    /// </summary>
    public enum Code
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,

        /// <summary>
        /// Dữ liệu không hợp lệ
        /// </summary>
        NotValid = 400,

        /// <summary>
        /// Thực hiện thành công
        /// </summary>
        Success = 200,

        /// <summary>
        /// Đăng nhập không thành công
        /// </summary>
        NotImplemented = 501,

        /// <summary>
        /// Không có quyền thực hiện
        /// </summary>
        MethodNotAllowed = 405
    }
    /// <summary>
    /// Xác định trạng thái của object
    /// </summary>
    /// CreatedBy: NDTUNG (18/1/2021)
    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete = 3
    }

    //public enum Permissions
    //{
    //    Admin = 1,
    //    Teacher = 2,
    //    Member = 3
    //}
}
