using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using SwpNotifications.Api.Models;

namespace SwpNotifications.Api.SignalR {

    public class RequestsDismissedEvent {
        public string EventId { get; set; }
        public string DismissedBy { get; set; }
        public DateTime TimeStamp { get; set; }
        public IEnumerable<RequestDto> Requests { get; set; }

        // public RequestsDismissedEvent(IEnumerable<RequestDto> requests, HubCallerContext context) {
        //     EventId = Guid.NewGuid().ToString();
        //     DismissedBy = context.GetHttpContext().User.FindFirst("sub")?.Value;
        //     TimeStamp = DateTime.Now;
        //     Requests = requests;
        // }
        // public RequestsDismissedEvent(RequestDto request, HubCallerContext context) {
        //     EventId = Guid.NewGuid().ToString();
        //     DismissedBy = context.GetHttpContext().User.FindFirst("sub")?.Value;
        //     TimeStamp = DateTime.Now;
        //     Requests = new List<RequestDto> { request };
        // }

        public RequestsDismissedEvent(IEnumerable<RequestDto> requests, Client client) {
            EventId = Guid.NewGuid().ToString();
            DismissedBy = client.Identifier;
            TimeStamp = DateTime.Now;
            Requests = requests;
        }


        public RequestsDismissedEvent(RequestDto request, Client client) {
            EventId = Guid.NewGuid().ToString();
            DismissedBy = client.Identifier;
            TimeStamp = DateTime.Now;
            Requests = new List<RequestDto> { request };
        }
    }
}
