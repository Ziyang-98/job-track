export const styles = {
  mainContainer: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "secondary.light",
  },
  content: {
    flexGrow: 1,
    width: "80%",
    overflow: "hidden",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  searchBarHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    minWidth: "15rem",
  },
};

export const getToolBarStyles = (isSearchBarAndActionButtonsOverlapping) => {
  return {
    toolBar: {
      display: "flex",
      justifyContent: isSearchBarAndActionButtonsOverlapping
        ? "center"
        : "space-between",
      flexWrap: "wrap",
      py: isSearchBarAndActionButtonsOverlapping ? 2 : "",
    },
  };
};
