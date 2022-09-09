import React from "react";
import Box from "@mui/material/Box";

import { DragDropContext } from "react-beautiful-dnd";

import useDnd from "hooks/useDnd";
import useJobApps from "hooks/useJobApps";
import JobAppDroppableList from "components/JobAppDroppableList";

import { styles } from "./styles";

const JobAppContent = () => {
  const { jobApps, setJobApps, updateStatus, handleDeleteJobApp } =
    useJobApps();
  const { onDragEnd } = useDnd(jobApps, setJobApps, updateStatus);
  return (
    <Box sx={styles.contentContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        {jobApps.map((jobAppsSameStatus, ind) => (
          <JobAppDroppableList
            key={ind}
            jobApps={jobAppsSameStatus}
            rawStatusType={ind}
            handleDeleteJobApp={handleDeleteJobApp}
          />
        ))}
      </DragDropContext>
    </Box>
  );
};

export default JobAppContent;
