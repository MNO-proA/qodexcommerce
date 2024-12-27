/* eslint-disable react/prop-types */

// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import AnimatedLoader from "./AnimateLoader";

// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
// }) {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [badgeVisible, setBadgeVisible] = useState(false);
//   const tileRef = useRef(null);
//   const [isButtonLoading, setIsButtonLoading] = useState(false);
//   const { isLoading } = useSelector((state) => state. shopCart);
 

//   useEffect(() => {
//     const tileElement = tileRef.current;
//     if (tileElement) {
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             // Delay badge animation
//             setTimeout(() => setBadgeVisible(true), 500);
//           }
//         },
//         {
//           threshold: 0.1,
//         }
//       );

//       observer.observe(tileElement);

//       return () => {
//         observer.unobserve(tileElement);
//       };
//     }
//   }, []);

//   const handleCartAction = (productId, totalStock) => {
    
//     if (!isAuthenticated) {
//       setIsButtonLoading(true);
//       sessionStorage.setItem(
//         'intendedAction',
//         JSON.stringify({
//           type: 'ADD_TO_CART',
//           productId,
//           totalStock,
//           redirectPath: location.pathname,
//         })
//       );
//       navigate('/auth/login');
//       return;
//     }
//     handleAddtoCart(productId, totalStock);
//   };

//   return (
//     <Card 
//       ref={tileRef}
//       className="h-full flex flex-col overflow-hidden"
//     >
//       <div
//         onClick={() => handleGetProductDetails(product?._id)}
//         className="flex-1"
//       >
//         <div className="relative w-full pt-[100%]">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-all duration-700 ease-out
//               ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
//             loading="lazy"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-3 sm:p-4">
//           <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-2 line-clamp-2">
//             {product?.title}
//           </h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-xs sm:text-sm text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through text-gray-400" : ""
//               } text-sm sm:text-base font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-sm sm:text-base font-semibold text-red-500">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter className="p-3 sm:p-4">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed text-xs sm:text-sm">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleCartAction(product?._id, product?.totalStock)}
//             className="w-full text-xs sm:text-sm"
//           >
//             {isAuthenticated && !isLoading ? "Add to Cart" : isAuthenticated && isLoading ? <AnimatedLoader/> :  "Login to Add to cart"}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;


// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Button } from "../ui/button";
// import { categoryOptionsMap } from "@/config";
// import { Badge } from "../ui/badge";
// import { useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import AnimatedLoader from "./AnimateLoader";


// function ShoppingProductTile({
//   product,
//   handleGetProductDetails,
//   handleAddtoCart,
// }) {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isVisible, setIsVisible] = useState(false);
//   const [badgeVisible, setBadgeVisible] = useState(false);
//   const tileRef = useRef(null);
//   const [isLoadingProduct, setIsLoadingProduct] = useState(false);

//   useEffect(() => {
//     const tileElement = tileRef.current;
//     if (tileElement) {
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             setTimeout(() => setBadgeVisible(true), 500);
//           }
//         },
//         {
//           threshold: 0.1,
//         }
//       );

//       observer.observe(tileElement);

//       return () => {
//         observer.unobserve(tileElement);
//       };
//     }
//   }, []);

//   const handleCartAction = async (productId, totalStock) => {
//     if (!isAuthenticated) {
//       setIsLoadingProduct(true);
//       sessionStorage.setItem(
//         'intendedAction',
//         JSON.stringify({
//           type: 'ADD_TO_CART',
//           productId,
//           totalStock,
//           redirectPath: location.pathname,
//         })
//       );
//       navigate('/auth/login');
//       return;
//     }
//     setIsLoadingProduct(true);
//     await handleAddtoCart(productId, totalStock);
//     // setIsLoadingProduct(false);
//   };

