using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SwpNotifications.Data.Services;
using SwpNotifications.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using SwpNotifications.Api.Models;

namespace SwpNotifications.Api.Controllers {
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : Controller
    {
        private IInventoryRepository _inventoryRepository;
        private IMapper _mapper;

        public ProductsController(IInventoryRepository inventoryRepository, IMapper mapper)
        {
            _inventoryRepository = inventoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetProducts()
        {
            var products = _inventoryRepository.GetProducts();
            var result = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetProduct(int id)
        {
            var product = _inventoryRepository.GetProductById(id);
            if(product == null)
                return NotFound();
            var result = _mapper.Map<ProductDto>(product);

            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductDto product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(_inventoryRepository.ProductWithNameExists(product.Name)) {
                return BadRequest($"Product already exists: {product.Name}");
            }

            if(!_inventoryRepository.LocationExsists(product.LocationId.Value)) {
                return BadRequest($"location does not exist: {product.LocationId}");
            }

            var productToAdd = _mapper.Map<Product>(product);

            var productLocation = _inventoryRepository.GetLocationById(product.LocationId.Value);
            productToAdd.Location = productLocation;

            _inventoryRepository.AddProduct(productToAdd);

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            var finalProduct = _inventoryRepository.GetProductByName(productToAdd.Name);
            var createdProduct = _mapper.Map<ProductDto>(finalProduct);

            return Created($"/api/products/{productToAdd.Id}", createdProduct);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                if(!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
                var product = _inventoryRepository.GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }
                _inventoryRepository.DeleteProduct(product);

                if (!_inventoryRepository.Save())
                {
                    return StatusCode(500, "A problem happened while handling your request.");
                }
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
        }

        /* TODO seperate Dto with required id? */
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] ProductDto product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productToUpdate = _inventoryRepository.GetProductById(id);
            if(productToUpdate == null) {
                return NotFound();
            }

            if(!_inventoryRepository.LocationExsists(product.LocationId.Value)) {
                return BadRequest($"location does not exist: {product.LocationId}");
            }

            // if changing name make sure it is unique
            if(productToUpdate.Name != product.Name && _inventoryRepository.ProductWithNameExists(product.Name)) {
                return BadRequest($"Product: {product.Name} already exists");
            }
            // TODO if changing location make sure slot is unique
            var productLocation = _inventoryRepository.GetLocationById(product.LocationId.Value);

            productToUpdate.Slot = product.Slot;
            productToUpdate.Name = product.Name;
            productToUpdate.Location = productLocation;

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }
            return NoContent();
        }

    }
}
