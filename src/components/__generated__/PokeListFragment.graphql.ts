/**
 * @generated SignedSource<<47bfebf5dabd07eafbca8d96e726df6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PokeListFragment$data = ReadonlyArray<{
  readonly name: string;
  readonly pokemon_v2_pokemontypes: ReadonlyArray<{
    readonly pokemon_v2_type: {
      readonly name: string;
    } | null;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"PokecardFragment">;
  readonly " $fragmentType": "PokeListFragment";
}>;
export type PokeListFragment$key = ReadonlyArray<{
  readonly " $data"?: PokeListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PokeListFragment">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "PokeListFragment",
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PokecardFragment"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "pokemon_v2_pokemontype",
      "kind": "LinkedField",
      "name": "pokemon_v2_pokemontypes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "pokemon_v2_type",
          "kind": "LinkedField",
          "name": "pokemon_v2_type",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "pokemon_v2_pokemon",
  "abstractKey": null
};
})();

(node as any).hash = "da86cd3245d9544dfaa7cb7203a68e56";

export default node;
