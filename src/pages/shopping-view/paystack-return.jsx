import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const transactionRef = params.get("trxref");
  const reference = params.get("reference");

  useEffect(() => {
    if (transactionRef && reference) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      console.log("wait for 10s for paystack data to be saved on the backend");

      const timeoutId = setTimeout(async () => {
        try {
          console.log("checking paystack data to save order....")

          dispatch(capturePayment({ transactionRef, reference, orderId })).then((data) => {
            console.log("paystack data confirmed: ", data?.payload?.success)
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/payment-success";
            }
          });

          console.log("Redirecting....");
        } catch (error) {
          console.error("Error checking Paystack data:", error);
        }
      }, 10000);

      return () => clearTimeout(timeoutId); // Cleanup on unmount
    }
  }, [transactionRef, reference, dispatch]);



  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaystackReturnPage;
