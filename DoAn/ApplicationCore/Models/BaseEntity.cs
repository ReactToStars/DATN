using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Attribute kiểu tra dữ liệu trống
    /// </summary>
    /// CreatedBy(19/1/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {
        public string RequiredName { get; set; }
        public string RequiredMessenger { get; set; }

        public Required(string name, string messenger)
        {
            this.RequiredName = name;
            this.RequiredMessenger = messenger;
        }
    }
    /// <summary>
    /// Attribute kiểu tra dữ liệu trùng
    /// </summary>
    /// CreatedBy(19/1/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class Duplicate : Attribute
    {
        public string DuplicateName { get; set; }
        public string DuplicateMessenger { get; set; }

        public Duplicate(string name, string messenger)
        {
            this.DuplicateName = name;
            this.DuplicateMessenger = messenger;
        }
    }
    /// <summary>
    /// Attribute kiểu tra độ dài dữ liệu
    /// </summary>
    /// CreatedBy: NDTUNG(19/1/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public string MaxLengthName { get; set; }
        public int Length { get; set; }
        public string MaxLengthMessenger { get; set; }
        public MaxLength(string name,int length, string messenger=null)
        {
            this.MaxLengthName = name;
            this.Length = length;
            this.MaxLengthMessenger = messenger;
        }

    }
    /// <summary>
    /// Attribute kiểu tra định dạng Email
    /// </summary>
    /// CreatedBy: NDTUNG(22/1/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class Email : Attribute
    {
        public string EmailName { get; set; }
        public string EmailMessenger { get; set; }
        public Email(string name, string messenger = null)
        {
            this.EmailName = name;
            this.EmailMessenger = messenger;
        }

    }

    /// <summary>
    /// Class dùng chung cho khách hàng và nhân viên
    /// </summary>
    /// CreatedBy: NDTUNG (19/1/2021)
    public class BaseEntity
    {
        /// <summary>
        /// Trạng thái add hoặc updtate
        /// </summary>
        /// CreatedBy:NDTUNG(19/1/2021)
        public EntityState EntityState { get; set; } = EntityState.AddNew;

        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
