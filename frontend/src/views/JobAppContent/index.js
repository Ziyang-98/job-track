import React from "react";
import Box from "@mui/material/Box";

import { DragDropContext } from "react-beautiful-dnd";

import useDnd from "hooks/useDnd";
import JobAppDroppableList from "components/JobAppDroppableList";

import { styles } from "./styles";

const JobAppContent = ({
  jobApps,
  filteredJobApps,
  setJobApps,
  updateStatus,
  refreshJobApps,
}) => {
  const { onDragEnd } = useDnd(jobApps, setJobApps, updateStatus);
  return (
    <Box sx={styles.contentContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        {filteredJobApps.map((jobAppsSameStatus, ind) => (
          <JobAppDroppableList
            key={ind}
            jobApps={jobAppsSameStatus}
            rawStatusType={ind}
            refreshJobApps={refreshJobApps}
          />
        ))}
      </DragDropContext>
    </Box>
  );
};

export default JobAppContent;
