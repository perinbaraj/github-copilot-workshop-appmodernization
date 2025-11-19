using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LegacyWebApp
{
    /// <summary>
    /// Legacy Global.asax
    /// Migration TODO:
    /// - Replace with Program.cs and Startup pattern in .NET 8
    /// - No more Global.asax in ASP.NET Core
    /// </summary>
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_Error()
        {
            // Legacy error handling
            var exception = Server.GetLastError();
            // Log exception (old pattern)
            System.Diagnostics.Trace.WriteLine(exception.ToString());
        }
    }
}
