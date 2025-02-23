import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "./Modal";
import useAuthStore from "../../js/store/useAuthStore";
import { BASE_URL, VENUES_URL, API_KEY } from "../../js/constants";

// ✅ Yup Validation Schema
const schema = yup.object({
  name: yup.string().required("Venue name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive().required("Price must be positive"),
  maxGuests: yup.number().integer().min(1).required("At least 1 guest is required"),
  rating: yup.number().min(0).max(5, "Rating must be between 0 and 5"),
  media: yup.object({
    url: yup.string().url("Invalid image URL").required("Image URL is required"),
    alt: yup.string().required("Alt text is required"),
  }),
  location: yup.object({
    address: yup.string().optional(),
    city: yup.string().optional(),
    zip: yup.string().optional(),
    country: yup.string().optional(),
    continent: yup.string().optional(),
  }),
  meta: yup.object({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
});

export default function UpdateVenueModal({ isOpen, onClose, venue, onUpdated }) {
  const { token } = useAuthStore();
  const [error, setError] = useState(null);

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,  // ✅ To reset form when modal opens
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: venue, // ✅ Default values (but will not auto-update)
  });

  // ✅ Reset form values whenever modal opens
  useEffect(() => {
    if (venue) {
      reset(venue);
    }
  }, [venue, reset]);

  // ✅ Update Venue Handler
  const handleUpdate = async (data) => {
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}${VENUES_URL}/${venue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || "Error updating venue");
      }

      if (onUpdated) onUpdated(); // ✅ Refresh venue in parent component
      onClose(); // ✅ Close modal immediately
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg relative mx-auto overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Update Venue</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          
          {/* Venue Name */}
          <div className="flex flex-col">
            <label className="font-semibold">Venue Name</label>
            <input {...register("name")} className="border rounded-md p-2 w-full"/>
            <p className="text-red-500">{errors.name?.message}</p>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="font-semibold">Description</label>
            <textarea {...register("description")} className="border rounded-md p-2 w-full h-24"/>
            <p className="text-red-500">{errors.description?.message}</p>
          </div>

          {/* Price and Max Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Price per Night</label>
              <input type="number" {...register("price")} className="border rounded-md p-2 w-full"/>
              <p className="text-red-500">{errors.price?.message}</p>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Max Guests</label>
              <input type="number" {...register("maxGuests")} className="border rounded-md p-2 w-full"/>
              <p className="text-red-500">{errors.maxGuests?.message}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="font-semibold">Rating (0-5)</label>
            <input type="number" step="0.1" min="0" max="5" {...register("rating")} className="border rounded-md p-2 w-full"/>
            <p className="text-red-500">{errors.rating?.message}</p>
          </div>

          {/* Image */}
          <div className="flex flex-col">
            <label className="font-semibold">Image URL</label>
            <input type="url" {...register("media.url")} className="border rounded-md p-2 w-full"/>
            <p className="text-red-500">{errors.media?.url?.message}</p>
            <label className="font-semibold mt-2">Image Alt Text</label>
            <input type="text" {...register("media.alt")} className="border rounded-md p-2 w-full"/>
            <p className="text-red-500">{errors.media?.alt?.message}</p>
          </div>

          {/* Location */}
          <div>
            <h3 className="font-bold">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" {...register("location.address")} placeholder="Address" className="border rounded-md p-2 w-full"/>
              <input type="text" {...register("location.city")} placeholder="City" className="border rounded-md p-2 w-full"/>
              <input type="text" {...register("location.zip")} placeholder="ZIP Code" className="border rounded-md p-2 w-full"/>
              <input type="text" {...register("location.country")} placeholder="Country" className="border rounded-md p-2 w-full"/>
              <input type="text" {...register("location.continent")} placeholder="Continent" className="border rounded-md p-2 w-full"/>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-bold">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input type="checkbox" {...register("meta.wifi")} className="mr-2"/>
                Wi-Fi
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register("meta.parking")} className="mr-2"/>
                Parking
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register("meta.breakfast")} className="mr-2"/>
                Breakfast
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register("meta.pets")} className="mr-2"/>
                Pets Allowed
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-text-dark rounded-md">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-text-dark rounded-md">
              {isSubmitting ? "Applying..." : "Apply Changes"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
