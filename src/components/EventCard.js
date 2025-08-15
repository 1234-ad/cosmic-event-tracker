import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ neo }) => {
  const closeApproach = neo.close_approach_data[0];
  const diameter = neo.estimated_diameter.kilometers;
  const avgDiameter = ((diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2).toFixed(2);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDistance = (distance) => {
    const km = parseFloat(distance).toLocaleString();
    return `${km} km`;
  };

  const formatVelocity = (velocity) => {
    const kmh = parseFloat(velocity).toLocaleString();
    return `${kmh} km/h`;
  };

  return (
    <div className={`event-card ${neo.is_potentially_hazardous_asteroid ? 'hazardous' : ''}`}>
      <div className="card-header">
        <h3 className="neo-name">{neo.name}</h3>
        {neo.is_potentially_hazardous_asteroid && (
          <span className="hazard-badge">⚠️ Potentially Hazardous</span>
        )}
      </div>
      
      <div className="card-content">
        <div className="info-row">
          <span className="label">Diameter:</span>
          <span className="value">{avgDiameter} km</span>
        </div>
        
        <div className="info-row">
          <span className="label">Closest Approach:</span>
          <span className="value">{formatDate(closeApproach.close_approach_date_full)}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Distance:</span>
          <span className="value">{formatDistance(closeApproach.miss_distance.kilometers)}</span>
        </div>
        
        <div className="info-row">
          <span className="label">Velocity:</span>
          <span className="value">{formatVelocity(closeApproach.relative_velocity.kilometers_per_hour)}</span>
        </div>
      </div>
      
      <div className="card-footer">
        <Link 
          to={`/event/${neo.id}`} 
          state={{ neo }}
          className="btn btn-primary view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;