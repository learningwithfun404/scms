const SectionHeading = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <h2 className="text-gray-500 text-sm">{subTitle}</h2>
    </div>
  );
};

export default SectionHeading;
