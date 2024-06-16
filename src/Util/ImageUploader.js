import React from "react";
import useImageToBase64 from "./useImageToBase64"; // Adjust the import path as needed

export function ImageUploader() {
  const { base64, error, handleFileChange } = useImageToBase64();

  return (
    <div>
      <h2>Upload and Convert Image to Base64</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {base64 && (
        <div>
          <h3>Converted Base64 Image</h3>
          <img
            src={base64}
            alt="Converted"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <textarea
            value={base64}
            readOnly
            rows="10"
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

// export default ImageUploader;
