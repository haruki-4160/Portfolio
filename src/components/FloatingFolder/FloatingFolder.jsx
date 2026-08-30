import React, { useState } from 'react';
import './FloatingFolder.css';
import { UploadCloud, CheckCircle, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FloatingFolder({ 
  label = "Attach Brief / Specs",
  onFileSelect,
  isDownload = false,
  downloadUrl,
  downloadFilename = "Haruki_Resume.pdf"
}) {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      if (onFileSelect) onFileSelect(file);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleDownload = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="folder-container">
      <div className="folder-box">
        <div className="front-side">
          <div className="tip"></div>
          <div className="cover"></div>
        </div>
        <div className="back-side cover"></div>
      </div>

      {isDownload ? (
        <a
          href={downloadUrl || "#"}
          download={downloadFilename}
          onClick={handleDownload}
          className="custom-file-upload group"
        >
          <FileText className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>{label}</span>
        </a>
      ) : (
        <label className="custom-file-upload">
          <input className="title" type="file" onChange={handleFileChange} />
          {selectedFileName ? (
            <div className="flex items-center gap-1.5 truncate">
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="truncate max-w-[140px] text-xs">{selectedFileName}</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-4 h-4 text-white/90" />
              <span>{label}</span>
            </>
          )}
        </label>
      )}
    </div>
  );
}
