import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "./Modal";
import useAuthStore from "../../js/store/useAuthStore";
import { BASE_URL, VENUES_URL, API_KEY } from "../../js/constants";

// Schema to handle media array
const schema = yup.object({
  name: yup.string().required("Venue name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().positive().required("Price must be positive"),
  maxGuests: yup.number().integer().min(1).required("At least 1 guest is required"),
  rating: yup.number().min(0).max(5, "Rating must be between 0 and 5"),
  media: yup.array().of(
    yup.object({
      url: yup.string().url("Invalid image URL").required("Image URL is required"),
      alt: yup.string().required("Alt text is required"),
    })
  ),
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

export default function CreateVenueModal({ isOpen, onClose, onCreated }) {
  const { token } = useAuthStore();
  const [error, setError] = useState(null);
  const [mediaFields, setMediaFields] = useState([{ url: "", alt: "" }]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      rating: "",
      media: [{ url: "", alt: "" }],
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
    },
  });

  const addMediaField = () => {
    setMediaFields([...mediaFields, { url: "", alt: "" }]);
  };

  const removeMediaField = (index) => {
    const newFields = mediaFields.filter((_, i) => i !== index);
    setMediaFields(newFields);
    setValue('media', newFields);
  };

  const handleCreate = async (data) => {
    setError(null);
    try {
      // Filter out empty media entries
      const filteredMedia = data.media.filter(item => item.url && item.alt);
      
      const response = await fetch(`${BASE_URL}${VENUES_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          ...data,
          media: filteredMedia,
        }),
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.errors?.[0]?.message || "Error creating venue");
      }

      if (onCreated) onCreated();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg relative mx-auto overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Create Venue</h2>
        {error && (
          <p className="text-warning bg-warning/10 p-3 rounded-lg mb-4">{error}</p>
        )}
        
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          {/* Basic Info */}
          <div className="flex flex-col">
            <label className="font-semibold">Venue Name</label>
            <input {...register("name")} className="border rounded-lg p-2 w-full"/>
            {errors.name && <p className="text-warning text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Description</label>
            <textarea {...register("description")} className="border rounded-lg p-2 w-full h-24"/>
            {errors.description && <p className="text-warning text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold">Price per Night</label>
              <input type="number" step="0.01" {...register("price")} className="border rounded-lg p-2"/>
              {errors.price && <p className="text-warning text-sm">{errors.price.message}</p>}
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Max Guests</label>
              <input type="number" {...register("maxGuests")} className="border rounded-lg p-2"/>
              {errors.maxGuests && <p className="text-warning text-sm">{errors.maxGuests.message}</p>}
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Images</label>
              <button
                type="button"
                onClick={addMediaField}
                className="text-blue-main text-sm"
              >
                + Add Image
              </button>
            </div>
            
            {mediaFields.map((_, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <input
                  {...register(`media.${index}.url`)}
                  placeholder="Image URL"
                  className="border rounded-lg p-2 w-full"
                />
                {errors.media?.[index]?.url && (
                  <p className="text-warning text-sm">{errors.media[index].url.message}</p>
                )}
                
                <input
                  {...register(`media.${index}.alt`)}
                  placeholder="Image description"
                  className="border rounded-lg p-2 w-full"
                />
                {errors.media?.[index]?.alt && (
                  <p className="text-warning text-sm">{errors.media[index].alt.message}</p>
                )}
                
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeMediaField(index)}
                    className="text-warning text-sm"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Location */}
          <div>
            <h3 className="font-bold mb-2">Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <input {...register("location.address")} placeholder="Address" className="border rounded-lg p-2"/>
              <input {...register("location.city")} placeholder="City" className="border rounded-lg p-2"/>
              <input {...register("location.zip")} placeholder="ZIP Code" className="border rounded-lg p-2"/>
              <input {...register("location.country")} placeholder="Country" className="border rounded-lg p-2"/>
              <input {...register("location.continent")} placeholder="Continent" className="border rounded-lg p-2"/>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-bold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("meta.wifi")}/>
                <span>WiFi</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("meta.parking")}/>
                <span>Parking</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("meta.breakfast")}/>
                <span>Breakfast</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("meta.pets")}/>
                <span>Pets Allowed</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-medium hover:text-neutral-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-main text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Venue"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}