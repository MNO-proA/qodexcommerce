// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";


// function PaystackReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const transactionRef = params.get("trxref");
//   const reference = params.get("reference");

//   useEffect(() => {
//     if (transactionRef && reference) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
//       console.log("wait for 10s for paystack data to be saved on the backend");

//       const timeoutId = setTimeout(async () => {
//         try {
//           console.log("checking paystack data to save order....")

//           dispatch(capturePayment({ transactionRef, reference, orderId })).then((data) => {
//             console.log("paystack data confirmed: ", data?.payload?.success)
//             if (data?.payload?.success) {
//               sessionStorage.removeItem("currentOrderId");
//               window.location.replace("/shop/payment-success");
//             }
//           });

//           console.log("Redirecting....");
//         } catch (error) {
//           console.error("Error checking Paystack data:", error);
//         }
//       }, 10000);

//       return () => clearTimeout(timeoutId); // Cleanup on unmount
//     }
//   }, [transactionRef, reference, dispatch]);



//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing Payment...Please wait!</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaystackReturnPage;


// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, Navigate } from "react-router-dom";

// function PaystackReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const params = new URLSearchParams(location.search);
//   const transactionRef = params.get("trxref");
//   const reference = params.get("reference");

//   useEffect(() => {
//     if (transactionRef && reference && isAuthenticated) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
//       console.log("wait for 10s for paystack data to be saved on the backend");

//       const timeoutId = setTimeout(async () => {
//         try {
//           console.log("checking paystack data to save order....");
          
//           const result = await dispatch(capturePayment({ transactionRef, reference, orderId }));
//           console.log("paystack data confirmed: ", result?.payload?.success);
          
//           if (result?.payload?.success) {
//             sessionStorage.removeItem("currentOrderId");
//             // Use window.location.replace to ensure clean navigation
//             window.location.replace("/shop/payment-success");
//           }
//         } catch (error) {
//           console.error("Error checking Paystack data:", error);
//         }
//       }, 10000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [transactionRef, reference, dispatch, isAuthenticated]);

//   // Redirect if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" />;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing Payment...Please wait!</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaystackReturnPage;


// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment } from "@/store/shop/order-slice";
// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

// function PaystackReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const authChecked = useRef(false);
//   const params = new URLSearchParams(location.search);
//   const transactionRef = params.get("trxref");
//   const reference = params.get("reference");

//   useEffect(() => {
//     // Store auth state immediately on component mount
//     if (!authChecked.current) {
//       authChecked.current = true;
//       const token = localStorage.getItem('token');
//       sessionStorage.setItem('paymentAuthState', JSON.stringify({ 
//         isAuthenticated, 
//         token,
//         timestamp: Date.now() 
//       }));
//     }

//     if (transactionRef && reference) {
//       const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

//       const timeoutId = setTimeout(() => {
//         // Compare current auth state with stored state
//         const storedAuth = JSON.parse(sessionStorage.getItem('paymentAuthState'));
//         const currentToken = localStorage.getItem('token');
        
//         if (!storedAuth || storedAuth.token !== currentToken) {
//           console.error('Auth state changed during payment processing');
//           // Attempt to recover stored auth state
//           if (storedAuth?.token) {
//             localStorage.setItem('token', storedAuth.token);
//             // Force page reload to reinitialize auth
//             window.location.reload();
//             return;
//           }
//         }

//         dispatch(capturePayment({ transactionRef, reference, orderId }))
//           .then((data) => {
//             if (data?.payload?.success) {
//               sessionStorage.removeItem("currentOrderId");
//               sessionStorage.removeItem("paymentAuthState");
//               window.location.replace("/shop/payment-success");
//             }
//           });
//       }, 10000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [transactionRef, reference, dispatch, isAuthenticated]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Processing Payment...Please wait!</CardTitle>
//       </CardHeader>
//     </Card>
//   );
// }

// export default PaystackReturnPage;


import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { checkAuth } from "@/store/auth-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const params = new URLSearchParams(location.search);
  const transactionRef = params.get("trxref");
  const reference = params.get("reference");

  useEffect(() => {
    // Verify auth state before timeout
    dispatch(checkAuth());

    if (transactionRef && reference) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      const timeoutId = setTimeout(async () => {
        // Recheck auth before capture
        await dispatch(checkAuth());
        
        if (isAuthenticated) {
          const result = await dispatch(capturePayment({ transactionRef, reference, orderId }));
          if (result?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            // Use navigate instead of location.replace
            window.location.href = "/shop/payment-success";
          }
        }
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [transactionRef, reference, dispatch, isAuthenticated]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaystackReturnPage;