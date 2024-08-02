import React, { useState } from 'react';

const Demo = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    usn: '',
    email: '',
    password: ''
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ usn: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg">
      <div className="w-full max-w-xl mx-auto  border border-gray-300 rounded-lg p-6 ">
        <div className="flex gap-2 border-b border-gray-200 mb-4 p-3">
          <button
            className={`py-1 px-4 ${activeTab === 'student' ? 'text-white bg-blue-500' : 'text-gray-600 bg-white'} rounded-lg focus:outline-none`}
            onClick={() => handleTabClick('student')}
          >
            Student
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'admission' ? 'text-white bg-green-500' : 'text-gray-600 bg-white'} rounded-lg focus:outline-none`}
            onClick={() => handleTabClick('admission')}
          >
            Admission Incharge
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'cie' ? 'text-white bg-yellow-500' : 'text-gray-600 bg-white'} rounded-lg focus:outline-none`}
            onClick={() => handleTabClick('cie')}
          >
            CIE Office
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'principal' ? 'text-white bg-red-500' : 'text-gray-600 bg-white'} rounded-lg focus:outline-none`}
            onClick={() => handleTabClick('principal')}
          >
            Principal
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'vp' ? 'text-white bg-purple-500' : 'text-gray-600 bg-white'} rounded-lg focus:outline-none`}
            onClick={() => handleTabClick('vp')}
          >
            VPs
          </button>
        </div>
        <form onSubmit={handleSubmit} className='border border-gray-300 p-4 rounded'>
          {activeTab === 'student' && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">USN</label>
                <input
                  type="text"
                  name="usn"
                  value={formData.usn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded "
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>
          )}
          {activeTab !== 'student' && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  required
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Demo;
