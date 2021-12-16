using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class StudentController : BaseEntityController<Student>
    {
        #region Declare
        IStudentService _baseService;
        #endregion
        #region Constructor
        public StudentController(IStudentService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
        public override List<Student> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Student> ListObject = new List<Student>();
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
                    ListObject.Add(new Student()
                    {
                        StudentCode = worksheet.Cells[row, 2].Value.ToString(),
                        FullName = worksheet.Cells[row, 3].Value.ToString(),
                        DateOfBirth = DateTime.Parse(worksheet.Cells[row, 4].Value.ToString()),
                        Gender = int.Parse(worksheet.Cells[row, 5].Value.ToString()),
                        ClassID = Guid.Parse(worksheet.Cells[row, 6].Value.ToString()),
                    });
                }
            }
            return ListObject;
        }
    }
}
