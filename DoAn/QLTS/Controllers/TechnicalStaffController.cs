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
    
    public class TechnicalStaffController : BaseEntityController<TechnicalStaff>
    {
        ITechnicalStaffService _technicalStaffService;
        public TechnicalStaffController(ITechnicalStaffService technicalStaffService):base(technicalStaffService)
        {
            this._technicalStaffService = technicalStaffService;
        }

        public override List<TechnicalStaff> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<TechnicalStaff> ListObject = new List<TechnicalStaff>();

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
                    ListObject.Add(new TechnicalStaff()
                    {
                        TechnicalStaffCode = worksheet.Cells[row, 2].Value.ToString(),
                        FullName = worksheet.Cells[row, 3].Value.ToString(),
                        PhoneNumber = worksheet.Cells[row, 4].Value.ToString(),
                        Email = worksheet.Cells[row, 5].Value.ToString(),
                    });
                }
            }
            return ListObject;
        }
    }
}
