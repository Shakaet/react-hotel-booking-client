import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import offer from "../assets/offer.jpg"
import img1 from "../assets/b2.webp"
import img2 from "../assets/b3.jpg"
import img3 from "../assets/b3.webp"

const Home = () => {
    useEffect(() => {
        document.title = "Home"; 
      }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rooms, setRooms] = useState([]); // State to store room data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [showModal, setShowModal] = useState(true); // State to manage modal visibility

  const slides = [
    {
      title: 'Welcome to Our Hotel',
      description: 'Enjoy a luxurious stay with premium amenities and services.',
      img: {img1},
    },
    {
      title: 'Relax in Comfort',
      description: 'Our rooms offer the perfect blend of relaxation and style.',
      img: {img2},
    },
    {
      title: 'Explore Our Facilities',
      description: 'We provide state-of-the-art amenities for a memorable experience.',
      img: {img3},
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Fetch rooms data from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/allRooms') // Replace with your API endpoint
      .then((response) => {
        setRooms(response.data); // Store the fetched data in state
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        console.error("Failed to fetch rooms", err);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  return (
    
    <div>
        
      {/* Special Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/3 p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Special Offer Just for You!</h2>
            <img
              src={offer}
              alt="Special Offer"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-lg text-center mb-4">
              Get 60% off your next booking with us! Limited time offer, book now!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/myrooms"
                className="inline-block bg-yellow-500 text-white py-2 px-6 rounded-lg"
              >
                Claim Offer
              </Link>
              <button
                onClick={closeModal}
                className="inline-block bg-red-500 text-white py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slider Section */}
      <div className="relative">
        <div className="w-full h-[500px] relative">
          {/* <img
            src={slides[currentSlide].img}
            alt={`Banner ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="text-center text-white px-4 md:px-8">
              <h1 className="text-4xl font-bold mb-4">{slides[currentSlide].title}</h1>
              <p className="text-xl mb-6">{slides[currentSlide].description}</p>
              <Link
                to="/myrooms"
                className="inline-block bg-yellow-500 text-white py-2 px-6 rounded-lg"
              >
                Explore Rooms
              </Link>
            </div>
          </div>
        </div>
        {/* Optional navigation buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
        >
          &#8249;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
        >
          &#8250;
        </button>
      </div>

      {/* Map Section */}
      <section className="my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
        <div className="w-full mx-auto overflow-hidden">
          <iframe
            className="w-full h-[300px] md:h-[450px] rounded-lg border"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14856.364017453705!2d91.95944888715822!3d21.425667700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc8652d5a8305%3A0xad38092104307ea7!2sLong%20Beach%20Hotel%20Cox's%20Bazar!5e0!3m2!1sen!2sbd!4v1735156684722!5m2!1sen!2sbd"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            room.reviews.length > 0 ? (
              <div key={room.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="text-gray-700 mt-2">{room.description}</p>
                  <p className="text-lg font-bold mt-4">
                    ${room.price} <span className="text-sm text-gray-600">per night</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Total Reviews: {room.totalReviews}</p>

                  {/* Reviews */}
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Guest Reviews</h4>
                    {room.reviews
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp (latest first)
                      .map((review, index) => (
                        <div key={index} className="border-t pt-2 mt-2">
                          <p className="font-semibold">{review.username}</p>
                          <p className="text-yellow-500">Rating: {review.rating}</p>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-xs text-gray-500">{new Date(review.timestamp).toLocaleDateString()}</p>
                        </div>
                      ))}
                  </div>

                  {/* Book Now Button */}
                  <Link
                    to={`/roomdetails/${room.id}`}
                    className="inline-block bg-yellow-500 text-white py-2 px-6 rounded-lg mt-4"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ) : null
          ))}
        </div>
      </section>


      {/* Amenities Section */}
      <section className="my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Swimming Pool', description: 'Enjoy a refreshing dip in our outdoor pool.' },
            { title: 'Spa & Wellness', description: 'Rejuvenate with our premium spa treatments.' },
            { title: 'Fine Dining', description: 'Savor gourmet meals prepared by top chefs.' },
            { title: 'Fitness Center', description: 'Stay fit with our state-of-the-art equipment.' },
            { title: 'Conference Rooms', description: 'Host successful meetings in our well-equipped rooms.' },
            { title: 'Complimentary WiFi', description: 'Stay connected with high-speed internet access.' },
          ].map((amenity, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold">{amenity.title}</h3>
              <p className="text-gray-700 mt-2">{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-12 px-4 bg-gray-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'John Doe',
              comment: 'Amazing service and fantastic facilities! Highly recommended.',
              rating: 5,
            },
            {
              name: 'Jane Smith',
              comment: 'A truly luxurious experience. I can’t wait to come back!',
              rating: 4.5,
            },
            {
              name: 'Michael Brown',
              comment: 'The rooms were clean and the staff was very friendly. Loved it!',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-yellow-500">Rating: {testimonial.rating} ★</p>
              <p className="text-gray-700 mt-2">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
