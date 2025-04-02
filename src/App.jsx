import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// imports
import LoadingPage from "./pages/LoadingPage";
// lazy loadings
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const CompanyAdd = lazy(() => import("./pages/AddPage"));
const CompanyEdit = lazy(() => import("./pages/EditPage"));
const CompanyDetails = lazy(() => import("./pages/DetailsPage"));
const CompanyList = lazy(() => import("./pages/ListPage"));
// react router for routing
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<CompanyList />} />
      <Route path="add" element={<CompanyAdd />} />
      <Route path="edit/:id" element={<CompanyEdit />} />
      <Route path="detail/:id" element={<CompanyDetails />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return (
    // suspense for lazy loading
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
