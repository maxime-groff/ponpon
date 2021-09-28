import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="background">
          <div className="app bg-white text-black dark:bg-primary dark:text-white mx-2 my-2 lg:mx-32 lg:my-16 p-8 md:p-16">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
