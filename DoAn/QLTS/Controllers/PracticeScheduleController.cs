using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class PracticeScheduleController : BaseEntityController<PracticeSchedule>
    {
        IPracticeScheduleService _practiceScheduleService;
        public PracticeScheduleController(IPracticeScheduleService practiceScheduleService):base(practiceScheduleService)
        {
            this._practiceScheduleService = practiceScheduleService;
        }

        public override string GetRole()
        {
            string role = "Admin";
            var roleAccount = HttpContext.Session.GetString("Role");
            if(roleAccount == "Teacher")
            {
                role = roleAccount;
            }
            if(roleAccount != "Admin" && roleAccount != "Teacher")
            {
                role = "";
            }
            return role;
        }

        public override List<PracticeSchedule> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<PracticeSchedule> ListObject = new List<PracticeSchedule>();
            //Cách 1
            FileInfo fileInfor = new FileInfo(filePath);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(fileInfor))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
                int colums = worksheet.Dimension.End.Column;
                int rows = worksheet.Dimension.End.Row;
                for (int row = 2; row <= rows; row++)
                {
                    ListObject.Add(new PracticeSchedule()
                    {
                        PracticeGroupID = Guid.Parse(worksheet.Cells[row, 2].Value.ToString()),
                        PracticeShiftID = Guid.Parse(worksheet.Cells[row, 3].Value.ToString()),
                        PracticalLaboratoryID = Guid.Parse(worksheet.Cells[row, 4].Value.ToString()),
                        Date = int.Parse(worksheet.Cells[row, 5].Value.ToString()),
                        SemesterID = Guid.Parse(worksheet.Cells[row, 6].Value.ToString()),
                        SchoolYearID = Guid.Parse(worksheet.Cells[row, 7].Value.ToString()),
                        Description = worksheet.Cells[row, 8].Value.ToString(),
                    });
                }
            }
            return ListObject;
        }
    }
}
