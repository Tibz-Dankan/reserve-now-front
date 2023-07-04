import React, { Fragment } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export const MasterLayout = (props) => {
  return (
    <Fragment>
      <div className="bg flex items-start min-h-[100vh] relative">
        <Sidebar />
        <div id="header-main-footer" className="flex-1 transition-[0.35s]">
          <Header title={props.title} />
          <main className="min-h-[80vh] pt-4 flex justify-center">
            {props.children}
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
