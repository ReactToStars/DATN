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
    public class ClassController : BaseEntityController<@Class>
    {
        #region Declare
        IClassService _baseService;
        #endregion
        #region Constructor
        public ClassController(IClassService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion
        public override List<Class> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Class> ListObject = new List<Class>();
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
                    ListObject.Add(new Class()
                    {
                        ClassCode = worksheet.Cells[row, 2].Value.ToString(),
                        ClassName = worksheet.Cells[row, 3].Value.ToString(),
                        MajorsCode = worksheet.Cells[row, 4].Value.ToString(),
                        CourseID = Guid.Parse(worksheet.Cells[row, 5].Value.ToString()),
                    });
                }
            }
            return ListObject;
        }

    }
}
