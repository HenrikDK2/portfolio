import { css, styled } from "goober";
import { memo } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const FooterElem = styled("footer")`
  height: 150px;
  background-color: #222831;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  & h2 {
    font-size: 1.5rem;
    text-align: center;
    white-space: pre;
    @media (max-width: 400px) {
      font-size: 6vw;
    }
  }

  & > div {
    text-align: center;
  }
`;

const IconLink = styled("a")`
  text-decoration: none;
  color: #000;
`;

const icons = css`
  font-size: 2.5rem;
  color: #fff;
  margin: 0 30px;
  cursor: pointer;
`;

const linkedIn = css`
  transition: background 0.5s;
  width: 50px;
  height: 50px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(14, 118, 168);
  }
`;

const copyStyle = css`
  & {
    display: block;
    margin: 10px 0 0 0;
    font-size: 1rem;
    white-space: pre-wrap;
    @media (max-width: 410px) {
      font-size: 3vw;
    }
  }
`;

const github = css`
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Footer: React.FC = memo(() => (
  <FooterElem>
    <IconLink
      href="https://www.linkedin.com/in/henrik-mundt-milo/"
      title="Link til Henrik Mundt Milo Linked profil"
      className={`${linkedIn} ${icons}`}
    >
      <FaLinkedinIn aria-label="Linkedin Profil" />
    </IconLink>

    <h2>
      Henrik Mundt Milo
      <span className={copyStyle}>
        © Copyright {new Date().getFullYear()}. All Rights Reserved.
      </span>
    </h2>
    <IconLink
      title="Link til Henrik Mundt Milo Github. Mange af mine webudvikler projekter er private."
      href="https://github.com/HenrikDK2"
      className={`${github} ${icons}`}
    >
      <FaGithub aria-label="Github Profil" />
    </IconLink>
  </FooterElem>
));
