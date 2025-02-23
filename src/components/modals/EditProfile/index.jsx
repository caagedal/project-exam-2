import React, { useState } from 'react';
import useAuthStore from '../../../js/store/useAuthStore';
import Modal from '../Modal';
import * as yup from 'yup';
import { BASE_URL, PROFILES_URL, API_KEY } from '../../../js/constants';

const schema = yup.object().shape({
    bio: yup.string().nullable(),
    avatar: yup.object().shape({
      url: yup.string().url('Must be a valid URL').required('URL is required'),
      alt: yup.string().required('Alt text is required')
    }),
    banner: yup.object().shape({
      url: yup.string().url('Must be a valid URL').required('URL is required'),
      alt: yup.string().required('Alt text is required')
    })
  });

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { user, updateAvatar, updateBanner, updateBio } = useAuthStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    avatar: {
      url: user?.avatar?.url || '',
      alt: user?.avatar?.alt || 'Profile avatar'
    },
    banner: {
      url: user?.banner?.url || '',
      alt: user?.banner?.alt || 'Profile banner'
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = useAuthStore.getState().token;
      const requestBody = {};

      // Only add fields that have been modified and are not empty
      if (formData.bio !== undefined && formData.bio !== user.bio) {
        requestBody.bio = formData.bio;
      }

      if (formData.avatar?.url && formData.avatar.url !== user.avatar?.url) {
        requestBody.avatar = {
          url: formData.avatar.url,
          alt: formData.avatar.alt || 'Profile avatar'
        };
      }

      if (formData.banner?.url && formData.banner.url !== user.banner?.url) {
        requestBody.banner = {
          url: formData.banner.url,
          alt: formData.banner.alt || 'Profile banner'
        };
      }

      console.log('Sending update:', requestBody);

      const response = await fetch(`${BASE_URL}${PROFILES_URL}/${user.name}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': API_KEY
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log('API Error:', responseData);
        throw new Error(responseData.errors?.[0]?.message || 'Failed to update profile');
      }
      
      // Update the local state with the response data
      const updatedData = responseData.data;
      if (updatedData.avatar) updateAvatar(updatedData.avatar);
      if (updatedData.banner) updateBanner(updatedData.banner);
      if (updatedData.bio !== undefined) updateBio(updatedData.bio);
      // You might need to add a function to update bio in your auth store
      
      onClose();
    } catch (err) {
      console.error('Error:', err);
      setErrors({ api: err.message });
    } finally {
      setIsUpdating(false);
    }
};
  const handleChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: subField ? {
        ...prev[field],
        [subField]: value
      } : value
    }));
    // Clear error when field is edited
    if (errors[field] || (subField && errors[`${field}.${subField}`])) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors[`${field}.${subField}`];
        return newErrors;
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-text-dark">Update Profile</h2>
        
        {errors.api && (
          <div className="text-warning bg-warning/10 p-3 rounded-lg">
            {errors.api}
          </div>
        )}

        <div className="space-y-4">
          {/* Bio input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-text-dark">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', null, e.target.value)}
              placeholder="Tell us about yourself"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main 
                ${errors.bio ? 'border-warning' : 'border-neutral-b'}`}
              rows="3"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-warning">{errors.bio}</p>
            )}
          </div>

          {/* Avatar URL input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-text-dark">
              Profile Photo URL
            </label>
            <input
              type="url"
              value={formData.avatar.url}
              onChange={(e) => handleChange('avatar', 'url', e.target.value)}
              placeholder="Enter image URL"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main
                ${errors['avatar.url'] ? 'border-warning' : 'border-neutral-b'}`}
            />
            {errors['avatar.url'] && (
              <p className="mt-1 text-sm text-warning">{errors['avatar.url']}</p>
            )}
            <input
              type="text"
              value={formData.avatar.alt}
              onChange={(e) => handleChange('avatar', 'alt', e.target.value)}
              placeholder="Image description"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:border-blue-main
                ${errors['avatar.alt'] ? 'border-warning' : 'border-neutral-b'}`}
            />
            {errors['avatar.alt'] && (
              <p className="mt-1 text-sm text-warning">{errors['avatar.alt']}</p>
            )}
            {formData.avatar.url && (
              <div className="mt-2 w-24 h-24 rounded-full overflow-hidden border border-neutral-b">
                <img
                  src={formData.avatar.url}
                  alt={formData.avatar.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = '/api/placeholder/96/96'}
                />
              </div>
            )}
          </div>

          {/* Banner URL input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-text-dark">
              Banner Image URL
            </label>
            <input
              type="url"
              value={formData.banner.url}
              onChange={(e) => handleChange('banner', 'url', e.target.value)}
              placeholder="Enter image URL"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-main
                ${errors['banner.url'] ? 'border-warning' : 'border-neutral-b'}`}
            />
            {errors['banner.url'] && (
              <p className="mt-1 text-sm text-warning">{errors['banner.url']}</p>
            )}
            <input
              type="text"
              value={formData.banner.alt}
              onChange={(e) => handleChange('banner', 'alt', e.target.value)}
              placeholder="Image description"
              className={`w-full mt-2 p-3 border rounded-lg focus:outline-none focus:border-blue-main
                ${errors['banner.alt'] ? 'border-warning' : 'border-neutral-b'}`}
            />
            {errors['banner.alt'] && (
              <p className="mt-1 text-sm text-warning">{errors['banner.alt']}</p>
            )}
            {formData.banner.url && (
              <div className="mt-2 h-32 rounded-lg overflow-hidden border border-neutral-b">
                <img
                  src={formData.banner.url}
                  alt={formData.banner.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = '/api/placeholder/1200/300'}
                />
              </div>
            )}
          </div>
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
};

export default UpdateProfileModal;