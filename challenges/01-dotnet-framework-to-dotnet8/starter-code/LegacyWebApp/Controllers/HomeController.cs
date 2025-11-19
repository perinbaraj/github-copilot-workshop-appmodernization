using System;
using System.Web.Mvc;

namespace LegacyWebApp.Controllers
{
    /// <summary>
    /// Simple Home Controller
    /// Migration TODO:
    /// - Convert to ASP.NET Core Controller
    /// - Use IActionResult
    /// </summary>
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Welcome to the Legacy E-Commerce Application";
            ViewBag.CurrentYear = DateTime.Now.Year;

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
    }
}
