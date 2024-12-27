/* eslint-disable react/prop-types */
// import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useEffect, useRef } from "react";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { Skeleton } from "../ui/skeleton";

// function ProductImageUpload({
//   imageFile,
//   setImageFile,
//   imageLoadingState,
//   uploadedImageUrl,
//   setUploadedImageUrl,
//   setImageLoadingState,
//   isEditMode,
//   isCustomStyling = false,
// }) {
//   const inputRef = useRef(null);

//   console.log(isEditMode, "isEditMode");

//   function handleImageFileChange(event) {
//     console.log(event.target.files, "event.target.files");
//     const selectedFile = event.target.files?.[0];
//     console.log(selectedFile);

//     if (selectedFile) setImageFile(selectedFile);
//   }

//   function handleDragOver(event) {
//     event.preventDefault();
//   }

//   function handleDrop(event) {
//     event.preventDefault();
//     const droppedFile = event.dataTransfer.files?.[0];
//     if (droppedFile) setImageFile(droppedFile);
//   }

//   function handleRemoveImage() {
//     setImageFile(null);
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   }

//   async function uploadImageToCloudinary() {
//     setImageLoadingState(true);
//     const data = new FormData();
//     console.log(data)
//     data.append("my_file", imageFile);
//     console.log(data)
//     const response = await axios.post(
//       `${import.meta.env.VITE_ADMIN_PRODUCTS_API_URL}/upload-image`,
//       data
//     );
//     console.log(response, "response");

//     if (response?.data?.success) {
//       setUploadedImageUrl(response.data.result.url);
//       console.log(uploadedImageUrl)
//       setImageLoadingState(false);
//     }
//   }

//   useEffect(() => {
//     if (imageFile !== null) uploadImageToCloudinary();
//   }, [imageFile]);

//   return (
//     <div
//       className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
//     >
//       <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
//       <div
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         className={`${
//           isEditMode ? "opacity-60" : ""
//         } border-2 border-dashed rounded-lg p-4`}
//       >
//         <Input
//           id="image-upload"
//           type="file"
//           className="hidden"
//           ref={inputRef}
//           onChange={handleImageFileChange}
//           disabled={isEditMode}
//         />
//         {!imageFile ? (
//           <Label
//             htmlFor="image-upload"
//             className={`${
//               isEditMode ? "cursor-not-allowed" : ""
//             } flex flex-col items-center justify-center h-32 cursor-pointer`}
//           >
//             <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
//             <span>Drag & drop or click to upload image</span>
//           </Label>
//         ) : imageLoadingState ? (
//           <Skeleton className="h-10 bg-gray-300" />
//         ) : (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <FileIcon className="w-8 text-primary mr-2 h-8" />
//             </div>
//             <p className="text-sm font-medium">{imageFile?.name}</p>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="text-muted-foreground hover:text-foreground"
//               onClick={handleRemoveImage}
//             >
//               <XIcon className="w-4 h-4" />
//               <span className="sr-only">Remove File</span>
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductImageUpload;

import { FileIcon, UploadCloudIcon, X } from "lucide-react"; // Changed XIcon to X
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null); // Clear the uploaded image URL
    setImageLoadingState(false); // Reset loading state
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      
      const response = await axios.post(
        `${import.meta.env.VITE_ADMIN_PRODUCTS_API_URL}/upload-image`,
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setImageLoadingState(false);
      // Optionally show error message to user
      handleRemoveImage(); // Clear the failed upload
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          accept="image/*" // Add file type restriction
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-center text-sm text-muted-foreground">
              Drag & drop or click to upload image
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="space-y-2">
            <Skeleton className="h-10 bg-gray-300" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uploading...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel Upload</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <div className="flex items-center flex-1 min-w-0">
              <FileIcon className="w-8 h-8 text-primary mr-2 flex-shrink-0" />
              <p className="text-sm font-medium truncate">
                {imageFile?.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveImage}
              className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
      {uploadedImageUrl && (
        <div className="mt-4">
          <img
            src={uploadedImageUrl}
            alt="Uploaded preview"
            className="max-h-40 rounded object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
