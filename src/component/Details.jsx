import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import { AuthContext } from './AuthProvider';

const Details = () => {

    useEffect(() => {
        document.title = "Room Details"; 
      }, []);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Room Details";
    axios
      .get(`https://hotel-booking-server-opal.vercel.app/roomDetails/${id}`)
      .then((response) => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Error fetching room details.');
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    const bookingData = {
      roomId: room._id,
      room_name: room.name,
      user: {
        name: user.displayName,
        email: user.email,
      },
      bookingDate,
      roomSummary: {
        price: room.price,
        description: room.description,
      },
    };

    axios
      .post('https://hotel-booking-server-opal.vercel.app/bookings', bookingData)
      .then((response) => {
        if (response.data.success) {
          // Update room state with updated availability
          setRoom(response.data.updatedRoom);
          toast.success('Room booked successfully!');
          setModalOpen(false);
        } else {
          toast.error('Failed to book the room.');
        }
      })
      .catch(() => {
        toast.error('Failed to book the room.');
      });
  };

  if (loading) return <div>No data avvailable</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Room Details</h2>
      <div className="mb-6">
        <img
          src={room?.image}
          alt={room?.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h3 className="text-2xl font-semibold">{room?.name}</h3>
        <p className="mt-2"><strong>Description:</strong> {room?.description}</p>
        <p className="mt-2"><strong>Price:</strong> ${room?.price}</p>
        <p className="mt-2"><strong>Availability:</strong> {room?.availability ? 'Available' : 'Unavailable'}</p>
      </div>

      <button
        onClick={() => {
          if (room?.availability) {
            setModalOpen(true);
          } else {
            toast.error('This room is currently unavailable for booking.');
          }
        }}
        className={`w-full py-3 ${
          room?.availability ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        } text-white rounded-md`}
        disabled={!room?.availability}
      >
        {room?.availability ? 'Book Now' : 'Unavailable'}
      </button>




      <div className='flex flex-col justify-center items-center mt-7 mb-7'>
      <section className='text-3xl font-extrabold text-yellow-500'>All Reviews</section>
      <div className="container mx-auto p-4 font-bold">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {room?.reviews && room?.reviews?.length > 0 ? (
    room.reviews.map((review, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
      >
        <h3 className="text-lg font-bold mb-2">{review?.username}</h3>
        <p className="text-sm text-gray-600 mb-2">Rating: {review?.rating}/5</p>
        <p className="text-gray-700 mb-4">{review?.comment}</p>
        <p className="text-xs text-gray-500">
          {new Date(review?.timestamp).toLocaleString()}
        </p>
      </div>
    ))
  ) : (
    <p>No Reviews Here</p>
  )}
</div>

    </div>
      </div>



      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">Booking Confirmation</h3>
            <p><strong>Room:</strong> {room?.name}</p>
            <p><strong>Price:</strong> ${room?.price}</p>
            <p className="mb-4"><strong>Description:</strong> {room?.description}</p>

            <div className="mb-4">
              <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">Booking Date</label>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                dateFormat="MMMM d, yyyy"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleBooking}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Confirm Booking
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-3 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
