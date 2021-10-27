using Microsoft.AspNetCore.Mvc;
using ApplicationCore;
using ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DATN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        #region Declare
        IBaseService<TEntity> _baseService;
        protected string _controllerName;

        #endregion
        #region Constructor
        public BaseEntityController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
            _controllerName = typeof(TEntity).Name;
        }
        #endregion
        #region API
        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>Dánh sách dữ liệu</returns>
        /// CreatedBy: NDTUNG(6/1/2021)
        [HttpGet]
        public IActionResult Get()
        {
            var acount = HttpContext.Session.GetString("Role");
            if (!string.IsNullOrEmpty(acount))
            {
                if (acount != "Admin" && _controllerName == "User")
                {
                    var AcountId = Guid.Parse(HttpContext.Session.GetString("AcountID"));
                    var entities = _baseService.GetEntityById(AcountId);
                    return Ok(entities);
                }
                else
                {
                    var entities = _baseService.GetEntities();
                    return Ok(entities);
                }
            }
            else
            {
                ServiceResult _serviceResult = new ServiceResult();
                _serviceResult.Code = Code.NotImplemented;
                _serviceResult.Data = "https://" + Request.Host.Value + ("/view/login.html");
                return Ok(_serviceResult);
            }
        }

        [HttpGet("filter")]
        public IActionResult GetListDetail(Guid Id)
        {

            var entity = _baseService.GetEntities(Id);
            return Ok(entity);


        }
        [HttpGet("find")]
        public IActionResult FindObject(Guid Id)
        {
            var entity = _baseService.FindById(Id);
            return Ok(entity);
        }

        /// <summary>
        /// Lấy danh sách dữ liệu theo ID
        /// </summary>
        /// <param name="id">Id của dữ liệu</param>
        /// <returns>dữ liệu</returns>
        /// CreatedBy: NDTUNG(6/1/2021)
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            //var role = GetRole();
            //if (!string.IsNullOrEmpty(role))
            //{
            var entity = _baseService.GetEntityById(id);
            return Ok(entity);
            //}
            //else
            //{
            //    ServiceResult _serviceResult = new ServiceResult();
            //    _serviceResult.Code = Code.MethodNotAllowed;
            //    _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
            //    return Ok(_serviceResult);
            //}
        }

        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="entity">Object dữ liệu Thêm mới</param>
        /// <returns></returns>
        /// CreatedBy: NDTUNG(6/1/2021)
        [HttpPost]
        public IActionResult Post([FromBody] TEntity entity)
        {
            var role = GetRole();
            if (!string.IsNullOrEmpty(role))
            {
                if (role != "Admin" && _controllerName == "User")
                {
                    ServiceResult _serviceResult = new ServiceResult();
                    _serviceResult.Code = Code.MethodNotAllowed;
                    _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                    return Ok(_serviceResult);
                }
                else
                {
                    var serviceResult = _baseService.AddEntity(entity);
                    if (serviceResult.Code == Code.NotValid)
                    {
                        return BadRequest(serviceResult);
                    }
                    if (serviceResult.Code == Code.Success && (int)serviceResult.Data > 0)
                    {
                        return Ok(serviceResult);
                    }
                    else return BadRequest(serviceResult);

                }
            }
            else
            {
                ServiceResult _serviceResult = new ServiceResult();
                _serviceResult.Code = Code.MethodNotAllowed;
                _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                return Ok(_serviceResult);
            }
        }


        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="entity">Object dữ liệu sửa</param>
        /// <returns></returns>
        /// CreatedBy: NDTUNG(6/1/2021)
        [HttpPut]
        public IActionResult Put([FromBody] TEntity entity)
        {

            var role = GetRole();
            if (!string.IsNullOrEmpty(role))
            {
                var serviceResult = _baseService.UpdateEntity(entity);
                if (serviceResult.Code == Code.NotValid)
                {
                    return BadRequest(serviceResult);
                }
                if (serviceResult.Code == Code.Success && (int)serviceResult.Data > 0)
                {
                    return Ok(serviceResult);
                }
                else return BadRequest(serviceResult);
            }
            else
            {
                ServiceResult _serviceResult = new ServiceResult();
                _serviceResult.Code = Code.MethodNotAllowed;
                _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                return Ok(_serviceResult);
            }
        }


        /// <summary>
        /// Xóa dữ liệu theo mã khóa chính
        /// </summary>
        /// <param name="id">Mã khóa chính</param>
        /// <returns></returns>
        /// CreatedBy: NDTUNG(6/1/2021)
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var role = GetRole();
            if (!string.IsNullOrEmpty(role))
            {
                if (role != "Admin" && _controllerName == "User")
                {
                    ServiceResult _serviceResult = new ServiceResult();
                    _serviceResult.Code = Code.MethodNotAllowed;
                    _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                    return Ok(_serviceResult);
                }
                else
                {
                    var res = _baseService.DeleteEntity(id);
                    return Ok(res);
                }
            }
            else
            {
                ServiceResult _serviceResult = new ServiceResult();
                _serviceResult.Code = Code.MethodNotAllowed;
                _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                return Ok(_serviceResult);
            }
        }
        #endregion

        /// <summary>
        /// Hàm import file data
        /// </summary>
        /// <param name="file"></param>
        /// <param name="hostingEnvironment"></param>
        /// <returns></returns>

        [HttpPost("UploadFile")]
        public IActionResult readAndGetFile(IFormFile file, [FromServices] IHostingEnvironment hostingEnvironment)
        {
            var role = GetRole();
            if (!string.IsNullOrEmpty(role))
            {
                ServiceResult _serviceResult = new ServiceResult();
                string fileName = $"{(hostingEnvironment.WebRootPath)}{@"\Content\files"}" + "\\" + file.FileName;
                using (FileStream fileStream = System.IO.File.Create(fileName))
                {
                    file.CopyTo(fileStream);
                    fileStream.Flush();
                }

                var listObject = GetListObject(file.FileName);
                var listService = importFile(listObject);
                if (listService.Count == 0)
                {
                    _serviceResult.Code = Code.NotValid;
                    _serviceResult.Messenger = "File dữ liệu import không được để trống!";
                }
                else
                {
                    Boolean isValidate = true;
                    int i = 0;
                    var arrayError = new List<string>();
                    foreach (var item in listService)
                    {
                        if (item.Code == Code.NotValid || ((int)item.Data) == 0)
                        {
                            i++;
                            arrayError.Add("Dữ liệu dòng số " + i + " không hợp lệ!");
                            isValidate = false;
                        }
                    }
                    if (isValidate)
                    {
                        _serviceResult.Code = Code.Success;
                        _serviceResult.Data = i;
                        _serviceResult.Messenger = "Bạn đã impore dữ liệu thành công!";
                    }
                    else
                    {
                        _serviceResult.Code = Code.NotValid;
                        _serviceResult.Data = arrayError;
                        _serviceResult.Messenger = "Trong file có tồn tại dữ liệu không hợp lệ!";
                    }
                }
                return Ok(_serviceResult);
            }
            else
            {
                ServiceResult _serviceResult = new ServiceResult();
                _serviceResult.Code = Code.MethodNotAllowed;
                _serviceResult.Messenger = "Bạn không có quyền sử dụng chức năng này !";
                return Ok(_serviceResult);
            }
        }

        /// <summary>
        /// Hàm lưu từng dòng danh sách file import
        /// </summary>
        /// <param name="listObject"></param>
        /// <returns></returns>
        public List<ServiceResult> importFile(List<TEntity> listObject)
        {
            List<ServiceResult> listResult = new List<ServiceResult>();
            foreach (var item in listObject)
            {
                listResult.Add(_baseService.AddEntity(item));
            }

            return listResult;
        }
        /// <summary>
        /// Hàm lấy danh dách trong file excel
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public virtual List<TEntity> GetListObject(string fileName)
        {
            List<TEntity> ListObject = new List<TEntity>();

            return ListObject;
        }

        /// <summary>
        /// Hàm kiểm tra quyền
        /// </summary>
        /// <returns></returns>
        public virtual string GetRole()
        {
            string role = "";
            var roleAcount = HttpContext.Session.GetString("Role");
            if (roleAcount == "Admin")
            {
                role = "Admin";
            }
            return role;
        }
    }
}
