using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace SwpNotifications.Data.Entities {
    public class ApplicationUser : IdentityUser {
        public bool IsAdmin { get; set; } = false;
        public bool IsLocked { get; set; } = false;
        public string SerializedHubGroups { get; set; }
        [NotMapped]
        public IEnumerable<string> HubGroups {
            get {
                try {
                    if (!String.IsNullOrEmpty(SerializedHubGroups)) {
                        var result = JsonConvert.DeserializeObject<string[]>(SerializedHubGroups);
                        return result;
                    }
                } catch (JsonSerializationException) { }
                return new string[] {};
            }
            set {
                try {
                    if (value != null) {
                        var result = JsonConvert.SerializeObject(value);
                        this.SerializedHubGroups = JsonConvert.SerializeObject(value);
                        return;
                    }
                } catch (JsonSerializationException) { }
                this.SerializedHubGroups = "[]";
            }
        }
    }
}
