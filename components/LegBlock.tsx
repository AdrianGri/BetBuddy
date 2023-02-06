const LegBlock = () => {
  return(
    <div className="flex flex-row justify-between w-[800px] h-[100px]">
      <div className="flex flex-row p-5 justify-between items-center bg-[#e2e2e2] w-[680px] h-[100px] rounded-[20px]">
        <div className="flex flex-row items-center">
          <div className="h-[50px] w-[50px] bg-[#FB9B0B] mr-5" />
          <p className="text-[24px] font-semibold">LeBron James</p>
        </div>
        <p className="text-[24px] font-semibold">
          4+ Rebounds
        </p>
      </div>
      <div className="flex flex-row justify-center items-center w-[100px] h-[100px] bg-[#e2e2e2] rounded-[20px]">
        <p className="text-[24px] font-semibold">86%</p>
      </div>
    </div>
  );
};

export default LegBlock;