const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  p: 1,
  m: `0 0 ${grid}px 0`,
  borderRadius: 2,
  // change background colour if dragging
  bgcolor: "primary.lessLight",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  bgcolor: "primary.light",
  marginBottom: 2,
  height: "100%",
  width: "90%",
  overflow: "auto",
});

export const styles = {
  mainList: {
    bgcolor: "primary.light",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 2,
    width: 250,
    minWidth: 160,

    minHeight: 300,
    height: 400,
    maxHeight: 500,

    borderRadius: 1.5,
  },
  listTitle: {
    color: "secondary.dark",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    width: "100%",
    paddingBottom: 2,
  },
  useListStyle: getListStyle,
  useItemStyle: getItemStyle,
  draggableContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
