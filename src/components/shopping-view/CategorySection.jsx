/* eslint-disable react/prop-types */
import beauty from '../../assets/beauty.webp'
import accessories from '../../assets/fashion-accessories.webp'

// const categoriesWithIcon = [
//     { id: "beauty", label: "Beauty", image: beauty },
//     { id: "accessories", label: "Accessories",  image: accessories },
//   ];

// const CategorySection = ({ handleNavigateToListingPage }) => {
//   return (
//     <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8">
//           Shop by category
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
//           {categoriesWithIcon.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleNavigateToListingPage(category, "category")}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="w-full aspect-square max-w-[200px] mb-3">
//                 <div className="w-full h-full rounded-full shadow-md overflow-hidden p-6 transition-transform duration-300 group-hover:scale-105">
//                   <img
//                     src={category.image}
//                     alt={category.label}
//                     className="w-full h-full object-contain rounded-full"
//                   />
//                 </div>
//               </div>
//               <span className="text-sm font-medium text-center text-gray-900">
//                 {category.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;




// const categoriesWithIcon = [
//   { id: "beauty", label: "Beauty", image: beauty },
//   { id: "accessories", label: "Accessories", image: accessories },
// ];

// const CategorySection = ({ handleNavigateToListingPage }) => {
//   return (
//     <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8">
//           Shop by category
//         </h2>
//         <div className="flex justify-center gap-4">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
//           {categoriesWithIcon.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleNavigateToListingPage(category, "category")}
//               className="flex flex-col items-center cursor-pointer group"
//             >
//               <div className="relative w-full aspect-square max-w-[200px] mb-3">
//                 {/* Base white circle with shadow */}
//                 <div className="absolute inset-0 rounded-full bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1" />
                
//                 {/* Image container */}
//                 <div className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
//                   <img
//                     src={category.image}
//                     alt={category.label}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <span className="text-sm font-medium text-center text-gray-900 transition-transform duration-300 group-hover:-translate-y-1">
//                 {category.label}
//               </span>
//             </div>
//           ))}
//         </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;


const categoriesWithIcon = [
  { id: "beauty", label: "Beauty", image: beauty },
  { id: "accessories", label: "Accessories", image: accessories },
];

const CategorySection = ({ handleNavigateToListingPage }) => {
  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8">
          Shop by category
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 max-w-2xl">
            {categoriesWithIcon.map((category) => (
              <div
                key={category.id}
                onClick={() => handleNavigateToListingPage(category, "category")}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative w-full aspect-square max-w-[200px] mb-3">
                  {/* Base white circle with shadow */}
                  <div className="absolute inset-0 rounded-full bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1" />
                  
                  {/* Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-center text-gray-900 transition-transform duration-300 group-hover:-translate-y-1">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;




















      {/* <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 lg:mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow w-full sm:w-[240px]"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                  <categoryItem.icon className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-4 text-primary" />
                  <span className="text-sm sm:text-base font-bold">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
      </section> */}