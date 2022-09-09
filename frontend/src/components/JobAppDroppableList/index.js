import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { jobAppStatusMap } from "common/jobAppStatus";
import { styles } from "./styles";

const JobAppDroppableList = ({
  jobApps,
  rawStatusType,
  handleDeleteJobApp,
}) => {
  return (
    <Box sx={styles.mainList}>
      <Typography sx={styles.listTitle} variant="h6">
        {jobAppStatusMap[rawStatusType]}
      </Typography>
      <Droppable key={rawStatusType} droppableId={`${rawStatusType}`}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            sx={styles.useListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {jobApps.map((jobApp, index) => (
              <Draggable
                key={jobApp._id}
                draggableId={jobApp._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={styles.useItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {jobAppStatusMap[jobApp.status]}
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteJobApp(rawStatusType, index, jobApp._id);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default JobAppDroppableList;
