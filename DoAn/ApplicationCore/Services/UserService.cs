using ApplicationCore.Interface;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        #region Declare
        IUserRepository _userRepository;
        #endregion
        #region Constructor
        public UserService(IUserRepository userRepository) : base(userRepository)
        {
            _userRepository = userRepository;
        }
        #endregion
   
    }
}
