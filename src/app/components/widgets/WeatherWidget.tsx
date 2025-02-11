'use client';
{/* @ts-ignore */}

import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <div
          className="elfsight-app-6d8e2ef2-c0fc-425b-8b9f-373878d5d685"
          data-elfsight-app-lazy
      />
  );
};

export default React.memo(WeatherWidget);
