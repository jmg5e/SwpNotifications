using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;

namespace SwpNotifications.Api.SignalR {    
public class Client {
        public string Id  { get; set; }
        public string Ip  { get; set; }
        public string Identifier  { get; set; }
        public List<string> Groups { get; set; } = new List<string>();

        public Client(HubCallerContext Context) {
            var httpContext = Context.GetHttpContext();
            var userName = Context.User?.FindFirst("sub")?.Value;
            var clientIdentifier = httpContext.Request.Query["clientIdentifier"];
            if(string.IsNullOrEmpty(userName) && string.IsNullOrEmpty(clientIdentifier)) {
                throw new HubException("Cannot connect without providing an Identity(ie Name) or logging in");
            } 
            if(!string.IsNullOrEmpty(userName)) {
                Identifier = userName;
            }
            else {
                Identifier = clientIdentifier;
            }
            Id = Context.ConnectionId;
            Ip = httpContext.Connection.RemoteIpAddress.ToString();
        }
    }
}
