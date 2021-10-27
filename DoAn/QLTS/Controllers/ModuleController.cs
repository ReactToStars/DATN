
using ApplicationCore.Interface;
using ApplicationCore.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DATN.Controllers
{
    public class ModuleController : BaseEntityController<Module>
    {
        #region Declare
        IModuleService _baseService;

        #endregion
        #region Constructor
        public ModuleController(IModuleService baseService) : base(baseService)
        {
            _baseService = baseService;

        }
        #endregion

      
        public override List<Module> GetListObject(string fileName)
        {

            var filePath = $"{(Directory.GetCurrentDirectory())}{@"\wwwroot\Content\files"}" + "\\" + fileName;
            List<Module> ListObject = new List<Module>();
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
                    ListObject.Add(new Module()
                    {
                        ModuleCode = worksheet.Cells[row, 3].Value.ToString(),
                        ModuleName = worksheet.Cells[row, 4].Value.ToString(),
                        NumberOfModule = float.Parse(worksheet.Cells[row, 7].Value.ToString()),
                        Theory = float.Parse(worksheet.Cells[row, 8].Value.ToString()),
                        Practice = float.Parse(worksheet.Cells[row, 9].Value.ToString()),
                        BigExercise = float.Parse(worksheet.Cells[row, 9].Value.ToString()),
                        SubjectID = Guid.Parse(worksheet.Cells[row, 13].Value.ToString()),


                    });
                }
            }
            return ListObject;
        }
    }
}
