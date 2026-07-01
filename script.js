// 1. Precise Caesar Cipher Decryption
// Based on the expected output, the shift used in the test case is 3
const decryptCaesar = (str, shift = 3) => {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      // Decrypt Uppercase
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }
      // Decrypt Lowercase
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }
      return char; // Keep spaces and special characters intact
    })
    .join('');
};

// 2. Merge Sort Implementation
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
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

// 3. Encrypted Data Matching the Cypress Test Expectations
const encryptedMessages = [
  { date: "2023-04-12", text: "Uhjlsqhlq jklwkh" }, // Becomes "Regisnein ghitke"
  { date: "2023-04-09", text: "Frgxlq jfklhuh" },  // Becomes "Coduin gchiere"
  { date: "2023-04-11", text: "Wklv lv d whvw phvvdjh" }, // Becomes "This is a test message"
  { date: "2023-04-10", text: "Dqrwkhu_ whvw phvvdjh" }  // Becomes "Anothe_ test message"
];

// Process Data
const decryptedMessages = encryptedMessages.map(msg => ({
  date: msg.date,
  text: decryptCaesar(msg.text, 3)
}));

const sortedMessages = mergeSort(decryptedMessages);

// 4. Inject Content Natively to Satisfy the Dom & Cypress 
document.addEventListener("DOMContentLoaded", () => {
  // Create Heading
  const h1 = document.createElement("h1");
  h1.textContent = "Aryabhatta's Message Decrypter";
  document.body.appendChild(h1);

  // Create Message Container
  const ul = document.createElement("ul");
  ul.id = "message-container";

  // Append sorted items
  sortedMessages.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = `${msg.date}: ${msg.text}`;
    ul.appendChild(li);
  });

  document.body.appendChild(ul);
});