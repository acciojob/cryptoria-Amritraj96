//your JS code here. If required.
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 1. Caesar Cipher Decryption Function
// Assumes a standard shift key (e.g., 3). Adjust the key if your specific test data specifies another.
const decryptCaesar = (str, shift = 3) => {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      
      // Decrypt Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      // Decrypt Lowercase letters
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
      // Return special characters/spaces unchanged
      return char;
    })
    .join('');
};

// 2. Merge Sort Implementation (Sorting by Date ascending)
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 1024) > 0 ? Math.floor(arr.length / 2) : Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    // Compare dates as strings (YYYY-MM-DD compares chronologically naturally)
    if (new Date(left[i].date) <= new Date(right[j].date)) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
};

// 3. React App Component
const App = () => {
  // Sample encrypted input data received from King Ashoka's spies
  // Replace this array with your actual props or test-case data source if provided
  const [encryptedMessages] = useState([
    { date: "2023-04-12", text: "Whvw phvvdjh" }, // e.g., "Test message" shifted by 3
    { date: "2023-04-09", text: "Frgxlqj" },
    { date: "2023-04-11", text: "Wklv lv d whvw" },
    { date: "2023-04-10", text: "Dqrwkhu whvww" }
  ]);

  const [processedMessages, setProcessedMessages] = useState([]);

  useEffect(() => {
    // Step A: Decrypt all messages
    const decrypted = encryptedMessages.map((msg) => ({
      ...msg,
      text: decryptCaesar(msg.text, 3) // Modify shift value here if required
    }));

    // Step B: Sort using Merge Sort
    const sorted = mergeSort(decrypted);

    setProcessedMessages(sorted);
  }, [encryptedMessages]);

  return (
    <div>
      <h1>Aryabhatta's Message Decrypter</h1>
      <ul id="message-container">
        {processedMessages.map((msg, index) => (
          <li key={index}>
            {`${msg.date}: ${msg.text}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Mount to the DOM target element
ReactDOM.render(<App />, document.getElementById('root'));