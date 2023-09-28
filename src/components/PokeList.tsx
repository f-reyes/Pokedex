import { PokeCardClickHandler } from "./typings";
import Pokecard from "./Pokecard";
import { useRef, useState } from "react";
import Searchbar from "./Searchbar";
import { graphql, useFragment } from "react-relay";
import type { PokeListFragment$key } from "./__generated__/PokeListFragment.graphql";
import TypeFilterInput from "./TypeFilterInput";
import GenFilterInput from "./GenFilterInput";
import LoadMorePokemonsButton from "./LoadMorePokemonsButton";

const PokeListFragment = graphql`
  fragment PokeListFragment on pokemon_v2_pokemon @relay(plural: true) {
    name
    ...PokecardFragment
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonspecy {
      pokemon_v2_generation {
        name
      }
    }
  }
`;

export default function Pokelist({
  handlePokecardClick,
  pokeList,
}: {
  handlePokecardClick: PokeCardClickHandler;
  pokeList: PokeListFragment$key;
}) {
  const data = useFragment(PokeListFragment, pokeList);
  const [searchState, setSearchState] = useState("");
  const [typeFilter, setTypeFilter] = useState("default");
  const [genFilter, setGenFilter] = useState("default");
  const regSearch = new RegExp(`${searchState}`);
  const [pokemonsLoadedCount, setpokemonsLoadedCount] = useState(20);

  function loadMorePokemons() {
    setpokemonsLoadedCount((prevCount) => prevCount + 20);
  }

  function hasNextPage() {
    if (pokemonsLoadedCount >= pokemonCount) {
      return false;
    } else {
      return true;
    }
  }

  const visiblePokemon = data.filter((pokemon) => {
    const gen = pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_generation?.name;
    const typeOne = pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;
    let typeTwo: string | undefined;

    if (pokemon.pokemon_v2_pokemontypes[1]) {
      typeTwo = pokemon.pokemon_v2_pokemontypes[1].pokemon_v2_type?.name;
    }
    if (regSearch.test(pokemon.name)) {
      if (gen === genFilter || genFilter === "default") {
        if (typeFilter === "default") {
          return true;
        } else if (typeOne === typeFilter || typeTwo === typeFilter) {
          return true;
        }
      }
    }
    return false;
  });

  const pokemonCount = visiblePokemon.length;

  const visiblePokeCards = visiblePokemon.map((v, i) => {
    if (i > pokemonsLoadedCount) {
      return;
    }
    return (
      <Pokecard
        pokemon={v}
        key={v.name}
        handlePokecardClick={handlePokecardClick}
      />
    );
  });

  return (
    <div className="flex flex-col flex-wrap justify-center ">
      <div>
        <Searchbar searchState={searchState} setSearchState={setSearchState} />
        <TypeFilterInput
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        <GenFilterInput genFilter={genFilter} setGenFilter={setGenFilter} />
      </div>
      <ul>{visiblePokeCards}</ul>
      <LoadMorePokemonsButton
        hasNextPage={hasNextPage}
        loadMorePokemons={loadMorePokemons}
      />
    </div>
  );
}
