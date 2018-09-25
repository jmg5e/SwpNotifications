using System.Collections.Generic;
using SwpNotifications.Data.Entities;

namespace SwpNotifications.Data.Services {
    public interface IRequestRepository {
        IEnumerable<Request> GetProductRequests();
        Request GetRequest(int id);
        Request GetRequestByProductId(int productId);
        void AddProductRequest(Request request);
        // void NewProductRequest(Product requestedProduct);
        // void NewProductRequestByProductId(int productId); 
        bool RequestExistsWithProductId(int productId);
        void DeleteProductRequest(Request request);
        void DeleteAllProductRequests();
        bool Save();
    }
}
