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
    p: 2,
    width: "80%",
    // overflow: "hidden",
    position: "relative",
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
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "primary.light",
    opacity: 0.8,
    zIndex: 1,
    borderRadius: 4,
  },
  loadingIcon: {
    color: "secondary.dark",
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
    },
  };
};
