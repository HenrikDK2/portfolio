import React, { useState, useEffect } from "react";
import { Hero } from "./components/organisms/Hero";
import { Header } from "./components/organisms/Header";
import { About } from "./components/organisms/About";
import { Projects } from "./components/organisms/Projects";
import { Contact } from "./components/organisms/Contact";
import { Footer } from "./components/organisms/Footer";
import { IInit } from "./types";

const preloader = document.getElementById("preloader");

export const App: React.FC = () => {
  const [init, setInit] = useState<IInit>({ playAnim: false, preload: false });

  useEffect(() => {
    if (init.preload && preloader) {
      preloader.style.opacity = "0";
      preloader.addEventListener("transitionend", () => preloader.remove());
      preloader.addEventListener("transitionstart", () => {
        setInit({ ...init, playAnim: true });
      });
    }
  }, [init]);

  return (
    <>
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
