const useDnd = (jobApps, setJobApps, updateStatus) => {
  /**
   * Moves an item from one list to another list.
   */
  const moveDraggable = (
    source,
    destination,
    droppableSource,
    droppableDestination
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    updateStatus(removed, droppableDestination.droppableId);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

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

    if (sourceIndex === destIndex) {
      const items = reorder(
        jobApps[sourceIndex],
        source.index,
        destination.index
      );
      const newjobApps = [...jobApps];
      newjobApps[sourceIndex] = items;
      setJobApps(newjobApps);
    } else {
      const result = moveDraggable(
        jobApps[sourceIndex],
        jobApps[destIndex],
        source,
        destination
      );
      const newjobApps = [...jobApps];
      newjobApps[sourceIndex] = result[sourceIndex];
      newjobApps[destIndex] = result[destIndex];

      setJobApps(newjobApps);
    }
  }

  return { onDragEnd };
};

export default useDnd;
