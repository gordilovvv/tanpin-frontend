import { PageLayout } from "@/components/Layout";
import { useUserStore } from "@/states/user/store";
import { ErrorView, Main } from "@/views";
import { createBrowserRouter, redirect } from "react-router-dom";

const isAuthenticatedLoader = () => {
    const { isLoggedIn } = useUserStore.getState();
    if (!isLoggedIn()) {
        return redirect('/login');
    }
    return null;
};

export const router = createBrowserRouter([
    {
        element: <PageLayout />,
        errorElement: <ErrorView />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: 'protected',
                element: <div>Protected Route</div>,
                loader: isAuthenticatedLoader
            },
            {
                path: 'login',
                element: <div>Login Page</div>
            }
        ]
    },]);
