import React, { useState, useRef, useEffect } from "react";

const ProfileCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Simulate loading when opening
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
        setIsLoading(false);
    }
  }, [isOpen]);

  return (
    <div
      ref={cardRef}
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4"
    >
      {isOpen && (
        <div className="w-80 bg-surface rounded-2xl shadow-2xl border border-white/20 ring-1 ring-black/5 overflow-hidden animate-slideUp origin-bottom-right mb-2 transition-all">
          {isLoading ? (
            // Skeleton Loader
            <div className="animate-pulse w-full">
              {/* Banner Skeleton */}
              <div className="h-32 bg-gray-200 w-full"></div>
              
              <div className="px-6 pb-6 relative bg-surface">
                {/* Avatar & Button Skeleton */}
                <div className="flex justify-between items-end -mt-12 mb-3">
                  <div className="w-24 h-24 rounded-full border-[4px] border-surface bg-gray-200"></div>
                  <div className="mb-1 h-7 w-20 bg-gray-200 rounded-full"></div>
                </div>

                {/* Info Skeleton */}
                <div>
                  <div className="h-7 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                  <div className="flex items-center gap-1">
                     <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                     <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Bio Skeleton */}
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
                </div>

                {/* Tags Skeleton */}
                <div className="flex gap-2 mt-5">
                  <div className="h-6 w-16 bg-gray-200 rounded-md"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                  <div className="h-6 w-14 bg-gray-200 rounded-md"></div>
                </div>

                {/* Footer Skeleton */}
                <div className="mt-6 pt-5 border-t border-outline/50 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            // Actual Content
            <div className="animate-fadeIn w-full">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-br from-primary via-blue-500 to-indigo-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_50%)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="px-6 pb-6 relative bg-surface">
                {/* Profile Header */}
                <div className="flex justify-between items-end -mt-12 mb-3">
                  <div className="w-24 h-24 rounded-full border-[4px] border-surface overflow-hidden shadow-md bg-white group">
                    <img
                        src="https://github.com/pourushsiddharth/portfolio/blob/main/voter%20id%20(1).jpg?raw=true"
                        alt="Profile"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/pourushsiddharth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-1 px-4 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-primary-hover shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:scale-95 no-underline block"
                  >
                        Connect
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-on-surface flex items-center gap-1.5">
                    Pourush Siddharth
                    <span className="material-symbols-outlined text-primary text-[18px]" title="Verified Creator">verified</span>
                  </h3>
                  <p className="text-sm text-on-surface-variant font-medium">
                    Web Developer
                  </p>
                  
                  <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>Delhi, India</span>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">
                  Crafting interfaces that bridge AI and human emotion. Passionate about data visualization and user experience.
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {['React', 'Gemini AI', 'Tailwind', 'UX Design'].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-200 hover:bg-gray-200 transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Footer / Socials */}
                <div className="mt-6 pt-5 border-t border-outline/50 flex items-center justify-between">
                  <div className="flex gap-4">
                    <a
                        href="https://github.com/pourushsiddharth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-surface-variant hover:text-[#333] transition-colors transition-transform hover:-translate-y-0.5"
                    >
                        <span className="sr-only">GitHub</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a
                        href="https://x.com/PourushSidd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-surface-variant hover:text-[#1DA1F2] transition-colors transition-transform hover:-translate-y-0.5"
                    >
                        <span className="sr-only">Twitter</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/pourushsiddharth/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-on-surface-variant hover:text-[#0A66C2] transition-colors transition-transform hover:-translate-y-0.5"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                    </a>
                  </div>
                  <a 
                    href="https://pourushsiddharth.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary hover:text-primary-hover uppercase tracking-wide flex items-center gap-1 group no-underline"
                  >
                      My Portfolio
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-[70] ${
          isOpen
            ? "bg-on-surface text-surface rotate-90 scale-90"
            : "bg-primary text-white hover:bg-primary-hover hover:scale-110 hover:shadow-primary/40"
        }`}
        aria-label="Toggle Profile Card"
      >
        <span className="material-symbols-outlined text-[28px]">
          {isOpen ? "close" : "person"}
        </span>
      </button>
    </div>
  );
};

export default ProfileCard;
