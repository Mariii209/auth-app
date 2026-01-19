import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [authorised, setAuthorised] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/home", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });

        if (response.ok) {
          setAuthorised(true); // User is authenticated
        } else {
          setAuthorised(false); // User is not authenticated
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthorised(false); // On error, treat as not authenticated
        navigate("/login"); // Redirect to login page
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorised) {
    return null; // or a redirect component
  }

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
