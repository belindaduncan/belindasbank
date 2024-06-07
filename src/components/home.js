import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Home() {
  useEffect(() => {
    console.log('Bootstrap:', window.bootstrap);
    const myCarousel = document.querySelector('#myCarousel');
    if (myCarousel) {
      new window.bootstrap.Carousel(myCarousel, {
        interval: 8000,
        ride: 'carousel'
      });
    }
  }, []);

  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ marginBottom: "30px" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active bg-dark">
            <img
              src="/assets/bank.jpg"
              className="d-block w-100"
              alt="Slide 1"
            />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Welcome to Belinda's Bank.</h1>
                <p>
                  Discover a new era of banking where your financial needs are our top priority.
                  Join us to experience seamless and secure transactions, personalized services,
                  and innovative solutions tailored just for you.
                </p>
                <p>
                <Link to="/CreateAccount" className="btn btn-lg btn-primary">Get Started Today</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/assets/account.jpg"
              className="d-block w-100"
              alt="Slide 2"
            />
            <div className="container">
              <div className="carousel-caption">
                <h1>Online Banking.</h1>
                <p>
                  Already have an account? Login here to your account.
                </p>
                <p>
                <Link to="/login" className="btn btn-lg btn-primary">Login</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/assets/e-banking.jpg"
              className="d-block w-100"
              alt="Slide 3"
            />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Review Accounts.</h1>
                <p>
                  Review transactions with just one click. 
                </p>
                <p>
                <Link to="/history" className="btn btn-lg btn-primary">Transactions</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Home;