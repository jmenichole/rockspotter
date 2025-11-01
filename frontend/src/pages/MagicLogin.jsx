/*
 * Rock Spotter - Magic Login Component
 * SMS-based authentication with magic codes
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mountain, Smartphone, Send, Lock } from 'lucide-react';
import { auth } from '../utils/api';

const MagicLogin = ({ onLogin }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      
      if (cleanPhone.length !== 10) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const response = await auth.requestMagicCode(cleanPhone);
      
      setSuccess(`Magic code sent to ${phoneNumber}`);
      setStep('code');
      
      // In development, show the code
      if (response.data?.code) {
        setSuccess(`Magic code sent to ${phoneNumber}. Code: ${response.data.code} (dev mode)`);
      }
    } catch (err) {
      setError(err.message || 'Failed to send magic code');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (code.length !== 6) {
        throw new Error('Please enter the 6-digit code');
      }

      const cleanPhone = phoneNumber.replace(/\D/g, '');
      const response = await auth.verifyMagicCode(cleanPhone, code);
      
      // Log the user in
      onLogin(response.data.token, response.data.user);
      
      // Redirect based on user role
      if (response.data.user.role === 'admin' || response.data.user.isAdmin) {
        navigate('/moderation');
      } else {
        navigate('/feed');
      }
    } catch (err) {
      setError(err.message || 'Invalid magic code');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setCode('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Mountain className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            {step === 'phone' 
              ? 'Enter your phone number to receive a magic code'
              : 'Enter the 6-digit code sent to your phone'
            }
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-6">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          /* Phone Number Step */
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="(850) 867-0087"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Magic code authentication is currently available for admin only
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Magic Code
                </>
              )}
            </button>
          </form>
        ) : (
          /* Verification Code Step */
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-center text-lg tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Code sent to {phoneNumber}
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Verify & Login'
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToPhone}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back to Phone Number
              </button>
            </div>
          </form>
        )}

        {/* Alternative Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble?{' '}
            <button 
              onClick={() => navigate('/login-traditional')}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Use traditional login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MagicLogin;