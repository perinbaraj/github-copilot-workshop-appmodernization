using System;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using LegacyWebApp.Models;

namespace LegacyWebApp.Controllers
{
    /// <summary>
    /// Legacy ASP.NET MVC Controller
    /// Migration TODO:
    /// - Convert to ASP.NET Core MVC Controller
    /// - Replace ActionResult with IActionResult
    /// - Implement async/await patterns
    /// - Use dependency injection instead of new DbContext()
    /// - Replace ConfigurationManager with IConfiguration
    /// </summary>
    public class ProductsController : Controller
    {
        // Old pattern: Direct instantiation (should use DI)
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Products
        public ActionResult Index(string searchTerm = null, string category = null)
        {
            // Old synchronous database access
            var query = db.Products.AsQueryable();

            // Old-style null checking
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(p => p.Name.Contains(searchTerm) || p.Description.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category == category);
            }

            // Synchronous ToList() call
            var products = query.Where(p => p.IsActive).OrderBy(p => p.Name).ToList();

            // Old pattern: Using ConfigurationManager
            ViewBag.ApplicationName = ConfigurationManager.AppSettings["ApplicationName"];
            ViewBag.MaxItemsPerPage = int.Parse(ConfigurationManager.AppSettings["MaxItemsPerPage"]);

            return View(products);
        }

        // GET: Products/Details/5
        public ActionResult Details(int? id)
        {
            // Old-style null checking
            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }

            // Synchronous database call
            Product product = db.Products.Find(id.Value);

            if (product == null)
            {
                return HttpNotFound();
            }

            return View(product);
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Name,Description,Price,SKU,Category,StockQuantity")] Product product)
        {
            // Old ModelState validation
            if (ModelState.IsValid)
            {
                // Additional business validation
                if (!product.IsValid())
                {
                    ModelState.AddModelError("", "Product validation failed");
                    return View(product);
                }

                // Check for duplicate SKU (synchronous)
                var existingProduct = db.Products.FirstOrDefault(p => p.SKU == product.SKU);
                if (existingProduct != null)
                {
                    ModelState.AddModelError("SKU", "A product with this SKU already exists");
                    return View(product);
                }

                // Synchronous save
                db.Products.Add(product);
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }

            Product product = db.Products.Find(id.Value);

            if (product == null)
            {
                return HttpNotFound();
            }

            return View(product);
        }

        // POST: Products/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Description,Price,SKU,Category,StockQuantity,IsActive")] Product product)
        {
            if (ModelState.IsValid)
            {
                product.ModifiedDate = DateTime.Now;

                // Old EF6 pattern
                db.Entry(product).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(System.Net.HttpStatusCode.BadRequest);
            }

            Product product = db.Products.Find(id.Value);

            if (product == null)
            {
                return HttpNotFound();
            }

            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Product product = db.Products.Find(id);

            if (product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        // Old IDisposable pattern
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
