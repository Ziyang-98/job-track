export const useStyles = (isSmall) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: isSmall ? "100%" : "70%",
  },

  formItem: {
    marginY: 1,
  },
});
