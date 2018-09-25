using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SwpNotifications.Api.Models;
using SwpNotifications.Api.SignalR;
using SwpNotifications.Data.Entities;
using SwpNotifications.Data.Services;
using Microsoft.AspNetCore.Authorization;

namespace SwpNotifications.Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RequestsController : ControllerBase
    {
        private readonly IHubContext<SwpHub> _hubContext;
        private IRequestRepository _notificationService { get; set; }
        private IInventoryRepository _inventoryRepository { get; set; }
        private IMapper _mapper;

        public RequestsController(IHubContext<SwpHub> hubContext, IRequestRepository notificationService,
                IInventoryRepository inventoryRepository, IMapper mapper) {
            _hubContext = hubContext;
            _notificationService = notificationService;
            _inventoryRepository = inventoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<Request>> Get()
        {
            var requests = _notificationService.GetProductRequests();
            var result = _mapper.Map<IEnumerable<RequestDto>>(requests);
            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateRequest([FromBody] int productId) {
            var requestedProduct = _inventoryRepository.GetProductById(productId);
            if(requestedProduct == null) {
                return BadRequest($"No product with id:{productId} does not exists.");
            }
            if(_notificationService.RequestExistsWithProductId(requestedProduct.Id)) {
                return BadRequest($"Request for product: {requestedProduct.Name} already exsists");
            }
            _notificationService.AddProductRequest(new Request() {
                    ProductId = productId,
            }); 

            if (!_notificationService.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            var createdRequest = _notificationService.GetRequestByProductId(productId);
            var result = _mapper.Map<RequestDto>(createdRequest);

            await _hubContext.Clients.All.SendAsync("Request", result);
            return Created($"/api/requests/{createdRequest.Id}", result);
        }

        [HttpDelete]
        // [AllowAnonymous]
        public async Task<IActionResult> DeleteRequests() {
            var requestsToDelete = _notificationService.GetProductRequests();
            _notificationService.DeleteAllProductRequests();
            if (!_notificationService.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            string userName = User.FindFirst("sub")?.Value;
            var result = _mapper.Map<IEnumerable<RequestDto>>(requestsToDelete);
            await _hubContext.Clients.All.SendAsync("RequestsDismissed", result, userName);
            return NoContent();
        }

        [HttpDelete("{id}")]
        // [AllowAnonymous]
        public async Task<IActionResult> DeleteRequest(int id) {
            var requestToDelete = _notificationService.GetRequest(id);
            if(requestToDelete == null) {
                return NotFound();
            }
            _notificationService.DeleteProductRequest(requestToDelete);
            if (!_notificationService.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            string userName = User.FindFirst("sub")?.Value;
            var result = _mapper.Map<RequestDto>(requestToDelete);
            await _hubContext.Clients.All.SendAsync("RequestDismissed", result, userName);
            return NoContent();
        }
    }
}
