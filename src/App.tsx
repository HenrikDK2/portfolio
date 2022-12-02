import React, { useState } from "react";
import { Hero } from "./components/organisms/Hero";
import { Header } from "./components/organisms/Header";
import { About } from "./components/organisms/About";
import { Projects } from "./components/organisms/Projects";
import { Contact } from "./components/organisms/Contact";
import { Footer } from "./components/organisms/Footer";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
