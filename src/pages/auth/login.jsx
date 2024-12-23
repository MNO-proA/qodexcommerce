import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data?.payload?.user)
      const user = data?.payload?.user
      if (data?.payload?.success) {
        if (user?.role !== "admin") {
           const savedAction = sessionStorage.getItem('intendedAction');
        // console.log(savedAction)
            if (savedAction) {
              const { productId, redirectPath } = JSON.parse(savedAction);
              // console.log(productId, redirectPath)
              // console.log(user)
              // console.log(addToCart)
              // console.log(fetchCartItems)

              dispatch(
                addToCart({
                  userId: user.id,
                  productId: productId,
                  quantity: 1,
                })
              ).then((cartData) => {
                if (cartData?.payload?.success) {
                  dispatch(fetchCartItems(user?.id));
                  toast({
                    title: "Product is added to cart",
                  });
                  // Clear the saved action
                  sessionStorage.removeItem('intendedAction');
                  // Redirect back to the original location
                  navigate(redirectPath);
                }
              });
            } else {
                // if (user?.role === "admin") {
                //   return navigate("/admin/dashboard")
                // }
                return navigate("/")
            }
        } else {
          return navigate("/admin/dashboard")
        }
       
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don&apos;t have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
