import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home";
import FAQ from "@/pages/FAQ";
import Glossary from "@/pages/Glossary";
import Resources from "@/pages/Resources";
import BoostTimer from "@/pages/BoostTimer";
import ProgressVault from "@/pages/ProgressVault";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";

const theme = createTheme();

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js").catch(() => {
//       // SW registration is best-effort; timer still works without it
//     });
//   });
// }

export interface RouteHandle {
    pageName: string;
}

const router = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children: [{
        index: true,
        element: <Home/>,
        handle: {pageName: 'Home'} satisfies RouteHandle,
    }, {
        path: '/faq',
        element: <FAQ/>,
        handle: {pageName: 'FAQ'} satisfies RouteHandle
    }, {
        path: '/glossary',
        element: <Glossary/>,
        handle: {pageName: 'Glossary'} satisfies RouteHandle,
    }, {
        path: '/resources',
        element: <Resources/>,
        handle: {pageName: 'Resources'} satisfies RouteHandle
    },
    {
        path: '/boosttimer',
        element: <BoostTimer/>,
        handle: {pageName: 'Boost Timer'} satisfies RouteHandle,
    },
    {
        path: '/progressvault',
        element: <ProgressVault/>,
        handle: {pageName: 'Progress Vault'} satisfies RouteHandle
    },
    {
        path: '/about',
        element: <About/>,
        handle: {pageName: 'About'} satisfies RouteHandle,
    },
    {
        path: '/contact',
        element: <Contact/>,
        handle: {pageName: 'Contact'} satisfies RouteHandle
    },
    {
        path: '/privacypolicy',
        element: <PrivacyPolicy/>,
        handle: {pageName: 'Privacy Policy'} satisfies RouteHandle
    },
    {
        path: '*',
        element: <NotFound/>,
        handle: {pageName: '404 Not Found'} satisfies RouteHandle
    }]
}]);

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}/>
    </ThemeProvider>
);
