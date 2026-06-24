"use client";

const achievements = [
  { title: "Hackathena 2026", result: "1st Place Winner" },
  { title: "Astrava 2026", result: "National Runner Up" },
  { title: "BeachHack 7", result: "2nd Place" },
  { title: "Fontober 2025", result: "Top 100 National" },
  { title: "CascadeNet", result: "Innovation Award" },
];

type Achievement = { title: string; result: string };

function AchievementLine({ achievement }: { achievement: Achievement; index: number }) {
  return (
    <div
      className="flex items-center w-full px-4 md:px-8 cursor-pointer group transition-colors duration-300 hover:bg-white/5"
      style={{ height: `${100 / achievements.length}%` }}
    >
      <div className="flex items-baseline gap-3 whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-5">
        <span
          className="font-bold text-white/60 group-hover:text-white transition-colors uppercase"
          style={{ fontSize: "clamp(2rem, 6vw, 8vw)" }}
        >
          {achievement.title}
        </span>
        <span
          className="bg-accent text-white px-3 md:px-4 py-1 md:py-2 font-bold uppercase tracking-wider flex-shrink-0"
          style={{ fontSize: "clamp(0.5rem, 1.5vw, 2rem)" }}
        >
          {achievement.result}
        </span>
      </div>
    </div>
  );
}

export const Achievements = () => {
  return (
    <section id="achievements" className="w-full bg-black border-y border-white/5" style={{ height: "100vh" }}>
      {achievements.map((achievement, idx) => (
        <AchievementLine key={idx} achievement={achievement} index={idx} />
      ))}
    </section>
  );
};
