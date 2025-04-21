import { useState } from 'react';
import logo from '../../assets/house_book_logo.jpeg'; // Update path if needed

function RegisterForm({ switchToLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, username, password }),
      });

      if (response.ok) {
        setSuccess('Registration successful! Please log in.');
        setTimeout(() => {
          switchToLogin();
        }, 1500);
      } else {
        const data = await response.text();
        setError(data || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('User credentials already exist!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="mx-auto h-20 mb-2 logo" />
          <h1 className="text-3xl font-bold text-blue-600">GET A STAY</h1>
        </div>

        <h2 className="text-lg text-center text-gray-700 mb-4">Create a new account</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mb-3 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 p-2 rounded-md mb-3 text-sm text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="regUsername" className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              id="regUsername"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="regPassword" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="regPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Create a password (min:8)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 w-full py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button onClick={switchToLogin} className="text-blue-600 font-medium hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
