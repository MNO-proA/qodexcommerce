
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";


function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
   const location = useLocation();

  const handleCartAction = (productId, totalStock) => {
    if (!isAuthenticated) {
      // Save the intended action and current location in sessionStorage
      sessionStorage.setItem(
        'intendedAction',
        JSON.stringify({
          type: 'ADD_TO_CART',
          productId,
          totalStock,
          redirectPath: location.pathname, // Capture the current path
        })
      );
      navigate('/auth/login');
      return;
    }
  
    handleAddtoCart(productId, totalStock);
  };
  

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            {/* <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span> */}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleCartAction(product?._id, product?.totalStock)}
            className="w-full"
          >
            {isAuthenticated ? "Add to cart" : "Login to Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;