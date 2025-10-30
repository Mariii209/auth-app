import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="profile-card">
        <div className="profile-info">
          <h3>Emma, 28</h3>
          <div className="location-distance">
            <h4>
              <i class="fa-solid fa-location-dot"></i>
              San Francisco, CA
            </h4>
            <h4>
              <i class="fa-regular fa-circle-dot"></i>
              25 miles away
            </h4>
          </div>
          <p className="bio">
            Love hiking, photography, and exploring new coffee shops. Looking
            for someone to share adventures with!
          </p>

          <div className="interests">
            <p>Photography</p>
            <p>Hiking</p>
            <p>Coffee</p>
            <p>Travel</p>
            <p>+1 more</p>
          </div>
        </div>
        <div className="actions">
          <div className="button-group">
            <button>
              <i class="fa-solid fa-xmark"></i>
            </button>
            <button className="like-button">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
      <p className="profiles-remaining">1 profile remaining</p>
    </div>
  );
}
