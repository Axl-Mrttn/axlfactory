import { useState } from "react";
import waveDesktop from "@/assets/onda-desktop.png";
import waveMobile from "@/assets/onda-mobile.png";

const Index = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-retro-orange flex items-center justify-center relative overflow-hidden">
      {/* Desktop version */}
      <div className="hidden md:block relative w-[1280px] h-[1080px]">
        <img
          src={waveDesktop}
          alt="AXL Factory"
          className="absolute w-[924px] h-[520px]"
          style={{ right: '158px', top: '120px' }}
        />
        
        {/* Desktop links */}
        <a
          href="https://bisque.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline"
          style={{ left: '196px', top: '438px', width: '63px', height: '20px' }}
        >
          bisque
        </a>
        <a
          href="https://skyer.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '181px', top: '485px', width: '63px', height: '20px' }}
        >
          skyer
        </a>
        <a
          href="https://kadenza.app"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '196px', top: '532px', width: '63px', height: '20px' }}
        >
          kadenza
        </a>
        <a
          href="mailto:contact@axlfactory.com"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '1042px', top: '578px', width: '63px', height: '20px' }}
        >
          contact
        </a>
        <button
          onClick={() => setShowInfo(true)}
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity text-right"
          style={{ left: '1017px', top: '630px', width: '63px', height: '20px' }}
        >
          info
        </button>
      </div>

      {/* Mobile version */}
      <div className="md:hidden relative w-[375px] h-[1080px]">
        <img
          src={waveMobile}
          alt="AXL Factory"
          className="absolute w-[483px] h-[781px]"
          style={{ right: '-229px', top: '-60px' }}
        />
        
        {/* Mobile links */}
        <a
          href="https://bisque.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '117px', top: '321px', width: '63px', height: '20px' }}
        >
          bisque
        </a>
        <a
          href="https://skyer.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '117px', top: '405px', width: '63px', height: '20px' }}
        >
          skyer
        </a>
        <a
          href="https://kadenza.app"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '117px', top: '464px', width: '63px', height: '20px' }}
        >
          kadenza
        </a>
        <a
          href="mailto:contact@axlfactory.com"
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity underline text-right"
          style={{ left: '117px', top: '549px', width: '63px', height: '20px' }}
        >
          contact
        </a>
        <button
          onClick={() => setShowInfo(true)}
          className="absolute font-courier text-[13px] text-foreground hover:opacity-70 transition-opacity text-right"
          style={{ left: '117px', top: '609px', width: '63px', height: '20px' }}
        >
          info
        </button>
      </div>

      {/* Info modal */}
      {showInfo && (
        <div
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowInfo(false)}
        >
          <div className="max-w-2xl w-full">
            <p className="font-courier text-base md:text-xl leading-relaxed text-foreground">
              AXL Factory is a space for developing ideas. Small, specific things. 
              Projects that don't need to reach the masses, they just need to exist.
            </p>
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="fixed bottom-4 left-0 right-0 text-center">
        <p className="font-courier text-[11px] text-foreground/60">
          © 2026 AXL Factory. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
