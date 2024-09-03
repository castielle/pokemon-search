import { createApolloClient } from "../apollo-client";
import { gql } from "@apollo/client";
import React from "react";
import Image from 'next/image';

async function getPokemon(name: string) {
    const GET_POKEMON = gql`
        query pokemon($id: String, $name: String ) {
            pokemon(id: $id, name: $name) {
                id
                number
                name
                weight{
                    minimum
                    maximum
                }
                height{
                    minimum
                    maximum
                }
                classification
                types
                resistant
                weaknesses
                fleeRate
                maxCP
                maxHP
                image
                attacks{
                    fast{
                        name
                        type
                        damage
                    }
                    special{
                        name
                        type
                        damage
                    }
                }
                evolutions {
                    id
                    number
                    name
                }
            }
        }
    `;

  const apolloClient = createApolloClient();

  const {data} = await apolloClient.query({
    query: GET_POKEMON,
    variables: {name: name},
    context: {}
  });

  return data;
}

export default async function Result({searchParams}) {

  const {name} = searchParams;
  console.log(name);
  const data = await getPokemon(name);
  console.log(data);
  if (!data.pokemon) {

    return (<h1>Not Found</h1>);
  }
  const fastAttacks = data.pokemon.attacks.fast.map(({name, type, damage}) => <li
    key={name}>{name} - {type} - {damage}</li>);
  const specialAttacks = data.pokemon.attacks.special.map(({name, type, damage}) =>
    <li key={name}>{name} - {type} - {damage}</li>);
  const evolutions = data.pokemon.evolutions.map(({id, number, name}) => <li key={name}>{id} - {number} - {name}</li>);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        <h3>{data.pokemon.name}</h3>
        <li>{data.pokemon.id}</li>

        <li>{data.pokemon.number}</li>
        <li>{data.pokemon.weight.minimum}</li>
        <li>{data.pokemon.weight.maximum}</li>
        <li>{data.pokemon.height.maximum}</li>
        <li>{data.pokemon.height.maximum}</li>
        <li>{data.pokemon.classification}</li>
        <li>{data.pokemon.types}</li>
        <li>{data.pokemon.resistant}</li>
        <li>{data.pokemon.weaknesses}</li>
        <li>{data.pokemon.fleeRate}</li>
        <li>{data.pokemon.maxCP}</li>
        <li>{data.pokemon.maxHP}</li>
        <br/>
        <h6>Fast Attacks</h6>
        <li>{fastAttacks}</li>
        <h6>Special Attacks</h6>
        <li>{specialAttacks}</li>
        <h6>Evolutions</h6>
        <li>{evolutions}</li>
      </ul>
      <Image src={data.pokemon.image} width={100} height={100} alt="Picture of Pokemon"/>
    </main>
  );
}
