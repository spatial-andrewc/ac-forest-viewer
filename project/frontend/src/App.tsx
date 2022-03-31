import React from "react";
import { Layout } from "./common/Layout";
import { Theme } from "./theme/Theme";
import { Gallery } from "./pages/forest-gallery/Gallery";
import { Routes, Route } from "react-router-dom"
import { ForestDetail } from "./pages/forest-detail/ForestDetail"

export const App = () => {
  return (
    <Theme>
      <Layout>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/:forestId" element={<ForestDetail />} />
        </Routes>
      </Layout>
    </Theme>
  );
};
