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
              Descrição e Regras
            </span>

          </div>

          <p>
            {tournament.description ||
              "Nenhuma descrição disponível para este torneio."}
          </p>

        </div>

      </div>

    </div>
  );
}