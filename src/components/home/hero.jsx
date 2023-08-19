// Define the Hero component
// The Hero component displays a hero section with overlaying text.
const Hero = ({ postTxt }) => {
  // Render the Hero component's JSX
  return (
    <>
      <div className="h-[55vh] flex flex-col justify-center px-5 items-center">
        {/* Overlaying text */}
        <div className="font-semibold text-center">
          {/* Main heading */}
          <h1 className="text-[42px] md:text-7xl xl:text-8xl">
            {/* Display the provided postTxt or default text */}
            {postTxt ? postTxt : "MICROBLOGGING WORKSHOP"}
          </h1>
          {/* Subheading */}
          <h2 className="mt-10 text-2xl">
            MongoDB, Express, React and Node (MERN)
          </h2>
        </div>
      </div>
    </>
  );
};

// Export the Hero component as the default export
export default Hero;
