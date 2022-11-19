

export const generateColor = (colorArray, colorIndex = 0) => {
  const numOfColor = colorArray.length;
  let newIndex;

  if (colorIndex === numOfColor) {
    newIndex = 0;
  } else {
    newIndex = colorIndex + 1;
  }

  return {
    colorIndex: newIndex,
    color: colorArray[newIndex],
  };
}