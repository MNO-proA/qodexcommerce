/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
// import bannerOne from "../../assets/banner-1.webp";
// import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import MobileNavigation from "@/components/shopping-view/MobileNavigation";
import CategorySection from "@/components/shopping-view/CategorySection";


const categoriesWithIcon = [
  { id: "beauty", label: "Beauty", icon: ShoppingBasket },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
];

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: Shirt },
//   { id: "adidas", label: "Adidas", icon: WashingMachine },
//   { id: "puma", label: "Puma", icon: ShoppingBasket },
//   { id: "levi", label: "Levi's", icon: Airplay },
//   { id: "zara", label: "Zara", icon: Images },
//   { id: "h&m", label: "H&M", icon: Heater },
// ];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  //   return (
  //     <div className="flex flex-col min-h-screen">

  <div className="relative w-full aspect-[16/9] sm:h-[600px] overflow-hidden">
    {featureImageList && featureImageList.length > 0
      ? featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            loading="lazy"
            alt={`Slide ${index + 1}`}
            className={`${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            } absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out`}
          />
        ))
      : null}

    {/* Previous Button */}
    <button
      onClick={() =>
        setCurrentSlide(
          (prevSlide) =>
            (prevSlide - 1 + featureImageList.length) % featureImageList.length
        )
      }
      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition sm:p-3 sm:left-6"
    >
      <ChevronLeftIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700" />
    </button>

    {/* Next Button */}
    <button
      onClick={() =>
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % featureImageList.length
        )
      }
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition sm:p-3 sm:right-6"
    >
      <ChevronRightIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700" />
    </button>

    {/* Slide Indicators */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      {featureImageList.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            index === currentSlide ? "bg-gray-700" : "bg-gray-300"
          } transition-all duration-300`}
          onClick={() => setCurrentSlide(index)}
        />
      ))}
    </div>
  </div>;

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {" "}
      {/* Added padding bottom for mobile nav */}
      <div className="relative w-full aspect-[16/9] sm:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                loading="lazy"
                alt={`Slide ${index + 1}`}
                className={`${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out`}
              />
            ))
          : null}

        {/* Previous Button */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition sm:p-3 sm:left-6"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700" />
        </button>

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white hover:scale-105 transition sm:p-3 sm:right-6"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-700" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featureImageList.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentSlide ? "bg-gray-700" : "bg-gray-300"
              } transition-all duration-300`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

    <CategorySection handleNavigateToListingPage={handleNavigateToListingPage}/>
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 lg:mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      
    </div>
  );
}

export default ShoppingHome;
