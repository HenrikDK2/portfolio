import { styled } from "goober";

export const Link = styled("a")`
  text-decoration: none;
  color: #000;
`;

export const NavLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  white-space: pre;
  margin: 0 25px;
  color: #d9d9d9;
  &:hover,
  &:focus {
    color: #fff;
  }
  @media (max-width: 515px) {
    display: inline-block;
    transition: all 0.1s;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 20px 0 20px 0;
    margin-right: 30px;
    color: #fff;
  }
`;
