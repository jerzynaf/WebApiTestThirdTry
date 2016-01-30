using System;
using System.Data.Entity.ModelConfiguration;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using MvcTest.Database;
using MvcTest.Database.Interfaces;
using MvcTest.Database.Models;
using MvcTest.Database.Models.Configurations;
using MvcTest.Database.Repositories;
using MvcTest.Database.Repositories.Interfaces;
using MvcTest.Web;
using Ninject;
using Ninject.Web.Common;
using WebApiContrib.IoC.Ninject;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(NinjectWebCommon), "Stop")]

namespace MvcTest.Web
{
    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);

                GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);

                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<INhsContext>().To<NhsContext>().InRequestScope();
            kernel.Bind<IPersonRepository>().To<PersonRepository>();
            kernel.Bind<IColourRepository>().To<ColourRepository>();
            kernel.Bind<EntityTypeConfiguration<Colour>>().To<ColourTypeConfiguration>();
            kernel.Bind<EntityTypeConfiguration<Person>>().To<PersonTypeConfiguration>();
        }
    }
}