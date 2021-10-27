using ApplicationCore;
using ApplicationCore.Interface;
using ApplicationCore.Services;
using Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QLTS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddControllers();
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            }
            );
            services.AddDistributedMemoryCache();
            services.AddSession();

            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
            services.AddScoped<IEmployeeReponsitory, EmployeeRepository>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IOlogyRepository, OlogyRepository>();
            services.AddScoped<IOlogyService, OlogyService>();
            services.AddScoped<IMajorsRepository, MajorsRepository>();
            services.AddScoped<IMajorsService, MajorsService>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ICourseService, CourseService>();
            services.AddScoped<IClassRepository, ClassRepository>();
            services.AddScoped<IClassService, ClassService>();
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IStudentService, StudentService>();
            services.AddScoped<ISubjectRepository, SubjectRepository>();
            services.AddScoped<ISubjectService, SubjectService>();
            services.AddScoped<IModuleRepository, ModuleRepository>();
            services.AddScoped<IModuleService, ModuleService>();
            services.AddScoped<ITeacherRepository, TeacherRepository>();
            services.AddScoped<ITeacherService, TeacherService>();
            services.AddScoped<IBuildingRepository, BuildingRepository>();
            services.AddScoped<IBuildingService, BuildingService>();
            services.AddScoped<IModuleClassRepository, ModuleClassRepository>();
            services.AddScoped<IModuleClassService, ModuleClassService>();
            services.AddScoped<IPracticalLaboratoryRepository, PracticalLaboratoryRepository>();
            services.AddScoped<IPracticalLaboratoryService, PracticalLaboratoryService>();
            services.AddScoped<IPracticeGroupRepository, PracticeGroupRepository>();
            services.AddScoped<IPracticeGroupService, PracticeGroupService>();
            services.AddScoped<IDetailModuleClassRepository, DetailModuleClassRepository>();
            services.AddScoped<IDetailModuleClassService, DetailModuleClassService>();
            services.AddScoped<IDetailPracticeGroupRepository, DetailPracticeGroupRepository>();
            services.AddScoped<IDetailPracticeGroupService, DetailPracticeGroupService>();
            services.AddScoped<ISemesterRepository, SemesterRepository>();
            services.AddScoped<ISemesterService, SemesterService>();
            services.AddScoped<ISchoolYearRepository, SchoolYearRepository>();
            services.AddScoped<ISchoolYearService, SchoolYearService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<IPermissionService, PermissionService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
