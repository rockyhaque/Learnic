import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="max-h-screen">
      <div className="flex justify-center items-center">
        <img
          className="max-h-[calc(100vh-220px)]"
          src="https://i.ibb.co/nmWx8cM/404.jpg"
          alt=""
        />
      </div>
      <Link to="/" className="flex justify-center pb-36">
        <h1 className="btn btn-info btn-sm md:btn-md lg:btn-lg bg-customSkyBlue font-bold text-sm md:text-lg lg:text-3xl">Go Home</h1>
      </Link>
    </div>
  );
}