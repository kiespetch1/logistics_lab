'use client';

import React, { memo, useEffect } from 'react';

const RadioWidget: React.FC = () => {
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
      <div>
        <div
            className="elfsight-app-3b9ddb51-290a-4e95-8094-79b6a04a8bbe"
            data-elfsight-app-lazy
        />
        Виджет радио
      </div>
  );
};

export default memo(RadioWidget);
