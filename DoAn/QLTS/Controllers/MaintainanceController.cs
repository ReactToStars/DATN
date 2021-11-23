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
    public class MaintainanceController : BaseEntityController<Maintainance>
    {
        IMaintainanceService _maintainanceService;
        public MaintainanceController(IMaintainanceService maintainanceService) : base(maintainanceService)
        {
            this._maintainanceService = maintainanceService;
        }

        public override List<Maintainance> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Maintainance> ListObject = new List<Maintainance>();

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
                    ListObject.Add(new Maintainance()
                    {
                        PracticalLaboratoryID = Guid.Parse(worksheet.Cells[row, 2].Value.ToString()),
                        StartedDate = DateTime.Parse(worksheet.Cells[row, 3].Value.ToString()),
                        EndedDate = DateTime.Parse(worksheet.Cells[row, 4].Value.ToString()),
                        TechnicalStaffID = Guid.Parse(worksheet.Cells[row, 5].Value.ToString()),
                        MaintainanceStatus = int.Parse(worksheet.Cells[row, 6].Value.ToString()),
                        Description = worksheet.Cells[row, 7].Value.ToString()
                    }) ;
                }
            }
            return ListObject;
        }
    }
}
