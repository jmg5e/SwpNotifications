using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace SwpNotifications.Api.SignalR {
    public class ClientManager : IClientManager {
        private List<Client> clients { get; set; }
        public ClientManager() {
            clients = new List<Client>();
        }

        public IEnumerable<Client> GetClients() {
            return clients.ToArray();
        }

        public void AddClient(Client client) {
            clients.Add(client);
        }

        public void DeleteClient(Client client) {
            clients.Remove(client);
        }

        public void DeleteClient(string connectionId) {
            clients.RemoveAll( c => c.Id == connectionId);
        }
        public Client GetClient(string connectionId) {
            return clients.FirstOrDefault( c => c.Id == connectionId);
        }

        public bool ClientIsInGroup(string connectionId, string groupName) {
            var client = clients.FirstOrDefault( c => c.Id == connectionId);
            return client.Groups.Any( g => g == groupName);
        }

        public void AddClientToGroup(string connectionId, string groupName) {
            var client = clients.FirstOrDefault( c => c.Id == connectionId);
            if(client != null && !String.IsNullOrEmpty(groupName))
            {
                client.Groups.Add(groupName);
            }
        }

        public void RemoveClientFromGroup(string connectionId, string groupName) {
            var client = clients.FirstOrDefault( c => c.Id == connectionId);
            if(client != null && !String.IsNullOrEmpty(groupName))
            {
                client.Groups.Remove(groupName);
            }
        }

        public string GetCurrentClientIdentifier(HubConnectionContext connection)
        {
            return clients.FirstOrDefault( c => c.Id == connection.ConnectionId).Identifier;
        }

        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}
