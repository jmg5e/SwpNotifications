using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using SwpNotifications.Data.Services;
using SwpNotifications.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using SwpNotifications.Api.Models;
using System;

namespace SwpNotifications.Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class LocationsController : Controller
    {
        private IInventoryRepository _inventoryRepository;
        private IMapper _mapper;

        public LocationsController(IInventoryRepository inventoryRepository, IMapper mapper)
        {
            _inventoryRepository = inventoryRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetLocations(bool includeProducts)
        {
            if(includeProducts) {
                var locationsWithProducts = _inventoryRepository.GetLocationsWithProducts();
                var resultWithProducts = _mapper.Map<IEnumerable<LocationWithProductsDto>>(locationsWithProducts); 
                return Ok(resultWithProducts);
            }

            var locations = _inventoryRepository.GetLocations();
            var result = _mapper.Map<IEnumerable<LocationDto>>(locations); 
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetLocation(int id, bool includeProducts = true)
        {
            if(!_inventoryRepository.LocationExsists(id)) {
                return NotFound();
            }
            if(!includeProducts) {
                var locationWithoutProducts = _inventoryRepository.GetLocationById(id);
                var resultWithoutProducts = _mapper.Map<LocationDto>(locationWithoutProducts); 
                return Ok(resultWithoutProducts);
            }
            var location = _inventoryRepository.GetLocationWithProductsById(id);
            var result = _mapper.Map<LocationWithProductsDto>(location); 
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateLocation(
                [FromBody] LocationDto location)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_inventoryRepository.LocationWithMonikerExsists(location.Moniker))
            {
                return BadRequest($"Location {location.Moniker} already exists");
            }

            var locationToAdd = _mapper.Map<Location>(location); 
            _inventoryRepository.AddLocation(locationToAdd);
            Console.WriteLine(locationToAdd.Moniker);

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, $"Create location failed on save.");
            }

            return Created($"api/locations/{locationToAdd.Id}", location);
            // TODO why this doesnt work?
            // return CreatedAtRoute("GetLocation", new { moniker = locationToAdd.Moniker }, locationToAdd);
        }

        // TODO Authorize for only role = Admin
        // TODO handle how products are deleted
        [HttpDelete("{id}")]
        public IActionResult DeleteLocation(int id)
        {

            if (!_inventoryRepository.LocationExsists(id))
            {
                return NotFound();
            }
            var locationToDelete = _inventoryRepository.GetLocationById(id);
            _inventoryRepository.DeleteLocation(locationToDelete);

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, $"Delete Location {id} failed on save.");
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateLocation(int id,
                [FromBody] LocationDto location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_inventoryRepository.LocationExsists(id))
            {
                return NotFound("location does not exist");
            }

            var locationToUpdate = _inventoryRepository.GetLocationById(id);
            // if( locationToUpdate.Moniker != location.Moniker )
            // {
            //     if( _inventoryRepository.LocationWithMonikerExsists(location.Moniker))
            //         return BadRequest($"Location with moniker {location.Moniker} already exists");
            //         locationToUpdate = new Location() {
            //             Id = locationToUpdate.Id,
            //             Moniker = location.Moniker,
            //             Floor = location.Floor,
            //             Products = locationToUpdate.Products
            //         };
            // } else {
                locationToUpdate.Floor = location.Floor;
                locationToUpdate.Moniker = location.Moniker;
            // }

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, $"Update location {id} failed on save.");
            }

            return NoContent();
        }

        /* TODO revisit this */
        [HttpPost("{id}")]
        public IActionResult AddProductToLocation(int id,
                [FromBody] ProductDto product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_inventoryRepository.LocationExsists(id))
            {
                return NotFound("location does not exist");
            }

            var productToAdd = _mapper.Map<Product>(product);

            if (!_inventoryRepository.Save())
            {
                return StatusCode(500, $"Add Product {product.Id} to Location {id} failed on save.");
            }

            // var createdProduct = _mapper.Map<Models.ProductDto>(productToAdd);
            return Ok();
        }
    }
}
