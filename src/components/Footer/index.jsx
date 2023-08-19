import { socialsdata } from "../../data/socialsdata";

// The Footer component displays the footer section of the website, including social links and credits.
const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 max-w-4xl mx-auto mt-40 mb-20">
      {/* Social Links */}
      <div className="grid grid-cols-2  place-items-center gap-9">
        {/* Mapping through social data to display social links */}
        {socialsdata?.map((social, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {/* Social icon */}
            <img src={social?.img} alt={social?.title} className="h-5" />
            {/* Social title */}
            <p>{social?.title}</p>
          </div>
        ))}
      </div>

      {/* Blog Credits */}
      {/* Display the blog name */}
      <div className="">High Performance Web App Blog</div>
      {/* Display the credits */}
      <div className=" text-[13px]">Powered by Atop Web Technologies</div>
    </div>
  );
};

export default Footer;
