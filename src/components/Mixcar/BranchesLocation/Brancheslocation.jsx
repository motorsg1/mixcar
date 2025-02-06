import React, { useState } from 'react';

const BranchesLocation = ({ productId }) => {
  // Static branch data
  const [branchesData] = useState({
    branches: [
      {
        label: 'Jeddah',
        description: 'Jeddah branch description',
        google_map: 'https://www.google.com/maps/place/Al-Ahsa',
      },
      {
        label: 'Riyadh',
        description: 'Riyadh branch description',
        google_map: 'https://www.google.com/maps/place/Al-Khobar',
      },
      {
        label: 'Dammam',
        description: 'Dammam branch description',
        google_map: 'https://www.google.com/maps/place/Baha',
      },
      {
        label: 'Jazan',
        description: 'Jazan branch description',
        google_map: 'https://www.google.com/maps/place/Dammam',
      },
    ],
  });

  return (
    <div className="car-details-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title mb-20">
              <h5>Branches</h5>
            </div>
            <div className="row">
              {/* Tabs Navigation */}
              <div className="col-lg-2">
                <ul 
                  className="nav flex-column flex-lg-column justify-content-lg-center p-3" 
                  id="pills-tab" 
                  role="tablist"
                >
                  {branchesData.branches.map((branch, index) => (
                    <li key={index} className="nav-item mb-2" role="presentation">
                      <button 
                        className={`nav-link text-secondary fw-semibold position-relative rounded-3 w-100 ${index === 0 ? 'active' : ''}`}
                        id={`${branch.label}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-${branch.label}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-${branch.label}`}
                        aria-selected={index === 0}
                      >
                        {branch.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabs Content */}
              <div className="col-lg-10">
                <div 
                  className="tab-content border rounded-3 border-secondary p-3 text-secondary w-100" 
                  id="pills-tabContent"
                >
                  {branchesData.branches.map((branch, index) => (
                    <div 
                      key={index}
                      className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                      id={`pills-${branch.label}`}
                      role="tabpanel"
                      aria-labelledby={`pills-${branch.label}-tab`}
                    >
                      <h2>{branch.label}</h2>
                      <p>{branch.description}</p>
                      <button
                        onClick={() => window.open(branch.google_map, '_blank')}
                        className="btn btn-secondary mt-2"
                      >
                        Get Location
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesLocation;