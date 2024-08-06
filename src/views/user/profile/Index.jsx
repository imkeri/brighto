import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { IoCameraSharp } from 'react-icons/io5';
import { useProfile } from '@hooks/user/profile/useProfile';
import avatar11 from '@assets/img/avatars/avatar11.png';
import EditProfileModal from '@components/Modal/UserModal/EditProfileModal';

const imageURL = import.meta.env.VITE_IMAGE_URL;

const Index = () => {
  const { t } = useTranslation();
  const {
    profileData,
    handleModal,
    showModal,
    updateProfileData,
    handleFileChange,
    fileInputRef,
  } = useProfile();

  // validatio schema
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().matches(/^[A-Za-z\s]+$/, 'First Name should contain only letters').required(t('profileUpdate.requiredFirstName')),
    last_name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Last Name should contain only letters').required('Last Name is required'),
    email: Yup.string() .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, t('profileUpdate.requiredInvalidEmail')).required(t('login.required')),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number is not valid, it should be 10 digits').required('Phone Number is required'),
    business_address_name: Yup.string().required('Business/Address Name is required'),
    comapny_name: Yup.string().required('Company, Building, Apartment is required'),
    area: Yup.string().required('Area Colony, Street, Sector is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  return (
    <>
      {showModal && <EditProfileModal handleModal={() => handleModal(!showModal)} ProfileData={profileData} updateProfile={updateProfileData} />}
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg">
        <div className="p-6">
          <div className="flex items-center mb-6 bg-gradient-to-r from-pink-900 to-purple-800 text-white rounded-t-lg p-4">
            <div className="relative flex items-center justify-center user_icon">
              <img
                src={profileData?.profile_photo ? imageURL + profileData?.profile_photo : avatar11}
                alt="user profile"
                className="w-16 h-16 rounded-full"
                accept="image/*"
              />
              <div
                className="w-full h-full rounded-full bg-[rgba(0,0,0,0.5)] camera flex items-center justify-center absolute top-0 left-0"
                onClick={() => fileInputRef.current.click()}
              >
                <IoCameraSharp />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-700 uppercase">
                {profileData?.first_name} {profileData?.last_name}
              </h2>
              <p className="text-gray-500">{profileData?.email}</p>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Profile Details</h3>
          <Formik
            enableReinitialize={true}
            initialValues={{
              first_name: profileData?.first_name || '',
              last_name: profileData?.last_name || '',
              email: profileData?.email || '',
              phone: profileData?.phone || '',
              business_address_name: profileData?.business_address_name || '',
              comapny_name: profileData?.comapny_name || '',
              area: profileData?.area || '',
              city: profileData?.city || '',
              state: profileData?.state || '',
            }}
            validationSchema={validationSchema}
            onSubmit={updateProfileData}
          >
            {(isSubmitting) => (
              <Form>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-customGray-700">First Name</label>
                    <Field
                      type="text"
                      readOnly
                      name="first_name"
                      className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-customGray-700">Last Name</label>
                    <Field
                      type="text"
                      name="last_name"
                      readOnly
                      className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      readOnly
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <Field
                      type="text"
                      readOnly
                      name="phone"
                      className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                  </div>
                </div>

                <button
                  type='button'
                  className="bg-[#f19357] text-white px-4 py-2 mt-5 mb-2 rounded-md shadow-sm hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={() => handleModal(!showModal)}
                >
                  Edit
                </button>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Company Name</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-customGray-700">Business/Address Name</label>
                      <Field
                        type="text"
                        name="business_address_name"
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      />
                      <ErrorMessage name="business_address_name" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-customGray-700">Company, Building, Apartment</label>
                      <Field
                        type="text"
                        name="comapny_name"
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      />
                      <ErrorMessage name="comapny_name" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-customGray-700">Area</label>
                      <Field
                        type="text"
                        name="area"
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      />
                      <ErrorMessage name="area" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <Field
                        type="text"
                        name="city"
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <Field
                        type="text"
                        name="state"
                        className="mt-1 block w-full p-2 border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-xs" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#f19357] text-white px-4 py-2 rounded-md shadow-sm hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>
    </>
  );
};

export default Index;
