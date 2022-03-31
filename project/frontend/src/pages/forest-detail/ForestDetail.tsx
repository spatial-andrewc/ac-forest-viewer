import { FC, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getForest } from "../../api/queries";
import { Box, Button, Divider } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { ForestMap } from "./ForestMap";
import { ForestDetailResponseObject } from "../../api/types";
import { DetailSheet } from "./DetailSheet";
import { StatsSheet } from "./StatsSheet";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "66px",
  },
  mapContainer: {
    width: "100%",
    height: "483px",
  },
  contentContainer: {
    display: "flex",
  },
  detailContainer: {
    marginTop: "16px",
    maxWidth: "50%",
    paddingRight: "50px",
  },
  statsContainer: {
    width: "100%",
    padding: "50px",
  },
  divider: {
    "& .MuiDivier-vertical": {
      marginTop: "50px"
    }
  }
}));

/**
 * Page rendered on the 'forest detail' view.
 */
export const ForestDetail: FC = () => {
  
  const { forestId } = useParams();

  // query the api for the forest once the forestId has been resolved from the route
  const { data, isLoading } = useQuery<ForestDetailResponseObject>(
    ["forest", forestId],
    () => getForest({ forestId }),
    { enabled: !!forestId }
  );

  const classes = useStyles();

  // create a new object that stores the information for the forest detail component
  const detailData = useMemo(
    () => ({
      title: data?.properties.name,
      forestType: data?.properties.type,
      country: data?.properties.country,
      description: data?.properties.description,
    }),
    [data]
  );

  // create a new object that stores the information for the forest stats component
  const statsData = useMemo(
    () => ({
      areaSqm: data?.properties.area_sqm,
      carbonStored: data?.properties.carbon_stored,
      carbonStored30Days: data?.properties.carbon_stored_30_days,
      bearMortality: data?.properties.bear_mortality,
      criticalFireRisk: data?.properties.critical_fire_risk,
      streamFlow: data?.properties.stream_flow,
    }),
    [data]
  );

  return (
    <>
      <Button
        size="small"
        startIcon={<ChevronLeftIcon />}
        style={{ textTransform: "none" }}
        component={Link}
        to="/"
      >
        Back
      </Button>
      <Box className={classes.root}>
        <Box className={classes.mapContainer}>
          <ForestMap feature={data} isLoading={isLoading} />
        </Box>
        <Box className={classes.contentContainer}>
          <Box className={classes.detailContainer}>
            <DetailSheet isLoading={isLoading} {...detailData} />
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            style={{marginTop: "30px"}}
          />
          <Box className={classes.statsContainer}>
            <StatsSheet isLoading={isLoading} {...statsData} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
