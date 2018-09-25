using System.Collections.Generic;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services
{
    public interface IInventoryRepository
    {
        IEnumerable<Location> GetLocations();
        IEnumerable<Location> GetLocationsWithProducts();
        Location GetLocationById(int id);
        Location GetLocationWithProductsById(int id);
        bool LocationExsists(int id);
        bool LocationWithMonikerExsists(string moniker);
        void AddLocation(Location location);
        void DeleteLocation(Location location);
        IEnumerable<Product> GetProducts();
        Product GetProductById(int productId);
        Product GetProductByName(string productName);
        bool ProductWithNameExists(string productName);
        void AddProduct(Product product);
        void DeleteProduct(Product product);
        bool Save();
    }
}
