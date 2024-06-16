import { useState, useCallback } from "react";

/**
 * Custom hook to convert image file to base64 string.
 *
 * @returns {Object} { base64, error, handleFileChange }
 * - base64: The converted base64 string of the image.
 * - error: Any error encountered during the conversion process.
 * - handleFileChange: Function to handle file input change events.
 */
export default function useImageToBase64() {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];

    if (file) {
      // Ensure the selected file is an image
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        setBase64(""); // Reset the base64 state
        return;
      }

      setError(null); // Reset any previous error

      // Convert the image file to a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result); // Set the base64 string to the state
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }, []);

  return { base64, error, handleFileChange };
}

// export default useImageToBase64;
