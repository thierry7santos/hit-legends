// src/pages/Dashboard/Tournaments/components/TournamentTabs/TournamentTabs.jsx

import "./TournamentTabs.css";

export default function TournamentTabs({
  tab,
  setTab,
  tournament,
}) {
  const tabs = [
    {
      key: "overview",
      label: "Visão Geral",
    },
    {
      key: "players",
      label: "Jogadores",
    },
    {
      key: "standings",
      label: "Classificação",
    },
    {
      key: "rounds",
      label: "Rodadas",
    },
  ];

  if (
    tournament?.format !== "round_robin"
  ) {
    tabs.push({
      key: "bracket",
      label: "Mata-Mata",
    });
  }

  return (
    <div className="tournament-tabs">

      {tabs.map((item) => (
        <button
          key={item.key}
          className={`tournament-tab ${
            tab === item.key
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTab(item.key)
          }
        >
          <span>
            {item.label}
          </span>

        </button>
      ))}

    </div>
  );
}