using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SwpNotifications.Api.Models;
using SwpNotifications.Data.Entities;
using SwpNotifications.Data.Services;

namespace SwpNotifications.Api.SignalR {

    public class SwpHub : Hub {
        private IRequestRepository _requestRepository { get; set; }
        private IMapper _mapper { get; set; }
        private IClientManager _clientManager { get; set; }

        public SwpHub(IRequestRepository requestRepository, IMapper mapper, IClientManager clientManager) {
            _clientManager = clientManager;
            _requestRepository = requestRepository;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync() {
            await base.OnConnectedAsync();

            _clientManager.AddClient(new Client(Context));

            bool isAuthenticated = Context.User.Identity.IsAuthenticated;
            if (isAuthenticated) {
                await InitLoggedInUser();
            }

            var joinedClient = _clientManager.GetClient(Context.ConnectionId);
            await Clients.GroupExcept("ClientListener", Context.ConnectionId).SendAsync("ClientConnected", joinedClient);
        }

        public override async Task OnDisconnectedAsync(Exception exception) {
            await base.OnDisconnectedAsync(exception);

            var disconnectedClient = _clientManager.GetClient(Context.ConnectionId);
            _clientManager.DeleteClient(Context.ConnectionId);
            await Clients.Group("ClientListener").SendAsync("ClientDisconnected", disconnectedClient);
        }

        /* Join user assigned groups and send appropiate data to connected user */
        private async Task InitLoggedInUser() {
            if (Context.User?.FindFirst("HubGroups")?.Value == null) {
                await Clients.Client(Context.ConnectionId).SendAsync("Error", "User has no claim to HubGroups");
                return;
            }

            var userHubGroups = JsonConvert.DeserializeObject<IEnumerable<string>>(
                Context.User?.FindFirst("HubGroups")?.Value);

            if (userHubGroups.Contains("RequestListener")) {
                await GetRequests();
                await JoinGroup("RequestListener");
            }

            if (userHubGroups.Contains("ClientListener")) {
                await GetConnectedClients();
                await JoinGroup("ClientListener");
            }
        }

        public string GetConnectionId() {
            return Context.ConnectionId;
        }

        [Authorize(Policy = "ClientListener")]
        public async Task GetConnectedClients() {
            var clientList = _clientManager.GetClients();
            await Clients.Client(Context.ConnectionId).SendAsync("Clients", clientList);
        }

        public async Task GetRequests() {
            var requests = _requestRepository.GetProductRequests().ToList();
            var result = _mapper.Map<IEnumerable<RequestDto>>(requests);
            await Clients.Client(Context.ConnectionId).SendAsync("Requests", result);
        }

        [Authorize(Policy = "ClientListener")]
        public async Task SendMessage(string clientId, string content) {
            var message = new Message(content, Context);
            await Clients.Client(clientId).SendAsync("MessageRecieved", message);
        }

        [Authorize(Policy = "ClientListener")]
        public async Task BroadcastMessage(string content) {
            var message = new Message(content, Context);
            await Clients.All.SendAsync("MessageRecieved", message);
        }

        [Authorize(Policy = "ClientListener")]
        public async Task SendGroupMessage(string groupName, string content) {
            var message = new Message(content, Context);
            await Clients.Group(groupName).SendAsync("MessageRecieved", message);
        }

        private async Task JoinGroup(string groupName) {
            if (_clientManager.ClientIsInGroup(Context.ConnectionId, groupName)) {
                throw new HubException($"Attempted to join group: {groupName} user is already in.");
            }
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            _clientManager.AddClientToGroup(Context.ConnectionId, groupName);

            /* TODO dont really need this(dont see reason user would change groups if im HubGroup claim) */
            // if (emitEvent) {
            //     var currentClient = _clientManager.GetClient(Context.ConnectionId);
            //     await Clients.Group("ClientListener").SendAsync("ClientGroupChange", currentClient);
            // }
        }

        [Authorize(Policy = "RequestListener")]
        public async Task<RequestsDismissedEvent> DismissRequest(int requestId) {
            var request = _requestRepository.GetRequest(requestId);
            if (request == null) {
                await Clients.Client(Context.ConnectionId).SendAsync("Error", $"no request with id: {requestId} found");
                throw new HubException($"No request with id: {requestId} found");
            } else {
                _requestRepository.DeleteProductRequest(request);
                if (_requestRepository.Save()) {

                    var currentClient = _clientManager.GetClient(Context.ConnectionId);
                    var dismissedEvent = new RequestsDismissedEvent(_mapper.Map<RequestDto>(request), currentClient);

                    await Clients.GroupExcept("RequestListener", Context.ConnectionId).SendAsync("RequestDismissed", dismissedEvent);
                    return dismissedEvent;
                }
            }

            throw new HubException($"DismissRequest Failed: Internal Error");
        }

        [Authorize(Policy = "RequestListener")]
        public async Task<RequestsDismissedEvent> DismissRequests(IEnumerable<int> requestIds) {
            List<Request> dismissedRequests = new List<Request>();
            foreach (var id in requestIds) {
                var request = _requestRepository.GetRequest(id);
                if (request == null) {
                    await Clients.Client(Context.ConnectionId).SendAsync("Error", $"no request with id: {id} found");
                } else {
                    _requestRepository.DeleteProductRequest(request);
                    dismissedRequests.Add(request);
                }
            }

            if (_requestRepository.Save()) {
                var currentClient = _clientManager.GetClient(Context.ConnectionId);

                var dismissedEvent = new RequestsDismissedEvent(_mapper.Map<IEnumerable<RequestDto>>(dismissedRequests), currentClient);

                await Clients.GroupExcept("RequestListener", Context.ConnectionId).SendAsync("RequestsDismissed", dismissedEvent);
                return dismissedEvent;
            }

            throw new HubException($"DismissRequests Failed: Internal Error");
        }

        [Authorize(Policy = "RequestListener")]
        public async Task<RequestsDismissedEvent> DismissAllRequests() {
            var requests = _requestRepository.GetProductRequests();
            if (requests.Count() == 0) {
                throw new HubException("DismissAllRequests Failed: No Requests To Dismiss");
            }

            _requestRepository.DeleteAllProductRequests();
            if (_requestRepository.Save()) {
                var currentClient = _clientManager.GetClient(Context.ConnectionId);

                var dismissedEvent = new RequestsDismissedEvent(_mapper.Map<IEnumerable<RequestDto>>(requests), currentClient);

                await Clients.GroupExcept("RequestListener", Context.ConnectionId).SendAsync("RequestsDismissed", dismissedEvent);

                return dismissedEvent;
            }

            throw new HubException($"DismissRequests Failed: Internal Error");
        }

        /* TODO decide to either update request if already exists or dont allow request */
        public async Task<RequestDto> RequestProduct(int productId) {
            if (_requestRepository.RequestExistsWithProductId(productId)) {
                _requestRepository.GetRequestByProductId(productId).CreatedAt = DateTime.Now;
            } else {
                var requestToAdd = new Request()
                {
                    ProductId = productId,
                    ClientId = Context.ConnectionId,
                };
                var client = _clientManager.GetClient(Context.ConnectionId);
                _requestRepository.AddProductRequest(new Request()
                {
                    ProductId = productId,
                    ClientId = client.Id,
                    ClientIdentifier = client.Identifier,
                });
            }

            if (_requestRepository.Save()) {
                var addedRequest = _requestRepository.GetRequestByProductId(productId);
                if (addedRequest == null)
                    throw new HubException("Could not create request");

                var result = _mapper.Map<RequestDto>(addedRequest);

                await Clients.GroupExcept("RequestListener", Context.ConnectionId).SendAsync("RequestRecieved", result);

                return result;
            }

            throw new HubException($"RequestProduct Failed: Internal Error");
        }
    }
}
