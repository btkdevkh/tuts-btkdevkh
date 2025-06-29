import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="text-center p-3 bg-black text-white">
        &#169; {new Date().getFullYear()} | Gbaf Extranet |{" "}
        <Link to={"/about"} className="underline">
          Qui nous somme?
        </Link>
      </footer>
    </>
  );
};

export default Footer;
