import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import OneCard from "./OneCard";

const Cards = ({ data: { confirmed, deaths, recovered, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading ...";
  }
  const cardData = [
    {
      title: "Infected",
      body: "Number of active cases of COVID-19",
      numberValue: confirmed.value,
      date: lastUpdate,
      style: "infected",
    },
    {
      title: "Recovered",
      body: "Number of recovries cases of COVID-19",
      numberValue: recovered.value,
      date: lastUpdate,
      style: "recovered",
    },
    {
      title: "Deaths",
      body: "Number of deaths caused by COVID-19",
      numberValue: deaths.value,
      date: lastUpdate,
      style: "deaths",
    },
  ];
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((c, i) => {
          return <OneCard key={i} {...c} />;
        })}
      </Grid>
    </div>
  );
};

export default Cards;
