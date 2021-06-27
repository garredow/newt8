export function moveArrayItem(arr: any[], oldIndex: number, newIndex: number) {
  const newArr = [...arr];

  const minIndex = 0;
  const maxIndex = arr.length - 1;

  if (oldIndex > maxIndex) {
    oldIndex = maxIndex;
  } else if (oldIndex < minIndex) {
    oldIndex = minIndex;
  }

  if (newIndex > maxIndex) {
    newIndex = maxIndex;
  } else if (newIndex < minIndex) {
    newIndex = minIndex;
  }

  let prevIndex = newIndex <= oldIndex ? oldIndex + 1 : oldIndex;
  let nextIndex = newIndex > oldIndex ? newIndex + 1 : newIndex;

  newArr.splice(nextIndex, 0, newArr[oldIndex]);
  newArr.splice(prevIndex, 1);

  return newArr;
}
