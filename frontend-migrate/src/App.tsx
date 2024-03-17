import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { Paths } from "./utils/paths"
import { AuthProvider } from "./contexts/AuthContext";
import { BlogProvider } from "./contexts/BlogContext";

import '@fontsource/inter';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { DrawerProvider } from "./contexts/DrawerContext";

const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const PostsList = lazy(() => import("./pages/PostsList"));
const ShowPost = lazy(() => import("./pages/ShowPost"));
const HomePage = lazy(() => import("./pages/HomePage"));

const Loading = () => <div>Loading...</div>

export default function App() {
  return (
    <CssVarsProvider>
      <Router>
        <AuthProvider>
          <DrawerProvider>
            <BlogProvider>
              <Sheet sx={{
                // mx: 'auto', // margin left & right
                // my: 4, // margin top & bottom
                // py: 3, // padding top & bottom
                // px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                // gap: 2,
                // borderRadius: 'sm',
                // boxShadow: 'md',
              }}>
                <Header />
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route path={Paths.PostsList} component={PostsList} />
                    <Route path={Paths.CreatePost} component={CreatePost} />
                    <Route path={`${Paths.EditPost}/:id`} component={EditPost} />
                    <Route path={`${Paths.Post}/:id`} component={ShowPost} />
                    <Route path={Paths.Default} component={HomePage} />
                  </Switch>
                </Suspense>
              </Sheet>
            </BlogProvider>
          </DrawerProvider>
        </AuthProvider>
      </Router>
    </CssVarsProvider >
  );
};
