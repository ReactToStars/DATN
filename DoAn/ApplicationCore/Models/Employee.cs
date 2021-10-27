using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Thông tin nhân viên
    /// </summary>
    /// CreatedBy: NDTUNG (13/1/2021)
    public class Employee:BaseEntity
    {
        #region Constructor
        public Employee()
        {
            EmployeeId = new Guid();
        }
        #endregion

        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EmployeeId{ get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Duplicate("Mã nhân viên","Mã nhân viên đã tồn tại trong hệ thống!")]
        [Required("Mã nhân viên","Thông tin Mã nhân viên không được để trống!")]
        [MaxLength("Mã nhân viên",20)]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        [MaxLength("Họ tên nhân viên",100)]
        [Required("Họ và tên", "Thông tin Họ và tên không được để trống!")]
        public string FullName { get; set; }
        /// <summary>
        /// Ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// CMTND/ thẻ căn cước
        /// </summary>
        [MaxLength("Số CMTND/Thẻ căn cước", 20)]
        [Duplicate("Số CMTND/Thẻ căn cước", "Số CMTND/Thẻ căn cước đã tồn tại trong hệ thống!")]
        [Required("Số CMTND/Thẻ căn cước", "Thông tin Số CMTND/Thẻ căn cước không được để trống!")]
        public string CitizenIdentityCode { get; set; }
        
        /// <summary>
        /// ngày cấp CMTND/ thẻ căn cước
        /// </summary>
        public DateTime? CitizenIdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp CMTND/ thẻ căn cước
        /// </summary>
        public string CitizenIdentityPlace { get; set; }
        [MaxLength("Email", 100)]
        [Required("Địa chỉ Email", "Địa chỉ Email không được để trống!")]
        [Email("Email")]
        public string Email { get; set; }
        [MaxLength("Số điện thoại", 20)]
        [Duplicate("Số điện thoại", "Số điện thoại đã tồn tại trong hệ thống!")]
        [Required("Số điện thoại", "Thông tin Số điện thoại không được để trống!")]
        public string PhoneNumber { get; set; }
        public Guid?  DepartmentId { get; set; }
        public Guid?  PositionId { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }
        public Decimal? Salary { get; set; }
        public DateTime? DateJoin { get; set; }

        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public int StatusJob { get; set; }
        //public DateTime? CreatedDate { get; set; }
        //public string CreatedBy { get; set; }
        //public DateTime? ModifiedDate { get; set; }
        //public string ModifiedBy { get; set; }

        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        #endregion
    }
}
