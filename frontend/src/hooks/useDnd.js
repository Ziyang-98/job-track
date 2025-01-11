const useDnd = (jobApps, filteredJobApps, setJobApps, updateStatus) => {
  /**
   * Moves an item from one list to another list.
   */
  const moveDraggable = (
    droppableSource,
    droppableDestination,
    jobApps,
    filteredJobApps
  ) => {
    const { index: sourceIndex, droppableId: sourceDroppableId } =
      droppableSource;
    const { index: destIndex, droppableId: destDroppableId } =
      droppableDestination;
    const sourceClone = Array.from(jobApps[sourceDroppableId]);
    const destClone = Array.from(jobApps[destDroppableId]);

    const jobAppToMove = filteredJobApps[sourceDroppableId][sourceIndex];

    const sourceIndexOfJobAppToMove = sourceClone.findIndex(
      (jobApp) => jobApp._id === jobAppToMove._id
    );
    const [removed] = sourceClone.splice(sourceIndexOfJobAppToMove, 1);
    updateStatus(removed, droppableDestination.droppableId);

    const indexToInsert =
      filteredJobApps[destDroppableId].length === 0
        ? jobApps[destDroppableId].length
        : destClone.findIndex(
            (jobApp) =>
              jobApp._id ===
              filteredJobApps[destDroppableId][
                destIndex === filteredJobApps[destDroppableId].length
                  ? destIndex - 1 // Get index of element before destIndex
                  : destIndex // Get index of element at destIndex
              ]._id
          );
    destClone.splice(
      indexToInsert +
        // Add 1 if indexToInsert references element before destIndex
        (destIndex === filteredJobApps[destDroppableId].length ? 1 : 0),
      0,
      removed
    );

    const result = {};
    result[sourceDroppableId] = sourceClone;
    result[destDroppableId] = destClone;

    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceIndex = +source.droppableId;
    const destIndex = +destination.droppableId;
    const newJobApps = jobApps.slice();

    if (sourceIndex === destIndex) {
      const items = reorder(
        jobApps[sourceIndex],
        source.index,
        destination.index
      );
      newJobApps[sourceIndex] = items;
    } else {
      const result = moveDraggable(
        source,
        destination,
        jobApps,
        filteredJobApps
      );
      newJobApps[sourceIndex] = result[sourceIndex];
      newJobApps[destIndex] = result[destIndex];
    }
    setJobApps(newJobApps);
  }

  return { onDragEnd };
};

export default useDnd;
