import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [neo, setNeo] = useState(location.state?.neo || null);
  const [orbitalData, setOrbitalData] = useState(null);
  const [loading, setLoading] = useState(!neo);
  const [orbitalLoading, setOrbitalLoading] = useState(false);
  const [error, setError] = useState('');

  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';

  useEffect(() => {
    if (!neo) {
      // If no NEO data passed via state, we could fetch it here
      // For now, we'll show an error
      setError('NEO data not found. Please navigate from the main page.');
      setLoading(false);
    } else {
      // Fetch additional orbital data
      fetchOrbitalData();
    }
  }, [id, neo]);

  const fetchOrbitalData = async () => {
    if (!neo) return;
    
    try {
      setOrbitalLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${neo.id}`,
        {
          params: { api_key: NASA_API_KEY }
        }
      );
      setOrbitalData(response.data.orbital_data);
    } catch (err) {
      console.error('Error fetching orbital data:', err);
      // Don't set error for orbital data as it's supplementary
    } finally {
      setOrbitalLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString();
  };

  if (loading) {
    return <LoadingSpinner message="Loading cosmic event details..." />;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error">{error}</div>
        <Link to="/" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  if (!neo) {
    return (
      <div className="page-container">
        <div className="error">Event not found</div>
        <Link to="/" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const closeApproach = neo.close_approach_data[0];
  const diameter = neo.estimated_diameter;

  return (
    <div className="page-container">
      <div className="detail-header">
        <Link to="/" className="back-btn">
          ← Back to Events
        </Link>
        <h1 className="detail-title">{neo.name}</h1>
        {neo.is_potentially_hazardous_asteroid && (
          <div className="hazard-alert">
            ⚠️ Potentially Hazardous Asteroid
          </div>
        )}
      </div>

      <div className="detail-content">
        <div className="detail-grid">
          {/* Basic Information */}
          <div className="detail-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">NEO Reference ID</span>
                <span className="info-value">{neo.neo_reference_id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Absolute Magnitude</span>
                <span className="info-value">{neo.absolute_magnitude_h}</span>
              </div>
              <div className="info-item">
                <span className="info-label">NASA JPL URL</span>
                <a 
                  href={neo.nasa_jpl_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="info-link"
                >
                  View on NASA JPL
                </a>
              </div>
            </div>
          </div>

          {/* Size Information */}
          <div className="detail-section">
            <h2 className="section-title">Size Estimates</h2>
            <div className="size-grid">
              <div className="size-unit">
                <h3>Kilometers</h3>
                <div className="size-range">
                  <span>Min: {diameter.kilometers.estimated_diameter_min.toFixed(3)} km</span>
                  <span>Max: {diameter.kilometers.estimated_diameter_max.toFixed(3)} km</span>
                  <span className="avg">
                    Avg: {((diameter.kilometers.estimated_diameter_min + diameter.kilometers.estimated_diameter_max) / 2).toFixed(3)} km
                  </span>
                </div>
              </div>
              <div className="size-unit">
                <h3>Meters</h3>
                <div className="size-range">
                  <span>Min: {formatNumber(diameter.meters.estimated_diameter_min)} m</span>
                  <span>Max: {formatNumber(diameter.meters.estimated_diameter_max)} m</span>
                </div>
              </div>
              <div className="size-unit">
                <h3>Feet</h3>
                <div className="size-range">
                  <span>Min: {formatNumber(diameter.feet.estimated_diameter_min)} ft</span>
                  <span>Max: {formatNumber(diameter.feet.estimated_diameter_max)} ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Close Approach Data */}
          <div className="detail-section full-width">
            <h2 className="section-title">Close Approach Details</h2>
            <div className="approach-grid">
              <div className="approach-item">
                <span className="approach-label">Date & Time</span>
                <span className="approach-value">
                  {formatDate(closeApproach.close_approach_date_full)}
                </span>
              </div>
              <div className="approach-item">
                <span className="approach-label">Relative Velocity</span>
                <div className="velocity-values">
                  <span>{formatNumber(closeApproach.relative_velocity.kilometers_per_second)} km/s</span>
                  <span>{formatNumber(closeApproach.relative_velocity.kilometers_per_hour)} km/h</span>
                  <span>{formatNumber(closeApproach.relative_velocity.miles_per_hour)} mph</span>
                </div>
              </div>
              <div className="approach-item">
                <span className="approach-label">Miss Distance</span>
                <div className="distance-values">
                  <span>{formatNumber(closeApproach.miss_distance.astronomical)} AU</span>
                  <span>{formatNumber(closeApproach.miss_distance.lunar)} lunar distances</span>
                  <span>{formatNumber(closeApproach.miss_distance.kilometers)} km</span>
                  <span>{formatNumber(closeApproach.miss_distance.miles)} miles</span>
                </div>
              </div>
              <div className="approach-item">
                <span className="approach-label">Orbiting Body</span>
                <span className="approach-value">{closeApproach.orbiting_body}</span>
              </div>
            </div>
          </div>

          {/* Orbital Data */}
          {orbitalLoading ? (
            <div className="detail-section full-width">
              <h2 className="section-title">Orbital Data</h2>
              <LoadingSpinner message="Loading orbital data..." />
            </div>
          ) : orbitalData ? (
            <div className="detail-section full-width">
              <h2 className="section-title">Orbital Data</h2>
              <div className="orbital-grid">
                <div className="orbital-item">
                  <span className="orbital-label">Orbit ID</span>
                  <span className="orbital-value">{orbitalData.orbit_id}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Orbit Determination Date</span>
                  <span className="orbital-value">
                    {new Date(orbitalData.orbit_determination_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">First Observation Date</span>
                  <span className="orbital-value">
                    {new Date(orbitalData.first_observation_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Last Observation Date</span>
                  <span className="orbital-value">
                    {new Date(orbitalData.last_observation_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Data Arc (days)</span>
                  <span className="orbital-value">{orbitalData.data_arc_in_days}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Observations Used</span>
                  <span className="orbital-value">{orbitalData.observations_used}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Orbit Uncertainty</span>
                  <span className="orbital-value">{orbitalData.orbit_uncertainty}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Minimum Orbit Intersection</span>
                  <span className="orbital-value">{orbitalData.minimum_orbit_intersection}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Jupiter Tisserand Invariant</span>
                  <span className="orbital-value">{orbitalData.jupiter_tisserand_invariant}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Epoch Osculation</span>
                  <span className="orbital-value">{orbitalData.epoch_osculation}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Eccentricity</span>
                  <span className="orbital-value">{orbitalData.eccentricity}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Semi Major Axis</span>
                  <span className="orbital-value">{orbitalData.semi_major_axis}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Inclination</span>
                  <span className="orbital-value">{orbitalData.inclination}°</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Ascending Node Longitude</span>
                  <span className="orbital-value">{orbitalData.ascending_node_longitude}°</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Orbital Period</span>
                  <span className="orbital-value">{orbitalData.orbital_period} days</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Perihelion Distance</span>
                  <span className="orbital-value">{orbitalData.perihelion_distance} AU</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Perihelion Argument</span>
                  <span className="orbital-value">{orbitalData.perihelion_argument}°</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Aphelion Distance</span>
                  <span className="orbital-value">{orbitalData.aphelion_distance} AU</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Perihelion Time</span>
                  <span className="orbital-value">{orbitalData.perihelion_time}</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Mean Anomaly</span>
                  <span className="orbital-value">{orbitalData.mean_anomaly}°</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Mean Motion</span>
                  <span className="orbital-value">{orbitalData.mean_motion}°/day</span>
                </div>
                <div className="orbital-item">
                  <span className="orbital-label">Equinox</span>
                  <span className="orbital-value">{orbitalData.equinox}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;