using ApplicationCore.Interface;
using ApplicationCore.Models;
using ExcelDataReader;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
namespace DATN.Controllers
{
    public class ModuleClassController : BaseEntityController<ModuleClass>
    {
        #region Declare
        IModuleClassService _baseService;
        #endregion
        #region Constructor
        public ModuleClassController(IModuleClassService baseService) : base(baseService)
        {
            _baseService = baseService;

        }
        #endregion
        public override List<ModuleClass> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<ModuleClass> ListObject = new List<ModuleClass>();
            //Cách 1
            FileInfo fileInfor = new FileInfo(filePath);
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(fileInfor))
            {
                var date = DateTime.Now;
                var month = date.Month;
                var year = date.Year;
                month = month + 3;
                if (month > 12)
                {
                    month = month - 12;
                    year = year + 1;
                }
                DateTime EndTime = new DateTime(year, month, date.Day);
                ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
                int colums = worksheet.Dimension.End.Column;
                int rows = worksheet.Dimension.End.Row;
                for (int row = 2; row <= rows; row++)
                {
                    ListObject.Add(new ModuleClass()
                    {
                        ModuleClassCode = worksheet.Cells[row, 2].Value.ToString(),
                        ModuleCode = worksheet.Cells[row, 3].Value.ToString(),
                        SemesterID = Guid.Parse(worksheet.Cells[row, 10].Value.ToString()),
                        SchoolYearID = Guid.Parse(worksheet.Cells[row, 11].Value.ToString()),
                        Status = 0,
                        StartTime = DateTime.Now,
                        EndTime = EndTime,
                        TeacherID = Guid.Parse(worksheet.Cells[row, 12].Value.ToString()),
                    }); ;
                }
            }
            return ListObject;
        }
    }
}