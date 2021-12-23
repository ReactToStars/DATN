using ApplicationCore;
using ApplicationCore.Entities;
using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Text.RegularExpressions;

namespace ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        #region Declare
        protected readonly IBaseRepository <TEntity> _baseRepository;
        protected readonly ServiceResult _serviceResult;
        #endregion
        #region Constructor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { Code = Code.Success };
        }
        #endregion
        #region Method
        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi thêm mới được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public virtual ServiceResult AddEntity(TEntity entity)
        {
            //thực hiện validate
            var isValidate = Validate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.AddEntity(entity);
                _serviceResult.Code = Code.Success;
                _serviceResult.Messenger = Properties.Resources.msg_Insert;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <param name="entityId">Khóa chính</param>
        /// <returns>Trả về số bản ghi xóa được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public ServiceResult DeleteEntity(Guid entityId)
        {
            _serviceResult.Data = _baseRepository.DeleteEntity(entityId);
            _serviceResult.Code = Code.Success;
            _serviceResult.Messenger = Properties.Resources.msg_Delete;
            return _serviceResult;
        }

        //Lấy danh sách dữ liệu
        /// <summary>
        /// Lấy toàn bộ danh sách dữ liệu 
        /// </summary>
        /// <returns>Danh sách dữ liệu</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        public IEnumerable<TEntity> GetEntities()
        {
            return _baseRepository.GetEntities();
        }

        public IEnumerable<TEntity> GetEntities(Guid entityId)
        {
            return _baseRepository.GetEntities(entityId);
        }
        /// <summary>
        /// Lấy dữ liệu theo mã khóa chính
        /// </summary>
        /// <param name="entityID">Khóa chính</param>
        /// <returns>object dữ liệu đầu tiên lấy được</returns>
        /// CreatedBy: NDTUNG (11/1/2021)
        public TEntity GetEntityById(Guid entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }
        public TEntity FindById(Guid entityId)
        {
            return _baseRepository.FindById(entityId);
        }

        /// <summary>
        /// Cập nhật dữ liệu
        /// </summary>
        /// <param name="entity">object dữ liệu</param>
        /// <returns>Trả về số bản ghi cập nhật được</returns> 
        /// CreatedBy: NDTUNG (11/1/2021)
        public ServiceResult UpdateEntity(TEntity entity)
        {
            entity.EntityState = EntityState.Update;
            var isValidate = Validate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.UpdateEntity(entity);
                _serviceResult.Messenger = Properties.Resources.msg_Update;
                _serviceResult.Code = Code.Success;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        /// <summary>
        /// Hàm check Validae dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy:NDTUNG(16/1/2021)
        private bool Validate(TEntity entity)
        {
            var arrayError = new List<string>();
            var isValidate = true;
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                //kiểm tra xem có attribute cần phải validate không
                var propetyValue = property.GetValue(entity);
                if (property.IsDefined(typeof(Required), true))
                {
                    //Check bắt buộc nhập:
                    if (propetyValue == null || propetyValue.ToString() == string.Empty || propetyValue.ToString().Trim() == "")
                    {
                        isValidate = false;
                        var attributeRequired = property.GetCustomAttributes(typeof(Required), true)[0];
                        var requiredName = (attributeRequired as Required).RequiredName;
                        var requiredMessenger = (attributeRequired as Required).RequiredMessenger;
                        arrayError.Add(requiredMessenger == null ? $"{requiredName}{Properties.Resources.error_Required}" : requiredMessenger);
                        _serviceResult.Code = Code.NotValid;
                        _serviceResult.Messenger = Properties.Resources.msg_Error;
                    }
                    if (isValidate)
                    {
                        if (property.IsDefined(typeof(MaxLength), true))
                        {
                            // Lấy độ dài đã khai báo
                            var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                            var maxLengthName = (attributeMaxLength as MaxLength).MaxLengthName;
                            var length = (attributeMaxLength as MaxLength).Length;
                            var maxLengthMessenger = (attributeMaxLength as MaxLength).MaxLengthMessenger;
                            var msg = maxLengthMessenger == null ?($"{maxLengthName} {string.Format(Properties.Resources.error_MaxLength,length)}") : maxLengthMessenger;
                            if (propetyValue.ToString().Trim().Length > length)
                            {
                                isValidate = false;
                                arrayError.Add(msg);
                                _serviceResult.Code = Code.NotValid;
                                _serviceResult.Messenger = Properties.Resources.msg_Error;
                            }

                        }
                    }

                }
                if (property.IsDefined(typeof(Duplicate), true))
                {
                    //Check trùng dữ liệu

                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        var attributeDuplicate = property.GetCustomAttributes(typeof(Duplicate), true)[0];
                        var duplicateName = (attributeDuplicate as Duplicate).DuplicateName;
                        var duplicateMessenger = (attributeDuplicate as Duplicate).DuplicateMessenger;
                        arrayError.Add(duplicateMessenger == null ? $"{duplicateName}{Properties.Resources.error_Duplicate}" : duplicateMessenger);
                        _serviceResult.Code = Code.NotValid;
                        _serviceResult.Messenger = Properties.Resources.msg_Error;
                    }
                }

                if (property.IsDefined(typeof(Email), true))
                {
                    Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                    Match match = regex.Match(propetyValue.ToString());
                    var attributeEmail = property.GetCustomAttributes(typeof(Email), true)[0];
                    var emailName = (attributeEmail as Email).EmailName;
                    var emailMessenger = (attributeEmail as Email).EmailMessenger;
                    var msg =  emailMessenger==null?Properties.Resources.error_Email:emailMessenger;
                    if (!match.Success)
                    {
                        isValidate = false;
                        arrayError.Add(msg);
                        _serviceResult.Code = Code.NotValid;
                        _serviceResult.Messenger = Properties.Resources.msg_Error;
                    }

                }

                //if (  property.IsDefined(typeof(MaxLength), true))
                //{
                //    // Lấy độ dài đã khai báo
                //    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                //    var maxLengthName = (attributeMaxLength as MaxLength).MaxLengthName;
                //    var length = (attributeMaxLength as MaxLength).Length;
                //    var maxLengthMessenger = (attributeMaxLength as MaxLength).MaxLengthMessenger;
                //    var msg = maxLengthMessenger == null ? $"{maxLengthName} không được dài quá {length} ký tự! " : maxLengthMessenger;
                //    if (propetyValue.ToString().Trim().Length > length)
                //    {
                //        isValidate = false;
                //        arrayError.Add(msg);
                //        _serviceResult.Code = Code.NotValid;
                //        _serviceResult.Messenger = Properties.Resources.msg_Error;
                //    }
                //}
            }
            _serviceResult.Data = arrayError;
            return isValidate;
        }

       
        #endregion
    }
}
