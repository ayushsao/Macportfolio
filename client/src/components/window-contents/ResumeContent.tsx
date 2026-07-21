import React from 'react';

const ResumeContent: React.FC = () => {
    // Resume PDF link (points to public/resume.pdf)
    const resumeUrl = '/resume.pdf';

    const handleDownload = () => {
        // Dynamically download the public file
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Ayush_Kumar_Sao_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="h-full flex flex-col bg-gray-100 select-none">
            {/* Top Document Bar */}
            <div className="h-11 bg-white border-b border-gray-200 px-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">Ayush_Kumar_Sao_Resume.pdf</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDownload}
                        className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold rounded-lg shadow-sm transition active:scale-95 cursor-pointer"
                    >
                        📥 Download
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition active:scale-95 cursor-pointer hidden sm:inline-block"
                    >
                        🖨️ Print
                    </button>
                </div>
            </div>

            {/* PDF Viewport */}
            <div className="flex-1 p-4 overflow-auto flex justify-center bg-gray-500/10">
                <div className="w-full max-w-4xl h-full min-h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative">
                    <iframe
                        src={`${resumeUrl}#view=FitH`}
                        title="Ayush Kumar Sao Resume"
                        className="w-full h-full border-none"
                        onError={(e) => console.log('Iframe failed to load PDF', e)}
                    />

                    {/* Informative fallback overlay shown behind the iframe */}
                    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center bg-white pointer-events-none">
                        <span className="text-4xl mb-3">📄</span>
                        <h3 className="text-sm font-bold text-gray-800">Resume PDF Document</h3>
                        <p className="text-xs text-gray-500 max-w-sm mt-1 leading-relaxed">
                            Place your real <code className="bg-gray-150 px-1 rounded text-red-500">resume.pdf</code> document inside the client's <code className="bg-gray-150 px-1 rounded text-red-500">public/</code> directory to view it live here!
                        </p>
                        <button
                            onClick={handleDownload}
                            className="mt-4 px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-lg pointer-events-auto cursor-pointer"
                        >
                            Simulate Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeContent;
