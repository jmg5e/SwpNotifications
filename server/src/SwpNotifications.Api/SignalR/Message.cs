using System;
using Microsoft.AspNetCore.SignalR;

namespace SwpNotifications.Api.SignalR {

    public class Message
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public String From { get; set; }
        public DateTime TimeStamp { get; set; }
        public Message(string text, Client client) {
            Id = Guid.NewGuid().ToString();
            From = client.Identifier;
            Text = text;
            TimeStamp = DateTime.Now;
        }

        public Message(string content, HubCallerContext Context) {
            Id = Guid.NewGuid().ToString();
            Text = content;
            From = Context.User?.FindFirst("sub")?.Value;
            TimeStamp = DateTime.Now;
        }
    }
}
