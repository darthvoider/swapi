import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { TCharacter } from "../../types";
import dayjs from "dayjs";

type TPeopleCardProps = {
  character: TCharacter;
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
      value: dayjs(character.created).format("DD/MM/YYYY HH:MM"),
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
