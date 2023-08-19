import React from "react";
import Hero from "../components/home/hero";
import Blogs from "../components/blog/blogs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      {/* Header Component: Renders the header section of the home page */}
      <Header />

      {/* Hero Component: Renders a hero section, possibly with a call to action */}
      <Hero />

      {/* Blogs Component: Renders a section displaying a list of blog posts */}
      <Blogs />

      {/* Footer Component: Renders the footer section of the home page */}
      <Footer />
    </div>
  );
};

export default Home;
