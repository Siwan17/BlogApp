import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Topbar from "../Components/sharedComponent/Topbar";
import Loader from "../Components/sharedComponent/Loader";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
