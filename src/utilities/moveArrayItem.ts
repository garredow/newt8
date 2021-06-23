export function moveArrayItem(arr: any[], oldIndex: number, newIndex: number) {
  const newArr = [...arr];

  let prevIndex = newIndex <= oldIndex ? oldIndex + 1 : oldIndex;
  let nextIndex = newIndex > oldIndex ? newIndex + 1 : newIndex;

  newArr.splice(nextIndex, 0, newArr[oldIndex]);
  newArr.splice(prevIndex, 1);

  return newArr;
}
