using System.Collections.Generic;
using System.Linq;
using SwpNotifications.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace SwpNotifications.Data.Services {
    public class InventoryRepository : IInventoryRepository {
        private AppDbContext _context;
        public InventoryRepository(AppDbContext context) {
            _context = context;
        }

        public IEnumerable<Location> GetLocations() {
            return _context.Locations.OrderBy(l => l.Floor).ThenBy(l => l.Moniker).ToList();
        }

        public IEnumerable<Location> GetLocationsWithProducts() {
            return _context.Locations.OrderBy(c => c.Moniker).Include(l => l.Products).ToList();
        }

        public Location GetLocationById(int id) {
            return _context.Locations.FirstOrDefault(l => l.Id == id);
        }

        public Location GetLocationByMoniker(string moniker) {
            return _context.Locations.FirstOrDefault(l => l.Moniker == moniker);
        }

        public bool LocationExsists(int id) {
            return _context.Locations.Any(l => l.Id == id);
        }

        public bool LocationWithMonikerExsists(string moniker) {
            return _context.Locations.Any(c => c.Moniker == moniker);
        }

        public void AddLocation(Location location) {
            _context.Locations.Add(location);
        }

        public void DeleteLocation(Location location) {
            _context.Locations.Remove(location);
        }

        public Location GetLocationWithProducts(int id) {
            return _context.Locations
                .Include(l => l.Products)
                .FirstOrDefault(l => l.Id == id);
        }

        public Location GetLocationWithProductsById(int id) {
            return _context.Locations
                .Include(l => l.Products)
                .FirstOrDefault(l => l.Id == id);
        }

        public IEnumerable<Product> GetProducts() {
            return _context.Products
                .Include(p => p.Location)
                .OrderBy(p => p.Location.Moniker)
                .ThenBy(p => p.Slot)
                .ToList();
        }

        public Product GetProductById(int productId) {
            return _context.Products
                .Include(p => p.Location)
                .Where(p => p.Id == productId).FirstOrDefault();
        }

        public Product GetProductByName(string productName) {
            return _context.Products
                .Include(p => p.Location)
                .Where(p => p.Name == productName).FirstOrDefault();
        }

        public bool ProductWithNameExists(string productName) {
            return _context.Products.Any(c => c.Name == productName);
        }

        public void AddProduct(Product product) {
            _context.Products.Add(product);
        }

        public void DeleteProduct(Product product) {
            _context.Products.Remove(product);
        }

        public bool Save() {
            return (_context.SaveChanges() >= 0);
        }
    }
}
