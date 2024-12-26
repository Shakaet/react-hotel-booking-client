import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Myrooms = () => {
  useEffect(() => {
    document.title = "My room Pages"; 
  }, []);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0); // Minimum price state
  const [maxPrice, setMaxPrice] = useState(1000); // Maximum price state

  useEffect(() => {
    // Fetch rooms data from API when the component mounts
    axios
      .get("http://localhost:3000/allRooms")
      .then((response) => {
        setRooms(response.data); // Set rooms data from the response
        setFilteredRooms(response.data); // Set filtered rooms data initially to all rooms
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false); // Stop loading in case of an error
      });
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handlePriceFilter = () => {
    // Filter rooms based on selected price range
    const filtered = rooms.filter(
      (room) => room.price >= minPrice && room.price <= maxPrice
    );
    setFilteredRooms(filtered); // Update filtered rooms
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    handlePriceFilter(); // Apply filter when min price changes
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    handlePriceFilter(); // Apply filter when max price changes
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Rooms</h1>
      
      {/* Price Filter Section */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex flex-col">
          <label htmlFor="min-price" className="text-lg font-semibold">Min Price</label>
          <input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max-price" className="text-lg font-semibold">Max Price</label>
          <input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Rooms List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.length === 0 ? (
          <div>No rooms found within the selected price range.</div>
        ) : (
          filteredRooms.map((room, index) => (
            <Link
              to={`/roomDetails/${room._id}`}
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Room Image */}
              <img
                src={room.image}
                alt={room.name}
                className="h-48 w-full object-cover"
              />
              {/* Room Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{room.name}</h2>
                <p className="text-gray-600 text-sm my-2">{room.description}</p>
                <p className="text-lg font-bold">${room.price} per night</p>
                <p className="text-sm text-gray-500 mt-2">
                  Total Reviews: {room.reviews.length}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Myrooms;
