import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { ICharacter } from "../../types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DDMMYYYYHHMM } from "../../constants";

type TPeopleCardProps = {
  character: ICharacter;
};

export const PeopleCard = ({
  character,
}: TPeopleCardProps): React.ReactElement => {
  const parts = character.url.split("/");
  const id = parts[parts.length - 2];

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
      value: dayjs(character.created).format(DDMMYYYYHHMM),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Name: {character.name}
        </Typography>
        {CHARACTER_DESC.map(({ title, value }) => (
          <Typography variant="body1" color="text.secondary" key={title}>
            <Box component="span" fontWeight="fontWeightMedium">
              {title}
            </Box>
            : {value}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`people/${id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
