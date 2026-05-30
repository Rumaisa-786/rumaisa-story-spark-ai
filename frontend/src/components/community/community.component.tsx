import React from "react";

export default function CommunityCardsPreview() {
  const genres = [
    {
      title: "Fantasy Hub",
      description:
        "From dragons to ancient magic, collaborate with fantasy writers and build immersive worlds together.",
      writers: "1.2K",
      icon: "fa-solid fa-wand-sparkles",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-500/5 dark:bg-blue-500/10",
      borderLight: "border-blue-500/10 dark:border-blue-500/20",
      iconColor: "text-blue-500 dark:text-blue-400",
      category: "Popular Hub",
    },
    {
      title: "Sci‑Fi Nexus",
      description:
        "Explore futuristic civilizations, AI ethics, and space adventures with fellow sci‑fi creators.",
      writers: "980",
      icon: "fa-solid fa-rocket",
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-500/5 dark:bg-purple-500/10",
      borderLight: "border-purple-500/10 dark:border-purple-500/20",
      iconColor: "text-purple-500 dark:text-purple-400",
      category: "Trending",
    },
    {
      title: "Mystery Lounge",
      description:
        "Craft suspenseful plots, hidden clues, and thrilling investigations with mystery enthusiasts.",
      writers: "760",
      icon: "fa-solid fa-user-secret",
      color: "from-orange-500 to-yellow-500",
      bgLight: "bg-orange-500/5 dark:bg-orange-500/10",
      borderLight: "border-orange-500/10 dark:border-orange-500/20",
      iconColor: "text-orange-500 dark:text-orange-400",
      category: "New",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 px-4 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full box-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 w-full box-border">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/10 dark:border-white/10 bg-blue-500/5 text-blue-600 dark:text-blue-400 mb-4 select-none shadow-sm dark:shadow-none">
              <i className="fa-solid fa-earth-americas text-xs"></i>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Explore Communities</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Discover Your Writing Universe
            </h2>

            <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Find your niche and connect with specialists in your favorite storytelling styles.
            </p>
          </div>

          <button className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1.5 select-none uppercase tracking-wider cursor-pointer group shrink-0">
            View All Genres
            <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full box-border items-stretch">
          {genres.map((genre, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827]/40 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl w-full box-border flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              <div className="absolute -top-24 right-0 w-40 h-40 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="w-full box-border">
                <div className="flex items-center justify-between gap-4 mb-6 select-none w-full box-border">
                  <div className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${genre.bgLight} border ${genre.borderLight} ${genre.iconColor} transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                    <i className={`${genre.icon} text-base sm:text-lg`} aria-hidden="true" />
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                    {genre.category}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2.5 sm:mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-full">
                  {genre.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3 mb-8 sm:mb-10">
                  {genre.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 select-none w-full box-border">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <i className="fa-solid fa-users text-sm shrink-0" />
                  <span>{genre.writers} Writers</span>
                </div>

                <button className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 tracking-tight uppercase tracking-wider cursor-pointer">
                  Enter Hub
                  <i className="fa-solid fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}