import React, { useState } from 'react';
import Dropzone from './components/Dropzone.tsx';       
import ControlPanel from './components/ControlPanel.tsx'; 
import Processor from './components/Processor.tsx';       
import { ProcessingOptions, ProcessingStatus } from './types.ts'; 

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [options, setOptions] = useState<ProcessingOptions>({
    fps: 60,
    blurStrength: 50
  });

  const handleStart = () => {
    if (!file) return;
    setStatus(ProcessingStatus.PROCESSING);
    // The Processor component will react to this state change
  };

  const handleReset = () => {
    setStatus(ProcessingStatus.IDLE);
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Motion Blur Generator
            </h1>
          </div>
          <div className="text-sm text-slate-400 hidden sm:block">
             High FPS Video Processor
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Input & Controls */}
          <div className="w-full lg:w-1/3 space-y-6">
            {!file ? (
              <div className="animate-fade-in-up">
                <h2 className="text-lg font-semibold mb-4 text-slate-300">動画をアップロード</h2>
                <Dropzone onFileSelect={(f) => {
                  setFile(f);
                  setStatus(ProcessingStatus.IDLE);
                }} />
              </div>
            ) : (
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="truncate flex-1 mr-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">選択中のファイル</p>
                  <p className="font-medium text-blue-300 truncate">{file.name}</p>
                </div>
                {status !== ProcessingStatus.PROCESSING && (
                    <button 
                        onClick={() => setFile(null)}
                        className="text-slate-400 hover:text-red-400 transition-colors p-2"
                        title="ファイルを削除"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
              </div>
            )}

            <ControlPanel 
              fps={options.fps}
              setFps={(fps) => setOptions(prev => ({...prev, fps}))}
              blurStrength={options.blurStrength}
              setBlurStrength={(bs) => setOptions(prev => ({...prev, blurStrength: bs}))}
              status={status}
              onStart={handleStart}
              onReset={handleReset}
              hasFile={!!file}
            />
            
            <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
              <h4 className="text-sm font-bold text-blue-400 mb-2">ヒント</h4>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                <li>FPSを高くするとファイルサイズが大きくなります。</li>
                <li>ブラー強度が強いほど、前のフレームが長く残ります。</li>
                <li>960FPS等は非常に負荷が高く、正確な出力には高性能なPCが必要です。</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Processing Area */}
          <div className="w-full lg:w-2/3">
             {file ? (
               <Processor 
                  file={file}
                  options={options}
                  status={status}
                  setStatus={setStatus}
               />
             ) : (
               <div className="h-full min-h-[400px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>左側のパネルから動画を追加して設定を行ってください</p>
               </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
