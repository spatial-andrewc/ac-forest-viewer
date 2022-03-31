import { FC } from "react";
import ForestIcon from "@mui/icons-material/Forest";
import LandscapeIcon from "@mui/icons-material/Landscape";
import PetsIcon from "@mui/icons-material/Pets";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WaterIcon from "@mui/icons-material/Water";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Skeleton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  statContainer: {
    display: "flex",
    alignItems: "center",
  },
  statsRow: {
    display: "flex",
    margin: "auto",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "",
    marginBottom: "40px",
  },
}));

type StatsSheetProps = {
  areaSqm: number | undefined;
  carbonStored: number | undefined;
  carbonStored30Days: number | undefined;
  bearMortality: string | undefined;
  criticalFireRisk: string | undefined;
  streamFlow: string | undefined;
  isLoading: boolean;
};

type StatsItemValue = {
  title: string;
  icon: any;
  value: string | number | undefined;
  isLoading: boolean;
};

const StatsItem: FC<StatsItemValue> = ({
  title,
  icon: Icon,
  value,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton variant="rectangular" width="60px" height="60px" />;
  }
  return (
    <Box>
      <Typography variant="h4" color="primary" style={{ maxWidth: "120px" }}>
        {title}
      </Typography>
      <Box mt="10px" display="flex" alignItems="flex-end" justifyContent="flex-start">
        <Typography variant="h2" style={{color: "#333"}}> {value} </Typography>
        <Box ml="10px">{Icon}</Box>
      </Box>
    </Box>
  );
};

const iconProps = { fontSize: "small", style: {color: "#333"}}

/**
 * Component that displays the statistical information in
 * the forest detail view.
 */
export const StatsSheet: FC<StatsSheetProps> = ({
  areaSqm,
  carbonStored,
  carbonStored30Days,
  bearMortality,
  criticalFireRisk,
  streamFlow,
  isLoading,
}) => {
  const classes = useStyles();

  return (
    <Box width="100%">
      <Box className={classes.statsRow}>
        <StatsItem
          title="Area (Ha)"
          // @ts-ignore
          icon={<LandscapeIcon {...iconProps} />}
          value={areaSqm && Math.round((areaSqm * 0.0001) * 100) / 100}
          isLoading={isLoading}
        />
        <StatsItem
          title="Carbon stored (t)"
          // @ts-ignore
          icon={<ForestIcon {...iconProps} />}
          value={carbonStored}
          isLoading={isLoading}
        />
      </Box>
      <Box className={classes.statsRow}>
        <StatsItem
          title="Carbon stored (t) (prev 30 days)"
          // @ts-ignore
          icon={<ForestIcon {...iconProps} />}
          value={carbonStored30Days}
          isLoading={isLoading}
        />
        <StatsItem
          title="Bear mortality"
          // @ts-ignore
          icon={<PetsIcon {...iconProps} />}
          value={bearMortality}
          isLoading={isLoading}
        />
      </Box>
      <Box className={classes.statsRow}>
        <StatsItem
          title="Critical fire risk"
          // @ts-ignore
          icon={<LocalFireDepartmentIcon {...iconProps} />}
          value={criticalFireRisk}
          isLoading={isLoading}
        />
        <StatsItem
          title="Stream flow"
          // @ts-ignore
          icon={<WaterIcon {...iconProps} />}
          value={streamFlow}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};