//   return (
//     <Card 
//       ref={tileRef}
//       className="h-full flex flex-col overflow-hidden"
//     >
//       <div
//         onClick={() => handleGetProductDetails(product?._id)}
//         className="flex-1"
//       >
//         <div className="relative w-full pt-[100%]">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-all duration-700 ease-out
//               ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
//             loading="lazy"
//           />
//           {product?.totalStock === 0 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               Out Of Stock
//             </Badge>
//           ) : product?.totalStock < 10 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               {`Only ${product?.totalStock} items left`}
//             </Badge>
//           ) : product?.salePrice > 0 ? (
//             <Badge 
//               className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
//                 ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
//             >
//               Sale
//             </Badge>
//           ) : null}
//         </div>
//         <CardContent className="p-3 sm:p-4">
//           <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-2 line-clamp-2">
//             {product?.title}
//           </h2>
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-xs sm:text-sm text-muted-foreground">
//               {categoryOptionsMap[product?.category]}
//             </span>
//           </div>
//           <div className="flex justify-between items-center mb-2">
//             <span
//               className={`${
//                 product?.salePrice > 0 ? "line-through text-gray-400" : ""
//               } text-sm sm:text-base font-semibold text-primary`}
//             >
//               ${product?.price}
//             </span>
//             {product?.salePrice > 0 ? (
//               <span className="text-sm sm:text-base font-semibold text-red-500">
//                 ${product?.salePrice}
//               </span>
//             ) : null}
//           </div>
//         </CardContent>
//       </div>
//       <CardFooter className="p-3 sm:p-4">
//         {product?.totalStock === 0 ? (
//           <Button className="w-full opacity-60 cursor-not-allowed text-xs sm:text-sm">
//             Out Of Stock
//           </Button>
//         ) : (
//           <Button
//             onClick={() => handleCartAction(product?._id, product?.totalStock)}
//             className="w-full text-xs sm:text-sm"
//           >
//             {isAuthenticated && !isLoadingProduct ? (
//               "Add to Cart"
//             ) : isAuthenticated && isLoadingProduct ? (
//               <AnimatedLoader />
//             ) : (
//               "Login to Add to cart"
//             )}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// }

// export default ShoppingProductTile;


import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AnimatedLoader from "./AnimateLoader";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading, loadingProductId } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const tileRef = useRef(null);

  useEffect(() => {
    const tileElement = tileRef.current;
    if (tileElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setBadgeVisible(true), 500);
          }
        },
        {
          threshold: 0.1,
        }
      );

      observer.observe(tileElement);

      return () => {
        observer.unobserve(tileElement);
      };
    }
  }, []);

  const handleCartAction = (productId, totalStock) => {
    if (!isAuthenticated) {
      sessionStorage.setItem(
        'intendedAction',
        JSON.stringify({
          type: 'ADD_TO_CART',
          productId,
          totalStock,
          redirectPath: location.pathname,
        })
      );
      navigate('/auth/login');
      return;
    }
    handleAddtoCart(productId, totalStock);
  };

  const isProductLoading = isLoading && loadingProductId === product?._id;

  return (
    <Card 
      ref={tileRef}
      className="h-full flex flex-col overflow-hidden"
    >
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="flex-1"
      >
        <div className="relative w-full pt-[100%]">
          <img
            src={product?.image}
            alt={product?.title}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-all duration-700 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            loading="lazy"
          />
          {product?.totalStock === 0 ? (
            <Badge 
              className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
                ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge 
              className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
                ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge 
              className={`absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm transition-all duration-500 ease-out
                ${badgeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-2 line-clamp-2">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400" : ""
              } text-sm sm:text-base font-semibold text-primary`}
            >
              GHS {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-sm sm:text-base font-semibold text-red-500">
                GHS {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-3 sm:p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-xs sm:text-sm">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleCartAction(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm"
            disabled={isProductLoading}
          >
            {isAuthenticated && !isProductLoading ? (
              "Add to Cart"
            ) : isAuthenticated && isProductLoading ? (
              <AnimatedLoader />
            ) : (
              "Login to Add to cart"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;