import React, { useState } from "react";
import { Hero } from "./components/organisms/Hero";
import { Header } from "./components/organisms/Header";
import { About } from "./components/organisms/About";
import { Projects } from "./components/organisms/Projects";
import { Contact } from "./components/organisms/Contact";
import { Footer } from "./components/organisms/Footer";
import { Preloader } from "./components/atoms/Preloader";

export const App: React.FC = () => {
  const [init, setInit] = useState<boolean>(false);

  return (
    <>
      {!init && <Preloader />}
      <Header />
      <main>
        <Hero init={init} setInit={setInit} />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
