using B2CWebApi;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace B2C_WebApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //var scopes = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/scope")?.Value;
            var name = HttpContext.User.Claims.ToList().Where(c => c.Type == "name").ToList();
            //if (!string.IsNullOrEmpty(Startup.ScopeRead) && scopes != null
            //        && scopes.Split(' ').Any(s => s.Equals(Startup.ScopeRead)))
            if (name != null)
                ViewBag.Status = "All OK!";
            else
                ViewBag.Status = "Unauthorized";

            return View();
        }
    }
}