import React, { useState } from 'react';
import useAuthStore from '../../../js/store/useAuthStore';
import Modal from '../Modal';
import * as yup from 'yup';
import { BASE_URL, PROFILES_URL, API_KEY } from '../../../js/constants';

/**
 * Validation schema for the profile update form.
 * @type {yup.ObjectSchema}
 */
const schema = yup.object().shape({
  bio: yup.string().nullable(),
  avatar: yup.object().shape({
    url: yup.string().url('Must be a valid URL').required('URL is required'),
    alt: yup.string().required('Alt text is required'),
  }),
  banner: yup.object().shape({
    url: yup.string().url('Must be a valid URL').required('URL is required'),
    alt: yup.string().required('Alt text is required'),
  }),
  venueManager: yup.boolean(),
});

/**
 * Props for UpdateProfileModal component.
 * @typedef {Object} UpdateProfileModalProps
 * @property {boolean} isOpen - Whether the modal is visible.
 * @property {() => void} onClose - Callback to close the modal.
 */

/**
 * Data structure for profile form state.
 * @typedef {Object} ProfileFormData
 * @property {string} bio - User biography text.
 * @property {{ url: string, alt: string }} avatar - Avatar image data.
 * @property {{ url: string, alt: string }} banner - Banner image data.
 * @property {boolean} venueManager - Venue manager status.
 */

/**
 * Modal component for updating user profile information.
 * Handles bio, avatar, banner, and venue manager status updates.
 *
 * @param {UpdateProfileModalProps} props - Component props.
 * @returns {JSX.Element|null} The update profile modal or null if closed.
 */
export default function UpdateProfileModal({ isOpen, onClose }) {
  const { user, updateAvatar, updateBanner, updateBio, updateVenueManager } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(/** @type {ProfileFormData} */({
    bio: user?.bio || '',
    avatar: {
      url: user?.avatar?.url || '',
      alt: user?.avatar?.alt || 'Profile avatar',
    },
    banner: {
      url: user?.banner?.url || '',
      alt: user?.banner?.alt || 'Profile banner',
    },
    venueManager: user?.venueManager || false,
  }));

  /**
   * Update a form field and clear related errors.
   * @param {string} field - Field name in formData.
   * @param {string|null} subField - Nested field name or null.
   * @param {any} value - New value to set.
   */
  const handleChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: subField != null
        ? { ...prev[field], [subField]: value }
        : value,
    }));
    setErrors(prev => {
      const updated = { ...prev };
      delete updated[field];
      if (subField) delete updated[`${field}.${subField}`];
      return updated;
    });
  };

  /**
   * Validate and submit form, updating user profile via API.
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event.
   */
  const handleSubmit = async event => {
    event.preventDefault();
    setIsUpdating(true);
    setErrors({});

    try {
      await schema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      const fieldErrors = {};
      validationError.inner.forEach(err => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
      setIsUpdating(false);
      return;
    }

    const token = useAuthStore.getState().token;
    const requestBody = {};

    if (formData.bio !== user.bio) {
      requestBody.bio = formData.bio;
    }
    if (formData.avatar.url !== user.avatar?.url) {
      requestBody.avatar = { url: formData.avatar.url, alt: formData.avatar.alt };
    }
    if (formData.banner.url !== user.banner?.url) {
      requestBody.banner = { url: formData.banner.url, alt: formData.banner.alt };
    }
    if (formData.venueManager !== user.venueManager) {
      requestBody.venueManager = formData.venueManager;
    }

    try {
      const response = await fetch(
        `${BASE_URL}${PROFILES_URL}/${user.name}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Noroff-API-Key': API_KEY,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to update profile');
      }

      const updated = result.data;
      if (updated.bio !== undefined) updateBio(updated.bio);
      if (updated.avatar) updateAvatar(updated.avatar);
      if (updated.banner) updateBanner(updated.banner);
      if (updated.venueManager !== undefined) updateVenueManager(updated.venueManager);

      onClose();
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-text-dark">Update Profile</h2>
        {errors.api && (
          <div className="text-warning bg-warning/10 p-3 rounded-lg">
            {errors.api}
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-medium text-text-dark">Bio</label>
          <textarea
            value={formData.bio}
            onChange={e => handleChange('bio', null, e.target.value)}
            placeholder="Tell us about yourself"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main ${
              errors.bio ? 'border-warning' : 'border-neutral-b'
            }`}
            rows={3}
          />
          {errors.bio && <p className="mt-1 text-sm text-warning">{errors.bio}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-dark">Profile Photo URL</label>
          <input
            type="url"
            value={formData.avatar.url}
            onChange={e => handleChange('avatar', 'url', e.target.value)}
            placeholder="Enter image URL"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main ${
              errors['avatar.url'] ? 'border-warning' : 'border-neutral-b'
            }`}
          />
          {errors['avatar.url'] && <p className="mt-1 text-sm text-warning">{errors['avatar.url']}</p>}
          <input
            type="text"
            value={formData.avatar.alt}
            onChange={e => handleChange('avatar', 'alt', e.target.value)}
            placeholder="Image description"
            className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:border-blue-main ${
              errors['avatar.alt'] ? 'border-warning' : 'border-neutral-b'
            }`}
          />
          {errors['avatar.alt'] && <p className="mt-1 text-sm text-warning">{errors['avatar.alt']}</p>}
          {formData.avatar.url && (
            <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border border-neutral-b">
              <img
                src={formData.avatar.url}
                alt={formData.avatar.alt}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = '/api/placeholder/96/96'; }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-text-dark">Banner Image URL</label>
          <input
            type="url"
            value={formData.banner.url}
            onChange={e => handleChange('banner', 'url', e.target.value)}
            placeholder="Enter image URL"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main ${
              errors['banner.url'] ? 'border-warning' : 'border-neutral-b'
            }`}
          />
          {errors['banner.url'] && <p className="mt-1 text-sm text-warning">{errors['banner.url']}</p>}
          <input
            type="text"
            value={formData.banner.alt}
            onChange={e => handleChange('banner', 'alt', e.target.value)}
            placeholder="Image description"
            className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:border-blue-main ${
              errors['banner.alt'] ? 'border-warning' : 'border-neutral-b'
            }`}
          />
          {errors['banner.alt'] && <p className="mt-1 text-sm text-warning">{errors['banner.alt']}</p>}
          {formData.banner.url && (
            <div className="mt-2 h-32 rounded-lg overflow-hidden border border-neutral-b">
              <img
                src={formData.banner.url}
                alt={formData.banner.alt}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = '/api/placeholder/1200/300'; }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="venueManager"
            type="checkbox"
            checked={formData.venueManager}
            onChange={e => handleChange('venueManager', null, e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="venueManager" className="text-sm text-text-dark">Register as Venue Manager</label>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full py-3 bg-blue-main text-white rounded-2xl hover:bg-blue-main/90 transition-colors disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </Modal>
  );
}
