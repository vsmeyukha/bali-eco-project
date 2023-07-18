const SmallLoader: React.FC = () => {
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


export default SmallLoader;
