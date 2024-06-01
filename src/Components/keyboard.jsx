import React, { useState } from 'react';

const keys = {
  en: {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    alphabets: [
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
      'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ],
    common: ['@', '#', '$', '%', '&', '*', '(', ')', '-', '+', '=', ',', '.']
  },
  ar: {
    numbers: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠'],
    alphabets: [
      'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح',
      'ج', 'د', 'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت',
      'ن', 'م', 'ك', 'ط', 'ئ', 'ء', 'ؤ', 'ر', 'لا',
      'ى', 'ة', 'و', 'ز', 'ظ', ' ',
    ],
    common: ['@', '#', '$', '%', '&', '*', '(', ')', '-', '+', '=', '،', '٫']
  }
};

const Keyboard = ({ onKeyPress, className, style }) => {
  const [currentTab, setCurrentTab] = useState('alphabets');
  const [isShift, setIsShift] = useState(false);
  const [language, setLanguage] = useState('en'); // Default to English

  const handleKeyPress = (key) => {
    if (onKeyPress) {
      onKeyPress(key);
    }
  };

  const toggleShift = () => {
    setIsShift(!isShift);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const renderKeys = () => {
    let keySet = keys[language][currentTab];
    if (currentTab === 'alphabets' && isShift) {
      keySet = keySet.map(key => language === 'en' ? key.toUpperCase() : key);
    }

    return keySet.map((key, index) => (
      <button
        key={index}
        className="bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 active:bg-gray-300 transition-all w-14 h-14 text-lg"
        onClick={() => handleKeyPress(key)}
      >
        {key}
      </button>
    ));
  };

  const handleBackspace = () => {
    handleKeyPress('Backspace');
  };

  return (
    <div className={`p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg max-w-3xl mx-auto ${className}`} style={style}>
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 rounded-lg shadow ${currentTab === 'alphabets' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setCurrentTab('alphabets')}
        >
          Alphabets
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${currentTab === 'numbers' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setCurrentTab('numbers')}
        >
          Numbers
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${currentTab === 'common' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setCurrentTab('common')}
        >
          Common
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${language === 'ar' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'}`}
          onClick={toggleLanguage}
        >
          {language === 'ar' ? 'العربية' : 'English'}
        </button>
      </div>
      <div className="grid grid-cols-10 gap-2 mb-4">
        {renderKeys()}
        {currentTab === 'alphabets' && (
          <button
            className={`col-span-2 px-4 py-2 ${isShift ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'} rounded-lg shadow transition-all w-28 h-14 text-lg`}
            onClick={toggleShift}
          >
            Shift
          </button>
        )}
        <button
          className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 active:bg-gray-300 transition-all w-28 h-14 text-lg"
          onClick={handleBackspace}
        >
          Back
        </button>
        <button
          className="col-span-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 active:bg-gray-300 transition-all w-28 h-14 text-lg"
          onClick={() => handleKeyPress('Enter')}
        >
          Enter
        </button>
        <button
          className="col-span-4 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 active:bg-gray-300 transition-all w-full h-14 text-lg"
          onClick={() => handleKeyPress(' ')}
        >
          Space
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
