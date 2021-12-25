using ApplicationCore;
using ApplicationCore.Entities;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using Microsoft.AspNetCore.Hosting;
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
    public class TeacherController : BaseEntityController<Teacher>
    {
        #region Declare
        ITeacherService _baseService;
        #endregion
        #region Constructor
        public TeacherController(ITeacherService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion


        public override List<Teacher> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Teacher> ListObject = new List<Teacher>();

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
                    ListObject.Add(new Teacher()
                    {
                        TeacherCode = worksheet.Cells[row, 2].Value.ToString(),
                        FullName = worksheet.Cells[row, 3].Value.ToString(),
                        PhoneNumber = worksheet.Cells[row, 4].Value.ToString(),
                        Email = worksheet.Cells[row, 5].Value.ToString(),
                        SubjectID = Guid.Parse(worksheet.Cells[row, 6].Value.ToString()),
                    });
                }
            }
            return ListObject;
        }
    }
}
