import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
export default function AuthPages() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {isLoginPage ? (
          <LoginForm switchToRegister={() => setIsLoginPage(false)} />
        ) : (
          <RegisterForm switchToLogin={() => setIsLoginPage(true)} />
        )}
      </div>
    );
  }