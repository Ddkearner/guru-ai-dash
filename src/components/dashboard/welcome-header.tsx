'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function WelcomeHeader() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(format(new Date(), "EEEE, MMMM do, yyyy"));
  }, []);

  return (
    <div className="p-6 rounded-lg border shadow-sm bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <h2 className="text-2xl font-bold text-white font-headline">
        Welcome back, Principal!
      </h2>
      <p className="mt-1 text-blue-200">
        Here's your overview for {currentDate}. Let's make it a great day.
      </p>
    </div>
  );
}
