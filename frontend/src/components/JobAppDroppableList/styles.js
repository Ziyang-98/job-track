const grid = 4;

const colorTheme = ["planning", "applied", "interview", "offered", "rejected"];

const getItemStyle = (draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  pl: 1.5,
  m: `0 0 ${grid}px 0`,
  borderRadius: 2,
  // change background colour if dragging
  bgcolor: "primary.lessLight",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const useStyles = (index, isSmall, isMedium) => ({
  mainList: {
    bgcolor: "primary.light",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "8px 8px",
    width: "16%",
    minWidth: 200,

    height: isSmall ? 360 : isMedium ? 420 : 500,

    borderRadius: 1.5,
  },
  listTitle: {
    color: colorTheme[index],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
    py: 1.5,
    fontSize: "18px",
    fontWeight: "800",
  },

  droppableList: {
    bgcolor: "primary.less",
    marginBottom: 2,
    height: "100%",
    width: "90%",
    overflow: "auto",
  },

  useItemStyle: getItemStyle,
  draggableContent: {
    display: "flex",
    alignItems: "center",
    color: "primary.dark",
  },
  itemTextHolder: {
    overflowX: "hidden",
  },
  icon: {
    fontSize: "1.5rem",
  },
  iconHolder: {
    marginLeft: "auto",
    width: "25%",
    height: "5rem",
    py: 0.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 1.5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    transition: "background 0.2s",
    "&:hover": {
      bgcolor: "primary.main",
    },
  },
  title: {
    fontWeight: "bold",
  },
  dateAppliedText: {
    mt: 1,
    color: "black",
  },
});
