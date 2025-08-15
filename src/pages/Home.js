import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [neoData, setNeoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [currentEndDate, setCurrentEndDate] = useState('');

  // NASA API configuration
  const NASA_API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
  const NASA_API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getInitialDateRange = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return {
      start: formatDate(today),
      end: formatDate(nextWeek)
    };
  };

  const fetchNeoData = useCallback(async (start, end, append = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError('');

      const response = await axios.get(NASA_API_URL, {
        params: {
          start_date: start,
          end_date: end,
          api_key: NASA_API_KEY
        }
      });

      const newData = response.data.near_earth_objects;
      
      if (append) {
        setNeoData(prev => ({ ...prev, ...newData }));
      } else {
        setNeoData(newData);
      }
      
      setCurrentEndDate(end);
    } catch (err) {
      console.error('Error fetching NEO data:', err);
      setError(
        err.response?.status === 403 
          ? 'API key invalid. Please check your NASA API key configuration.'
          : 'Failed to fetch cosmic events. Please try again later.'
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [NASA_API_KEY]);

  useEffect(() => {
    const { start, end } = getInitialDateRange();
    setStartDate(start);
    setEndDate(end);
    fetchNeoData(start, end);
  }, [fetchNeoData]);

  const handleDateRangeSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      fetchNeoData(startDate, endDate);
    }
  };

  const handleLoadMore = () => {
    const nextStart = new Date(currentEndDate);
    nextStart.setDate(nextStart.getDate() + 1);
    
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextStart.getDate() + 6);
    
    fetchNeoData(formatDate(nextStart), formatDate(nextEnd), true);
  };

  const getFilteredAndSortedNeos = () => {
    let allNeos = [];
    
    // Flatten all NEOs from all dates
    Object.keys(neoData).forEach(date => {
      const neosForDate = neoData[date].map(neo => ({
        ...neo,
        date: date
      }));
      allNeos = [...allNeos, ...neosForDate];
    });

    // Filter by hazardous status
    if (showHazardousOnly) {
      allNeos = allNeos.filter(neo => neo.is_potentially_hazardous_asteroid);
    }

    // Sort
    allNeos.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.close_approach_data[0].close_approach_date) - 
               new Date(b.close_approach_data[0].close_approach_date);
      } else if (sortBy === 'size') {
        const aSize = (a.estimated_diameter.kilometers.estimated_diameter_min + 
                      a.estimated_diameter.kilometers.estimated_diameter_max) / 2;
        const bSize = (b.estimated_diameter.kilometers.estimated_diameter_min + 
                      b.estimated_diameter.kilometers.estimated_diameter_max) / 2;
        return bSize - aSize;
      } else if (sortBy === 'distance') {
        return parseFloat(a.close_approach_data[0].miss_distance.kilometers) - 
               parseFloat(b.close_approach_data[0].miss_distance.kilometers);
      }
      return 0;
    });

    return allNeos;
  };

  const groupNeosByDate = (neos) => {
    const grouped = {};
    neos.forEach(neo => {
      const date = neo.close_approach_data[0].close_approach_date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(neo);
    });
    return grouped;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredNeos = getFilteredAndSortedNeos();
  const groupedNeos = groupNeosByDate(filteredNeos);
  const totalNeos = filteredNeos.length;
  const hazardousCount = filteredNeos.filter(neo => neo.is_potentially_hazardous_asteroid).length;

  return (
    <div className="page-container">
      <h1 className="page-title">Cosmic Event Tracker</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <span className="stat-number">{totalNeos}</span>
          <span className="stat-label">Total NEOs</span>
        </div>
        <div className="stat-card hazardous">
          <span className="stat-number">{hazardousCount}</span>
          <span className="stat-label">Potentially Hazardous</span>
        </div>
      </div>

      <div className="filters-container">
        <form onSubmit={handleDateRangeSubmit} className="filters-row">
          <div className="filter-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Approach Date</option>
              <option value="size">Size (Largest First)</option>
              <option value="distance">Distance (Closest First)</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Update Range
          </button>
        </form>
        
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="hazardousOnly"
            checked={showHazardousOnly}
            onChange={(e) => setShowHazardousOnly(e.target.checked)}
          />
          <label htmlFor="hazardousOnly">Show only potentially hazardous asteroids</label>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {Object.keys(groupedNeos).length === 0 ? (
        <div className="no-data">
          <p>No cosmic events found for the selected criteria.</p>
        </div>
      ) : (
        <>
          {Object.keys(groupedNeos)
            .sort((a, b) => new Date(a) - new Date(b))
            .map(date => (
              <div key={date} className="date-section">
                <h2 className="date-header">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  <span className="neo-count">({groupedNeos[date].length} objects)</span>
                </h2>
                <div className="events-grid">
                  {groupedNeos[date].map(neo => (
                    <EventCard key={neo.id} neo={neo} />
                  ))}
                </div>
              </div>
            ))}

          <div className="load-more-container">
            <button 
              onClick={handleLoadMore} 
              className="btn btn-secondary"
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More Events'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;