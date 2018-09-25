using System;

namespace SwpNotifications.Api.Models {

    public class RequestDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string ClientId { get; set; }
        public string ClientIdentifier { get; set; }
    }
}
