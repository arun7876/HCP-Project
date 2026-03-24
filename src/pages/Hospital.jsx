import React, { useState, useMemo } from "react";
import { MapPin, Users, Award, Heart, Phone, Navigation } from "lucide-react";
import { CiMedicalCase } from "react-icons/ci";
import "../styles/hospital.css";

// Mock Hospital Data
const HOSPITALS_DATA = [
  {
    id: 1,
    name: "City Heart Hospital",
    location: "New York",
    city: "NY",
    address: "123 Main St, New York, NY 10001",
    rating: 4.8,
    reviews: 245,
    specialties: ["Cardiology", "Emergency", "ICU"],
    beds: 450,
    ambulance: true,
    phone: "(212) 555-0100",
    image: "🏥",
  },
  {
    id: 2,
    name: "Mercy Medical Center",
    location: "Los Angeles",
    city: "LA",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    rating: 4.6,
    reviews: 189,
    specialties: ["General Medicine", "Pediatrics", "Surgery"],
    beds: 350,
    ambulance: true,
    phone: "(213) 555-0200",
    image: "💊",
  },
  {
    id: 3,
    name: "St. Joseph's Hospital",
    location: "New York",
    city: "NY",
    address: "789 Park Ln, New York, NY 10002",
    rating: 4.7,
    reviews: 312,
    specialties: ["Neurology", "Emergency", "Orthopedics"],
    beds: 520,
    ambulance: true,
    phone: "(212) 555-0300",
    image: "🏥",
  },
  {
    id: 4,
    name: "California Medical Institute",
    location: "Los Angeles",
    city: "LA",
    address: "321 Sunset Blvd, Los Angeles, CA 90002",
    rating: 4.5,
    reviews: 156,
    specialties: ["Oncology", "Radiology", "Gastroenterology"],
    beds: 280,
    ambulance: true,
    phone: "(213) 555-0400",
    image: "💊",
  },
  {
    id: 5,
    name: "Boston General Hospital",
    location: "Boston",
    city: "MA",
    address: "654 Charles St, Boston, MA 02101",
    rating: 4.9,
    reviews: 428,
    specialties: ["Research", "Cardiology", "Trauma"],
    beds: 680,
    ambulance: true,
    phone: "(617) 555-0500",
    image: "🏥",
  },
  {
    id: 6,
    name: "Downtown Medical Clinic",
    location: "Boston",
    city: "MA",
    address: "987 Washington Ave, Boston, MA 02102",
    rating: 4.4,
    reviews: 98,
    specialties: ["Primary Care", "Urgent Care"],
    beds: 120,
    ambulance: false,
    phone: "(617) 555-0600",
    image: "⚕️",
  },
  {
    id: 7,
    name: "Chicago Memorial Hospital",
    location: "Chicago",
    city: "IL",
    address: "111 Michigan Ave, Chicago, IL 60601",
    rating: 4.7,
    reviews: 267,
    specialties: ["Pediatrics", "Maternity", "Surgery"],
    beds: 420,
    ambulance: true,
    phone: "(312) 555-0700",
    image: "🏥",
  },
  {
    id: 8,
    name: "Texas Health Center",
    location: "Houston",
    city: "TX",
    address: "222 Hermann Dr, Houston, TX 77004",
    rating: 4.6,
    reviews: 201,
    specialties: ["Emergency", "ICU", "Neurology"],
    beds: 550,
    ambulance: true,
    phone: "(713) 555-0800",
    image: "🏥",
  },
];

function Hospital() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique locations
  const locations = ["All Locations", ...new Set(HOSPITALS_DATA.map((h) => h.location))];

  // Filter hospitals based on location and search
  const filteredHospitals = useMemo(() => {
    return HOSPITALS_DATA.filter((hospital) => {
      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        hospital.location === selectedLocation;

      const matchesSearch =
        searchTerm === "" ||
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesLocation && matchesSearch;
    });
  }, [selectedLocation, searchTerm]);

  return (
    <div className="hospital-container">
      {/* Header */}
      <div className="hospital-header">
        <h1>Find Hospitals Near You</h1>
        <p>Discover top-rated hospitals and medical centers in your area</p>
      </div>

      {/* Search & Filter Section */}
      <div className="search-filter-box">
        <div className="search-filter-grid">
          {/* Search by Name/Specialty */}
          <div>
            <label>🔍 Search Hospital or Specialty</label>
            <input
              type="text"
              placeholder="e.g., Cardiology, Heart Hospital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Location */}
          <div>
            <label>📍 Filter by Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location === "All Locations" ? "" : location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-count">
          <p>
            Found <span>{filteredHospitals.length}</span> hospital(s)
          </p>
        </div>
      </div>

      {/* Hospitals Grid */}
      {filteredHospitals.length > 0 ? (
        <div className="hospitals-grid">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="hospital-card">
              {/* Card Header with Gradient */}
              <div className="hospital-card-header">
                <div className="hospital-card-icon">{hospital.image}</div>
                <div className="hospital-card-rating">
                  <div className="hospital-card-rating-score">
                    ⭐ {hospital.rating}
                  </div>
                  <div className="hospital-card-rating-count">
                    ({hospital.reviews} reviews)
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="hospital-card-body">
                {/* Hospital Name */}
                <h3 className="hospital-name">{hospital.name}</h3>

                {/* Location */}
                <div className="location-info">
                  <MapPin className="location-icon" size={20} />
                  <div className="location-details">
                    <p>{hospital.location}</p>
                    <p>{hospital.address}</p>
                  </div>
                </div>

                {/* Hospital Stats */}
                <div className="hospital-stats">
                  <div className="stat-item">
                    <CiMedicalCase className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Medical</div>
                      <div className="stat-value">Facility</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Users className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Beds</div>
                      <div className="stat-value">{hospital.beds}</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Heart className="stat-icon" size={20} />
                    <div className="stat-content">
                      <div className="stat-label">Ambulance</div>
                      <div className="stat-value">
                        {hospital.ambulance ? "✓ Yes" : "✗ No"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="specialties-section">
                  <span className="specialties-label">Specialties</span>
                  <div className="specialties-tags">
                    {hospital.specialties.map((specialty) => (
                      <span key={specialty} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <a href={`tel:${hospital.phone}`} className="btn btn-call">
                    <Phone size={16} />
                    Call
                  </a>
                  <button className="btn btn-directions">
                    <Navigation size={16} />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Results */
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h2>No hospitals found</h2>
          <p>Try adjusting your search or filters to find hospitals in your area.</p>
        </div>
      )}
    </div>
  );
}

export default Hospital;
