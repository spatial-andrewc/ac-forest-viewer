import { FC, ChangeEvent } from "react";
import { Theme, Box, InputBase, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "5px",
    width: "298px",
    paddingLeft: "10px",
  },
  input: {
    paddingTop: "2px",
    paddingBottom: "2px",
    marginLeft: "10px",
    "& .MuiInputBase-inputTypeSearch::-webkit-search-cancel-button": {
      WebkitAppearance: "none",
    },
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main,
    },
  },
}));

type SearchBarProps = {
  searchQuery: string;
  handleSearchChange: (text: string) => void;
};

export const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  handleSearchChange,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleSearchChange(e.target.value);
  };

  const handleClose = () => {
    handleSearchChange("");
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SearchIcon color="primary" />
      <InputBase
        type="search"
        className={classes.input}
        fullWidth
        value={searchQuery}
        onChange={handleChange}
      />
      {searchQuery && (
        <IconButton disableRipple onClick={handleClose}>
          <CloseIcon color="primary" style={{fontSize: "14px"}} />
        </IconButton>
      )}
    </Box>
  );
};
