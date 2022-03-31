import { FC, ReactNode } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Theme,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "328px",
  },
}));

type DropDownFilterProps = {
  filterValue: string | undefined;
  handleFilterChange: (e: SelectChangeEvent<string>, child: ReactNode) => void;
};

/**
 * Filter component that allows the user to filter the forest
 * gallery by forest type.
 */
export const DropDownFilter: FC<DropDownFilterProps> = ({
  filterValue,
  handleFilterChange,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.form} variant="standard">
      <InputLabel> Filter by </InputLabel>
      <Select
        label="Filter by"
        value={filterValue}
        onChange={handleFilterChange}
      >
        <MenuItem value="" dense>
          <Typography variant="body1">None</Typography>
        </MenuItem>
        <MenuItem value="Conservation" dense>
          <Typography variant="body1">Conservation</Typography>
        </MenuItem>
        <MenuItem value="Reforestation" dense>
          <Typography variant="body1">Reforestation</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
