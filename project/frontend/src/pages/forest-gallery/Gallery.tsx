import {
  FC,
  useState,
  ReactNode,
  useEffect,
  ChangeEvent,
  useMemo,
} from "react";
import { DropDownFilter } from "./DropDownFilter";
import {
  SelectChangeEvent,
  Box,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "react-query";
import { getForestOverviews } from "../../api/queries";
import { ForestOverviewResponseObject } from "../../api/types";
import { ForestTile } from "./ForestTile";
import { SearchBar } from "./SearchBar";
import { useDebounce } from "use-debounce";

const useStyles = makeStyles(() => ({
  tileGallery: {
    padding: "66px",
  },
  paginationContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  actionsContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  noItemsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

const MAX_TILES_PER_PAGE = 6;

/**
 * Component that controls the application's state shared across
 * the forest gallery as well as render the filter controls, gallery tile components and pagination.
 */
export const Gallery: FC = () => {
  // handle search state and store it in a debounced value to not overwork the API
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const handleSetSearchQuery = (text: string) => {
    setSearchQuery(text);
  };

  const [filter, setFilter] = useState("");

  const [page, setPage] = useState(1);

  const handleFilterChange = (
    e: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    setFilter(e.target.value);
  };

  const handleSetPage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const classes = useStyles();

  // call the API and make sure to include the relevant filter, page and search query to the dependencies so our data is live.
  const { data, isLoading } = useQuery<ForestOverviewResponseObject>(
    ["forests", page, filter, debouncedSearchQuery],
    () =>
      getForestOverviews({
        page,
        forestType: filter,
        searchQuery: debouncedSearchQuery,
      })
  );

  /**
   * always return to the first page of the gallery when the
   * filter is set or a search query starts.
   */
  useEffect(() => {
    setPage(1);
  }, [filter, searchQuery, setPage]);

  // update page count for paginator to ensure you can't go to a page without data
  const pageCount = useMemo(
    () => data && Math.ceil(data.total / MAX_TILES_PER_PAGE),
    [data]
  );

  /** Check whether we should display a message signalling that there are no items returned from search.
   * This can happen if someone writes a text search to filter and then changes the filter type.
   */
  const noItemsToShow = useMemo(
    () =>
      debouncedSearchQuery && filter && !data?.items?.length ? true : false,
    [debouncedSearchQuery, filter, data]
  );

  return (
    <>
      <Box className={classes.actionsContainer}>
        <DropDownFilter
          filterValue={filter}
          handleFilterChange={handleFilterChange}
        />
        <Box marginLeft="auto">
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSetSearchQuery}
          />
        </Box>
      </Box>
      <Box className={classes.tileGallery}>
        {noItemsToShow ? (
          <Box className={classes.noItemsContainer}>
            <Typography variant="h4">
              {" "}
              There are no forests that match your search criteria...
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            direction="row"
            spacing={5}
            justifyContent="space-around"
          >
            {data?.items?.map((item, idx) => (
              <ForestTile key={idx} isLoading={isLoading} {...item} />
            ))}
          </Grid>
        )}
      </Box>
      {Boolean(data?.items?.length) && (
        <Box className={classes.paginationContainer}>
          <Pagination
            size="small"
            color="primary"
            count={pageCount}
            page={page}
            onChange={handleSetPage}
          />
        </Box>
      )}
    </>
  );
};
