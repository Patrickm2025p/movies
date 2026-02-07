import React, { useState } from "react";
import ActorsHero from "../composants/ActorsHero/ActorsHero";
import ActorRow from "../composants/ActorRow/ActorRow";
import ActorModal from "../composants/ActorModal/ActorModal";
import Footer from "../composants/footer/footer";

function People() {
  const [selectedActor, setSelectedActor] = useState(null);

  return (
    <>
      <ActorsHero />
      <ActorRow
        title="Popular Stars"
        fetchUrl="popularPeople"
        onSelectActor={setSelectedActor}
      />
      
      {selectedActor && (
        <ActorModal
          actor={selectedActor}
          onClose={() => setSelectedActor(null)}
        />
      )}
      <Footer />
    </>
  );
}

export default People;