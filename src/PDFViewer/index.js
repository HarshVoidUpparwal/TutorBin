import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/pdfjs-express-viewer";
import "./PDFViewer.css";

function PDFViewer({ setViewerInstance }) {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer",
        initialDoc:
          "https://mediatb.blob.core.windows.net/media/632ac8cba772337803404f86/questions/1.pdf",
        licenseKey: "pOrU89d8CRDr6hfQq6es",
      },
      viewer.current
    ).then((instance) => {
      // now you can access APIs through the WebViewer instance
      const { Core } = instance;
      setViewerInstance(instance);

      instance.UI.setTheme("dark");

      // adding an event listener for when a document is loaded
      Core.documentViewer.addEventListener("documentLoaded", () => {
        console.log("document loaded");
      });

      // adding an event listener for when the page number has changed
      Core.documentViewer.addEventListener(
        "pageNumberUpdated",
        (pageNumber) => {
          console.log(`Page number is: ${pageNumber}`);
        }
      );
    });
  }, []);

  return <div className="webviewer" ref={viewer}></div>;
}

export default PDFViewer;