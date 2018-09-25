using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;

namespace SwpNotifications.Api.SignalR {

    public interface IClientManager {
        IEnumerable<Client> GetClients();
        void AddClient(Client client);
        void DeleteClient(Client client);
        void DeleteClient(string connectionId);
        Client GetClient(string connectionId);
        void AddClientToGroup(string connectionId, string groupName);
        void RemoveClientFromGroup(string connectionId, string groupName);
        string GetUserId(HubConnectionContext connection);
        string GetCurrentClientIdentifier(HubConnectionContext connection);
        bool ClientIsInGroup(string connectionId, string groupName);
    }
}
