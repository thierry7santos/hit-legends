// src/pages/Dashboard/Tournaments/components/BracketTab/BracketTab.jsx

import {
  SingleEliminationBracket,
  Match,
} from "@g-loot/react-tournament-brackets";

export default function BracketTab({
  rounds,
  format,
}) {
  if (
    format === "swiss_bracket" &&
    !rounds?.length
  ) {
    return (
      <div>
        Top Cut sendo definido, aguarde o fim das rodadas Swiss.
      </div>
    );
  }

  if (!rounds?.length) {
    return <div>Bracket não disponível</div>;
  }

  return (
    <div className="bracket-view">
      <SingleEliminationBracket
        matches={rounds}
        matchComponent={Match}
      />
    </div>
  );
}