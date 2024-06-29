import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import UserProvider from "./contexts/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import ManagePosts from "./components/ManagePosts";
import LoadingProvider from "./contexts/LoadingContext";
import PostForm from "./components/PostForm";
import CsrfTokenProvider from "./contexts/CsrfTokenContext";
import AuthProvider from "./contexts/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFoundPage />}>
      <Route index element={<AllPosts />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts/:id/edit" element={<PostForm isEdit={true} />} />
      <Route path="/posts/edit" element={<PostForm />} />
      <Route path="/manage-posts" element={<ManagePosts />} />
    </Route>
  )
);

const App = () => {
  return (
    <CsrfTokenProvider>
      <AuthProvider>
        <LoadingProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </LoadingProvider>
      </AuthProvider>
    </CsrfTokenProvider>
  );
};

export default App;
