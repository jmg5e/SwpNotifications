using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services {
    public class RequestRepository : IRequestRepository {
        private AppDbContext _db { get; set; }

        public RequestRepository(AppDbContext db) {
            _db = db;
        }

        public IEnumerable<Request> GetProductRequests() {
            return _db.Requests.Include(r => r.Product).ThenInclude(p => p.Location).ToList();
        }

        public Request GetRequest(int id) {
            return _db.Requests.Include(r => r.Product).ThenInclude(p => p.Location).FirstOrDefault(r => r.Id == id);
        }

        public Request GetRequestByProductId(int productId) {
            return _db.Requests.FirstOrDefault(pr => pr.ProductId == productId);
        }

        public void DeleteProductRequest(Request request) {
            _db.Requests.Remove(request);
        }

        public void DeleteAllProductRequests() {
            _db.Requests.RemoveRange(_db.Requests);
        }

        public void AddProductRequest(Request request) {
            _db.Requests.Add(request);
        }
        // public void NewProductRequest(Product requestedProduct) {
        //     var NewRequest = new Request()
        //     {
        //         Product = requestedProduct
        //     };
        //     _db.Requests.Add(NewRequest);
        // }
        //
        // public void NewProductRequestByProductId(int productId) {
        //     var product = _db.Products.FirstOrDefault(p => p.Id == productId);
        //     var NewRequest = new Request()
        //     {
        //         Product = product
        //     };
        //     _db.Requests.Add(NewRequest);
        // }
        //
        public bool RequestExistsWithProductId(int productId) {
            return _db.Requests.Any(r => r.ProductId == productId);
        }

        public bool Save() {
            return (_db.SaveChanges() >= 0);
        }
    }
}
