import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { AuthContext } from './AuthProvider';
import ReactStars from 'react-rating-stars-component'; // Import React Stars for rating
import moment from 'moment'; // Import moment.js
import UseAxios from './UseAxios';



const MyBookings = () => {
    useEffect(() => {
        document.title = "My Booking Pages"; 
      }, []);
  const { user } = useContext(AuthContext);
  let axiosInstance=UseAxios()
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/mybookingPage/${user?.email}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch(() => {
        toast.error('Failed to load bookings.');
      });
  }, [user?.email]);


//   let roomId=bookings.map()

  const handleCancel = (bookingId, bookingDate) => {
    const currentDate = moment(); // Current date and time
    const bookedDate = moment(bookingDate); // Convert bookingDate to a moment object

    // Check if the booking is cancelable (must be at least 1 day before the booked date)
    const canCancel = bookedDate.diff(currentDate, 'days') >= 1;

    // if (!canCancel) {
    //   toast.error('You can only cancel the booking at least one day before the booked date.');
    //   return;
    // }

    // Confirm cancellation via SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be canceled!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call API to cancel the booking
        axios
          .delete(`http://localhost:3000/bookings/${bookingId}`)
          .then(() => {
            // Update room availability (for example, setting room status to 'available')
            axios.put(`http://localhost:3000/rooms/${selectedBooking?.data.roomSummary.id}`, {
              availability: true, // Mark room as available
            });

            // Update state to remove canceled booking from UI
            setBookings((prevBookings) =>
              prevBookings.filter((booking) => booking._id !== bookingId)
            );

            Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to cancel booking.', 'error');
          });
      }
    });
  };

  const handleUpdateDate = () => {
    console.log(newDate)
    if (!newDate) {
      toast.error("Please select a new date.");
      return;
    }

  
    axios
      .put(`http://localhost:3000/bookings/${selectedBooking._id}`, { newDate })
      .then((response) => {
        if (response.status === 200) {
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === selectedBooking._id
                ? { ...booking, data: { ...booking.data, bookingDate: newDate } }
                : booking
            )
          );
          setModalOpen(false);
          toast.success("Booking date updated successfully!");
        }
      })
      .catch(() => {
        toast.error("Failed to update booking date.");
      });
  };
  

  const handleReviewSubmit = (id) => {
    // if (rating < 1 || rating > 5) {
    //   toast.error('Please provide a rating between 1 and 5.');
    //   return;
    // }
    // console.log(id)

    if(rating<1 || rating>5){
      toast.error("please give the rating between 1 to 5")
      return;
    }
  
    if (!comment) {
      toast.error('Please enter a comment.');
      return;
    }
    const reviewData = {
        roomId:id,
      username: user?.displayName || 'Anonymous',
      rating,
      comment,
      timestamp: new Date(),
    };
  
    axios
      .patch("http://localhost:3000/allroom", reviewData)
      .then((response) => {
        if (response) {
          toast.success('Review submitted successfully!');
          setReviewModalOpen(false); // Close review modal
          setRating(0); // Reset rating
          setComment(''); // Reset comment
        }
      })
      .catch(() => {
        toast.error('Failed to submit review.');
      });
  };
  

  if (!bookings.length) {
    return <div className="text-center text-xl">No bookings found.</div>;
  }

  return (

    
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Room Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={booking?.data.roomSummary.image}
                    alt={booking?.data.room_name}
                    className="w-24 h-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{booking?.data.room_name}</td>
                <td className="border border-gray-300 px-4 py-2">${booking?.data.roomSummary.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(booking?.data.bookingDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex flex-col gap-2 md:flex-row">
                  <button
                    onClick={() => handleCancel(booking._id, booking?.data.bookingDate)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
                  >
                    Update Date
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setReviewModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-xs md:text-sm"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Booking Date */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">Update Booking Date</h3>
            <p className="mb-4">
              <strong>Room:</strong> {selectedBooking.data.room_name}
            </p>
            <div className="mb-4">
              <label htmlFor="newDate" className="block text-sm font-medium mb-2">
                New Booking Date
              </label>
              <DatePicker
                selected={newDate}
                onChange={(date) => setNewDate(date)}
                dateFormat="MMMM d, yyyy"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleUpdateDate}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs md:text-sm"
            >
              Update Date
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-3 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 text-xs md:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for Review */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
            <p className="mb-4">
              <strong>Room:</strong> {selectedBooking.data.room_name}
            </p>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={user?.displayName || 'Anonymous'}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium mb-2">
                Rating
              </label>
              <input
                type="number"
                id="username"
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>
            <button
              onClick={()=>handleReviewSubmit(selectedBooking?.data?.roomId)}
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs md:text-sm"
            >
              Submit Review
            </button>
            <button
              onClick={() => setReviewModalOpen(false)}
              className="w-full mt-3 py-3 bg-gray-300 text-black rounded-md hover:bg-gray-400 text-xs md:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
