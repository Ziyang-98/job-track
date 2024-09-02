import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { jobAppStatusMap } from "common/jobAppStatus";
import useEditDialog from "hooks/useEditDialog";
import EditDialog from "components/CreateOrEditDialog";
import useNotification from "hooks/useNotification";
import Notification from "components/Notification";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useStyles } from "./styles";

const JobAppDroppableList = ({ jobApps, rawStatusType, refreshJobApps }) => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const {
    editDialogProps,
    handleClose,
    handleOpenEditDialog,
    handleUpdate,
    loadingUpdate,
    handleDelete,
    loadingDelete,
    jobApp,
    formContactSuite,
  } = useEditDialog(refreshJobApps, handleOpenNotification);

  const isSmall = useMediaQuery("(max-width:600px)");

  const isMedium = useMediaQuery("(max-width:1070px)");

  const styles = useStyles(rawStatusType, isSmall, isMedium);

  return (
    <Box sx={styles.mainList}>
      <Typography sx={styles.listTitle} variant="h6">
        {jobAppStatusMap[rawStatusType]} ({jobApps.length})
      </Typography>
      <Droppable key={rawStatusType} droppableId={`${rawStatusType}`}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            sx={styles.droppableList}
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
                    sx={styles.useItemStyle(provided.draggableProps.style)}
                  >
                    <Box sx={styles.draggableContent}>
                      <Box sx={styles.itemTextHolder}>
                        <Typography
                          variant={"body1"}
                          sx={styles.title}
                          textAlign={"left"}
                        >
                          {jobApp.role}
                        </Typography>
                        <Typography variant={"body2"} textAlign={"left"}>
                          {jobApp.company}
                        </Typography>
                        {jobApp.dateApplied && (
                          <Typography
                            sx={styles.dateAppliedText}
                            variant={"body2"}
                            textAlign={"left"}
                          >
                            {jobApp.dateApplied}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        sx={styles.iconHolder}
                        onClick={() => {
                          handleOpenEditDialog(jobApp);
                        }}
                        size="large"
                      >
                        <InfoOutlinedIcon fontSize="medium" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <EditDialog
        dialogProps={editDialogProps}
        handleClose={handleClose}
        onSubmit={handleUpdate}
        formContactSuite={formContactSuite}
        jobApp={jobApp}
        loadingSubmit={loadingUpdate}
        type={"edit"}
        handleDeleteJobApp={handleDelete}
        loadingDelete={loadingDelete}
      />
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
    </Box>
  );
};

export default JobAppDroppableList;
