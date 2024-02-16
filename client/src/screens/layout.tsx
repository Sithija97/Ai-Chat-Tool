import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar";

type IProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: IProps) => {
  // const { user } = useAppSelector((state: RootState) => state.auth);
  const user = true;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const Layout = () => {
  // const dispatch = useAppDispatch();
  return (
    <PrivateRoute>
      <Sidebar />
      <main className="ml-16">
        <Outlet />
      </main>
    </PrivateRoute>
  );
};
