import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
// name, birth year, height, and date created in the format of DD/MM/YYYY HH:MM.
type TPeopleCardProps = {
  character: {
    name: string;
    birthYear: string;
    height: string;
    created: string;
  };
};

export const PeopleCard = ({
  character,
}: TPeopleCardProps): React.ReactElement => {
  const CHARACTER_DESC = [
    {
      title: "Birth Year",
      value: character.birthYear,
    },

    {
      title: "Height",
      value: character.height,
    },

    {
      title: "Created",
      value: character.created,
    },
  ];
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Name: {character.name}
        </Typography>
        {CHARACTER_DESC.map(({ title, value }) => (
          <Typography variant="subtitle1" color="text.secondary">
            {title}: {value}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
