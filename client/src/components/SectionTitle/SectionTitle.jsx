const SectionTitle = ({ heading, description }) => {
  return (
    <div className="mx-auto text-center w-full my-8 ">
      <h3 className="text-base md:text-3xl font-semibold py-4 font-raleway bg-gradient-to-r from-indigo-900 to-sky-900 bg-clip-text text-transparent" data-aos="fade-left">
        {heading}
      </h3>
      <div className="w-full md:w-1/2 mx-auto pb-2">
        <p className="text-center text-base md:text-lg mx-4" data-aos="fade-right">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
