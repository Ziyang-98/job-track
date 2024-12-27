export const styles = {
  loadingOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    backgroundColor: "primary.light",
    opacity: 0.8,
    zIndex: 1,
    borderRadius: 4,
  },
  loadingIcon: {
    color: "secondary.dark",
  },
  loadingText: {
    color: "secondary.contrastText",
    fontWeight: "bolder",
  },
};
