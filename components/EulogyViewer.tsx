"use client";

import { Download, Eye, Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function PDFViewer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      setIsHeaderVisible(false);
    } else {
      document.body.style.overflow = "unset";
      setIsHeaderVisible(true);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isFullscreen) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        setIsHeaderVisible(true);
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, isFullscreen]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      const pdfUrl = "/MAMA_HELIDA_WERE_EULOGY.pdf";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Eulogy-Mama-Helida-Were-Oduor.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Open the PDF in a new tab after a short delay
      setTimeout(() => {
        window.open(pdfUrl, "_blank");
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setIsDownloading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-b from-blue-50 to-white ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* Fullscreen Overlay Controls - Fixed positioning */}
      {isFullscreen && (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 bg-blue-900/90 backdrop-blur-sm p-3 rounded-lg shadow-xl max-sm:fixed max-sm:bottom-4 max-sm:top-auto max-sm:right-auto max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:transform max-sm:rounded-xl max-sm:bg-blue-900/95">
          <div className="mx-auto flex justify-center">
            <div className="flex flex-col gap-3 max-sm:flex-row max-sm:gap-4">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 bg-linear-to-r from-yellow-500 to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-sm max-sm:hidden">
                      Downloading...
                    </span>
                    <span className="sm:hidden text-sm">DL...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span className="text-sm max-sm:hidden">Download</span>
                    <span className="sm:hidden text-sm">DL</span>
                  </>
                )}
              </button>
              <button
                onClick={exitFullscreen}
                className="flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 active:scale-95"
              >
                <X size={18} />
                <span className="text-sm max-sm:hidden">Exit Screen</span>
                <span className="sm:hidden text-sm">Exit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - PDF Viewer */}
      <main
        className={`${
          isFullscreen ? "h-screen pt-0" : " mx-auto px-1 bg-gray-950 h-screen"
        }`}
      >
        <div
          ref={pdfContainerRef}
          className={`bg-white rounded-xl shadow-xl overflow-hidden border w-full h-full border-gray-300 ${
            isFullscreen ? "h-full rounded-none border-0" : ""
          }`}
        >
          <div
            className={`bg-linear-to-r from-gray-50 max-sm:justify-center to-gray-100 px-6 py-4 border-b border-gray-300 flex items-center justify-between ${
              isFullscreen ? "hidden" : ""
            }`}
          >
            <div className="max-sm:hidden flex items-center gap-3">
              <span className="text-gray-700 font-extrabold font-mono">
                Eulogy
              </span>
            </div>
            <div className="sm:hidden font-mono font-black uppercase">
              Rest in Eternal Peace Shosh
            </div>
            <div className="flex items-center gap-4 max-sm:hidden">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex cursor-pointer justify-center items-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Download className="size-4" />
                <span className="max-sm:hidden">Download</span>
                <span className="sm:hidden">DL</span>
              </button>
              <button
                onClick={toggleFullscreen}
                className="flex cursor-pointer items-center gap-2 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="size-4" />
                    <span className="max-sm:hidden">Exit Fullscreen</span>
                    <span className="sm:hidden">Exit</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="size-4" />
                    <span className="max-sm:hidden">Fullscreen</span>
                    <span className="sm:hidden">Full</span>
                  </>
                )}
              </button>
            </div>
            <div className="max-sm:hidden font-extrabold font-mono">
              MAMA HELIDA WERE ODUOR
            </div>
          </div>

          {/* Mobile Download Section (Replaces PDF on mobile) */}
          {isMobile && !isFullscreen ? (
            <div className="h-full flex flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white p-2 w-full">
              <div className="w-full bg-white rounded-md shadow-2xl p-8 border border-gray-200">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <Download className="size-8 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Eulogy Download
                  </h1>
                  <p className="text-gray-600">
                    Download the eulogy for Mama Helida Were Oduor
                  </p>
                </div>

                {/* Details Card */}
                <div className="bg-gray-50 rounded-md p-5 mb-8 border border-gray-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Title:</span>
                      <span className="text-gray-800 font-semibold">
                        Eulogy
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Name:</span>
                      <span className="text-gray-800 font-semibold text-sm text-right">
                        Mama Helida Were Oduor
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Years:</span>
                      <span className="text-gray-800 font-semibold text-sm">
                        1936 - 2025
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Format:</span>
                      <span className="text-gray-800 font-semibold text-sm">
                        PDF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-3 max-sm:gap-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6  rounded-md shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="text-sm max-sm:text-xs">
                        Downloading...
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="text-sm max-sm:text-xs">
                        🕯️Download Eulogy 🕊️
                      </span>
                    </>
                  )}
                </button>

                {/* Note */}
                <p className="text-center text-gray-500 text-sm mt-6 max-sm:text-xs">
                  The PDF will automatically open after download
                </p>
              </div>
            </div>
          ) : (
            /* PDF Display Area (Desktop & Fullscreen only) */
            <div className="relative h-full max-sm:hidden">
              <iframe
                src="/MAMA_HELIDA_WERE_EULOGY.pdf"
                className="w-full h-full"
                title="Eulogy PDF Viewer"
              />
            </div>
          )}
        </div>

        {/* Floating Fullscreen Button for when header is hidden */}
        {!isFullscreen && !isHeaderVisible && (
          <button
            onClick={toggleFullscreen}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce active:scale-95"
          >
            <Maximize2 size={20} />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        )}
      </main>

      {/* Footer - Hidden in fullscreen */}
      {!isFullscreen && (
        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-300">
              In loving memory of Mama Helida Were Oduor • 1936 - 2025
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Designed by{" "}
              <a
                href="https://nestlink.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                NestLink Organization
              </a>
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
