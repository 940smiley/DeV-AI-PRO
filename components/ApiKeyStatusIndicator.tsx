
import React, { useState, useEffect } from 'react';
import { API_KEY_CHECK_MESSAGE, API_KEY_MISSING_MESSAGE } from '../constants.tsx';

const ApiKeyStatusIndicator: React.FC = () => {
  const [apiKeyIsSet, setApiKeyIsSet] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof process !== 'undefined' && process.env && (process.env.API_KEY || process.env.GEMINI_API_KEY)) {
      setApiKeyIsSet(true);
    } else {
      setApiKeyIsSet(false);
    }
  }, []);

  if (apiKeyIsSet === null) {
    return null; // Don't render until check is complete
  }

  const message = apiKeyIsSet ? API_KEY_CHECK_MESSAGE : API_KEY_MISSING_MESSAGE;
  const bgColor = apiKeyIsSet ? 'bg-green-700' : 'bg-red-700';

  return (
    <div className={`p-2 text-center text-xs text-white ${bgColor} fixed top-0 left-0 right-0 z-50`}>
      {message}
    </div>
  );
};

export default ApiKeyStatusIndicator;