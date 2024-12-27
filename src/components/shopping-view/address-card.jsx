/* eslint-disable react/prop-types */
// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Label } from "../ui/label";
// import AnimatedLoader from "./AnimateLoader";

// function AddressCard({
//   addressInfo,
//   handleDeleteAddress,
//   handleEditAddress,
//   setCurrentSelectedAddress,
//   selectedId,
//   isAddressLoading 
// }) {
//   return (
//     <Card
//       onClick={
//         setCurrentSelectedAddress
//           ? () => setCurrentSelectedAddress(addressInfo)
//           : null
//       }
//       className={`cursor-pointer border-red-700 ${
//         selectedId?._id === addressInfo?._id
//           ? "border-red-900 border-[4px]"
//           : "border-black"
//       }`}
//     >
//       <CardContent className="grid p-4 gap-4">
//         <Label>Address: {addressInfo?.address}</Label>
//         <Label>City: {addressInfo?.city}</Label>
//         <Label>Phone: {addressInfo?.phone}</Label>
//         <Label>Notes: {addressInfo?.notes}</Label>
//       </CardContent>
//       <CardFooter className="p-3 flex justify-between">

//         <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
//         <Button onClick={() => handleDeleteAddress(addressInfo)}>{isAddressLoading? <AnimatedLoader/> : "Delete"}</Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default AddressCard;
// AddressCard.jsx
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import AnimatedLoader from "./AnimateLoader";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
  isLoading,
  loadingAddressId,
  loadingType
}) {
  const isDeleting = isLoading && loadingAddressId === addressInfo?._id && loadingType === 'delete';
  const isEditing = isLoading && loadingAddressId === addressInfo?._id && loadingType === 'edit';

  return (
    <Card
      onClick={
        setCurrentSelectedAddress && !isDeleting && !isEditing
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button 
          onClick={() => handleEditAddress(addressInfo)}
          disabled={isDeleting || isEditing}
        >
          {isEditing ? <AnimatedLoader /> : "Edit"}
        </Button>
        <Button 
          onClick={() => handleDeleteAddress(addressInfo)}
          disabled={isDeleting || isEditing}
        >
          {isDeleting ? <AnimatedLoader /> : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;