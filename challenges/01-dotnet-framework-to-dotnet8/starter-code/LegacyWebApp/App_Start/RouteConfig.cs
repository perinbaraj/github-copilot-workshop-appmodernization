using System.Web.Mvc;
using System.Web.Routing;

namespace LegacyWebApp
{
    /// <summary>
    /// Legacy route configuration
    /// Migration TODO:
    /// - Replace with ASP.NET Core endpoint routing in Program.cs
    /// - Use MapControllerRoute instead of MapRoute
    /// </summary>
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
