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
    public class EquipmentController : BaseEntityController<Equipment>
    {
        protected readonly IEquipmentService _equipmentService;
        public EquipmentController(IEquipmentService equipmentService):base(equipmentService)
        {
            this._equipmentService = equipmentService;
        }

        public override string GetRole()
        {
            string role = "Admin";
            var roleAcount = HttpContext.Session.GetString("Role");
            if (roleAcount == "TechnicalStaff")
            {
                role = "TechnicalStaff";
            }
            if (roleAcount == "Teacher")
            {
                role = "Teacher";
            }
            if (roleAcount != "TechnicalStaff" && roleAcount != "Admin" && roleAcount != "TechnicalStaff")
            {
                role = "";
            }

            return role;
        }

        public override List<Equipment> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Equipment> ListObject = new List<Equipment>();
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
                    ListObject.Add(new Equipment()
                    {
                        EquipmentCode = worksheet.Cells[row, 2].Value.ToString(),
                        EquipmentName = worksheet.Cells[row, 3].Value.ToString(),
                        PracticalLaboratoryID = Guid.Parse(worksheet.Cells[row, 4].Value.ToString()),
                        Description = worksheet.Cells[row, 5].Value.ToString(),
                        EquipmentStatus = int.Parse(worksheet.Cells[row, 6].Value.ToString()),
                        Quantity = int.Parse(worksheet.Cells[row, 7].Value.ToString()),



                    }) ;
                }
            }
            return ListObject;
        }
    }
}
