// src/pages/Dashboard/Tournaments/components/OverviewTab/OverviewTab.jsx

import "./OverviewTab.css";

export default function OverviewTab({
  tournament,
}) {
  return (
    <div className="overview-tab">

      <div className="overview-main">

        <div className="overview-card">

          <div className="overview-card-header">

            <span>
              Sobre o torneio
            </span>

          </div>

          <h2>
            {tournament.name}
          </h2>

          <p>
            {tournament.description ||
              "Nenhuma descrição disponível para este torneio."}
          </p>

        </div>

      </div>

    </div>
  );
}
