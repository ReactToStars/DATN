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
    public class DetailModuleClassController : BaseEntityController<DetailModuleClass>
    {
        #region Declare
        IDetailModuleClassService _baseService;
        #endregion
        #region Constructor
        public DetailModuleClassController(IDetailModuleClassService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
        #endregion

        public override string GetRole()
        {
            string role = "Admin";
            var roleAcount = HttpContext.Session.GetString("Role");
            if (roleAcount == "Teacher")
            {
                role = "Teacher";
            }
            if(roleAcount!="Teacher" && roleAcount != "Admin")
            {
                role = "";
            }

            return role;
        }

        public override List<DetailModuleClass> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<DetailModuleClass> ListObject = new List<DetailModuleClass>();
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
                    ListObject.Add(new DetailModuleClass()
                    {
                        StudentCode = worksheet.Cells[row, 2].Value.ToString(),
                        ModuleClassCode = worksheet.Cells[row, 3].Value.ToString(),
                        FrequentPoints1 = float.Parse(worksheet.Cells[row, 4].Value.ToString()),
                        FrequentPoints2 = float.Parse(worksheet.Cells[row, 5].Value.ToString()),
                        MediumScore = float.Parse(worksheet.Cells[row, 6].Value.ToString()),
                     


                    });
                }
            }
            return ListObject;
        }
    }
}
