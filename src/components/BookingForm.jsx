import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import useAuthStore from '../js/store/useAuthStore';
import useBookings from '../js/api/useBookings';
import Modal from './modals/Modal';
import { BASE_URL, BOOKINGS_URL, API_KEY } from '../js/constants';

/**
 * Booking form values.
 *
 * @typedef {Object} BookingFormValues
 * @property {Date} startDate - Check-in date.
 * @property {Date} endDate - Check-out date.
 * @property {number} guests - Number of guests.
 */

/**
 * Props for BookingForm component.
 *
 * @typedef {Object} BookingFormProps
 * @property {Array<{ dateFrom: string, dateTo: string }>} bookings - Existing bookings.
 * @property {Object} venue - Venue details.
 * @property {number|string} venue.id - Venue identifier.
 * @property {number} venue.maxGuests - Maximum allowed guests.
 * @property {number} venue.price - Price per night.
 * @property {Object} [venue.owner] - Owner details.
 * @property {string} [venue.owner.name] - Owner's username.
 */

/**
 * BookingForm allows users to select dates and number of guests,
 * view a summary, and confirm booking via API.
 * Shows a modal for confirmation and handles authentication state.
 *
 * @param {BookingFormProps} props - Component props.
 * @returns {JSX.Element} The booking form element.
 */
export default function BookingForm({ bookings, venue }) {
  const { token, isLoggedIn, user } = useAuthStore();
  const { bookings: userBookings } = useBookings();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const isVenueOwner = user?.name === venue.owner?.name;

  const schema = yup.object().shape({
    startDate: yup.date().required('Check-in date is required'),
    endDate: yup
      .date()
      .required('Check-out date is required')
      .min(yup.ref('startDate'), 'Check-out must be after check-in'),
    guests: yup
      .number()
      .required()
      .min(1, 'At least 1 guest is required')
      .max(venue.maxGuests, `Max guests allowed: ${venue.maxGuests}`),
  });

  const { setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const guests = watch('guests') || 1;

  const allBooked = [...(bookings || []), ...(userBookings || [])];
  const bookedDates = allBooked.flatMap(b => {
    const start = new Date(b.dateFrom);
    const end = new Date(b.dateTo);
    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  });

  const summary = {
    startDate: startDate?.toDateString() || 'Not selected',
    endDate: endDate?.toDateString() || 'Not selected',
    guests,
    totalPrice:
      venue.price *
      (endDate && startDate
        ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        : 1),
  };

  function openModal() {
    if (!isLoggedIn) {
      setMessage('You must be logged in to book.');
      return;
    }
    if (!startDate || !endDate) {
      setMessage('Please select check-in and check-out dates.');
      return;
    }
    setModalOpen(true);
  }

  async function confirmBooking() {
    if (!token) {
      setMessage('You must be logged in to book.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${BASE_URL}${BOOKINGS_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests,
          venueId: venue.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message || 'Failed to create booking'
        );
      }
      setMessage('Booking successful! 🎉');
      setModalOpen(false);
      setValue('startDate', null);
      setValue('endDate', null);
      setValue('guests', 1);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (isVenueOwner) {
    return (
      <div className='bg-neutral-light p-6 rounded-lg text-center'>
        <p className='text-neutral-dark font-medium'>This is your venue</p>
        <p className='text-neutral-medium text-sm mt-2'>You cannot book your own venue</p>
        <Link
          to={`/profile/${user.name}/venue-manager`}
          className='mt-4 inline-block text-blue-main hover:underline'
        >
          Go to Venue Manager
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-white p-6 rounded-lg flex flex-col text-center'>
      <h3 className='text-xl font-semibold text-neutral-dark mb-4'>Book Your Stay</h3>
      <form onSubmit={e => e.preventDefault()} className='space-y-4'>
        <div className='space-y-4'>
          <div>
            <label className='block text-neutral-dark mb-1'>Check-in</label>
            <DatePicker
              selected={startDate}
              onChange={date => setValue('startDate', date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={bookedDates}
              className='w-full border rounded-lg p-2 focus:outline-none focus:border-blue-main'
            />
            {errors.startDate && (
              <p className='text-warning text-sm mt-1'>{errors.startDate.message}</p>
            )}
          </div>
          <div>
            <label className='block text-neutral-dark mb-1'>Check-out</label>
            <DatePicker
              selected={endDate}
              onChange={date => setValue('endDate', date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={bookedDates}
              className='w-full border rounded-lg p-2 focus:outline-none focus:border-blue-main'
            />
            {errors.endDate && (
              <p className='text-warning text-sm mt-1'>{errors.endDate.message}</p>
            )}
          </div>
          <div>
            <label className='block text-neutral-dark mb-1'>Guests</label>
            <input
              type='number'
              min={1}
              max={venue.maxGuests}
              value={guests}
              onChange={e => setValue('guests', parseInt(e.target.value))}
              className='w-full border rounded-lg p-2 focus:outline-none focus:border-blue-main'
            />
            {errors.guests && (
              <p className='text-warning text-sm mt-1'>{errors.guests.message}</p>
            )}
          </div>
        </div>
        {message && (
          <p className={`mt-2 text-sm p-2 rounded ${
            message.toLowerCase().includes('successful')
              ? 'text-green bg-green-light'
              : 'text-warning bg-warning-light'
          }`}
          >
            {message}
          </p>
        )}
        <button
          onClick={openModal}
          disabled={loading || !isLoggedIn}
          className='w-full py-3 bg-green text-white rounded-lg hover:bg-green/90 transition-colors disabled:opacity-50'
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
        {!isLoggedIn && (
          <p className='text-sm text-neutral-medium'>
            Please <Link to='/login' className='text-blue-main hover:underline'>log in</Link> to book this venue
          </p>
        )}
      </form>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className='text-xl font-bold text-neutral-dark text-center'>Confirm Booking</h2>
        <div className='mt-4 bg-neutral-light p-4 rounded-lg space-y-2'>
          <p><strong>Check-in:</strong> {summary.startDate}</p>
          <p><strong>Check-out:</strong> {summary.endDate}</p>
          <p><strong>Guests:</strong> {summary.guests}</p>
          <p><strong>Total Price:</strong> ${summary.totalPrice}</p>
        </div>
        <button
          onClick={confirmBooking}
          disabled={loading}
          className='mt-4 w-full py-3 bg-green text-white rounded-lg hover:bg-green/90 transition-colors disabled:opacity-50'
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </Modal>
    </div>
  );
}
