const grid = 4;

const colorTheme = ["planning", "applied", "interview", "offered", "rejected"];

const getItemStyle = (isDragging, draggableStyle, index) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  p: 2,
  m: `0 0 ${grid}px 0`,
  borderRadius: 2,
  // change background colour if dragging
  bgcolor: "primary.lessLight",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const useStyles = (index) => ({
  mainList: {
    bgcolor: "primary.light",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "8px 8px",
    width: "15%",
    minWidth: 180,

    minHeight: 300,
    height: 500,
    maxHeight: 700,

    borderRadius: 1.5,
  },
  listTitle: {
    color: colorTheme[index],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
    paddingTop: 1,
    paddingBottom: 1,
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
    justifyContent: "space-between",
    alignItems: "center",
    color: "primary.dark",
  },
  itemText: {
    // fontSize: "16px",
  },
  button: {
    padding: 0,
    marginLeft: "4px",
  },
});
