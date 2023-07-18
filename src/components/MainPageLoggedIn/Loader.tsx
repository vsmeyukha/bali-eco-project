// const Loader: React.FC = () => {
//   return (
//     <div className="z-50 flex justify-center items-center h-screen">
//       <div className="animate-spin rounded-full h-[100px] w-[100px] border-t-2 border-b-2 border-purple-500"></div>
//     </div>
//   );
// };

const Loader: React.FC = () => {
  return (
    <div
      className="
        h-[30px]
        w-[30px]
        mr-[12px]
        animate-spin 
        rounded-full 
        border-4
        border-solid
        border-white
        border-r-transparent
        align-[-0.125em]
        motion-reduce:animate-[spin_1.5s_linear_infinite]"
      >
    </div>
  );
};


export default Loader;
