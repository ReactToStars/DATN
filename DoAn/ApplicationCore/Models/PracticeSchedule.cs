using System;

namespace ApplicationCore.Models
{
    /// <summary>
    /// Bảng lịch thực hành
    /// </summary>
    /// Created By NTHung (13/11/2021)
    public class PracticeSchedule:BaseEntity
    {
        public PracticeSchedule()
        {
            this.PracticeScheduleID = new Guid();
        }
        public Guid PracticeScheduleID { get; set; }

        [Required("Ngày đăng ký", "Ngày đăng ký không được để trống !")]
        public DateTime Date { get; set; }

        [Required("Mã ca thực hành", "Mã ca thực hành không được để trống !")]
        public Guid PracticalShiftID { get; set; }

        [Required("Mã nhóm thực hành", "Mã nhóm thực hành không được để trống !")]
        public Guid PracticeGroupID { get; set; }

        [Required("Mã phòng TNTH", "Mã phòng thực hành không được để trống !")]
        public Guid PracticalLaboratoryID{ get; set; }

        public int Status { get; set; }

        public string Description{ get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        [Required("Mã năm học", "Mã năm học không được để trống")]
        public Guid SchoolYearID { get; set; }

        [Required("Mã học kỳ", "Mã học kỳ không được để trống")]
        public Guid SemesterID { get; set; }

    }
}
