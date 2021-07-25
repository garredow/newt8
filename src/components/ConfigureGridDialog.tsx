import { Dialog } from '@reach/dialog';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { ControlLocation } from '../enums/controlLocation';
import { ControlType } from '../enums/controlType';
import { ComponentBase } from '../models/ComponentBase';
import { Panel } from '../models/Panel';
import { Button } from '../ui-components/button/Button';
import styles from './ConfigureGridDialog.module.css';
import { IconButton } from '../ui-components/button';
import { MdClose } from 'react-icons/md';
import { GridLayout } from '../models/GridLayout';
import { joinClasses } from '../utilities/classes';

type SizeSelectProps = {
  val: string;
  onChange: (val: string) => void;
};
function SizeSelect(props: SizeSelectProps) {
  function handleChange(ev: ChangeEvent<HTMLSelectElement>) {
    props.onChange(ev.target.value);
  }

  return (
    <select value={props.val} onChange={handleChange}>
      <option value="1fr">Auto</option>
      <option value="5%">5%</option>
      <option value="10%">10%</option>
      <option value="15%">15%</option>
      <option value="20%">20%</option>
      <option value="25%">25%</option>
      <option value="30%">30%</option>
      <option value="35%">35%</option>
      <option value="40%">40%</option>
      <option value="45%">45%</option>
      <option value="50%">50%</option>
      <option value="55%">55%</option>
      <option value="60%">60%</option>
      <option value="65%">65%</option>
      <option value="70%">70%</option>
      <option value="75%">75%</option>
      <option value="80%">80%</option>
      <option value="85%">85%</option>
      <option value="90%">90%</option>
      <option value="95%">95%</option>
      <option value="100%">100%</option>
    </select>
  );
}

export type ConfigureGridDialogProps = ComponentBase & {
  gridLayout: GridLayout;
  panels: Panel[];
  onSave: (newGridLayout: GridLayout, close: boolean) => void;
  onCancel: (newGridLayout: GridLayout) => void;
};
export function ConfigureGridDialog({
  gridLayout,
  panels,
  onSave,
  onCancel,
  ...props
}: ConfigureGridDialogProps) {
  const [originalGrid, setOriginalGrid] = useState<GridLayout>({
    rowSizes: [],
    colSizes: [],
    layout: [[]],
  });
  const [grid, setGrid] = useState<GridLayout>({
    rowSizes: [],
    colSizes: [],
    layout: [[]],
  });

  useEffect(() => {
    setOriginalGrid(gridLayout);
    setGrid(gridLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelNameMap = panels.reduce(
    (acc: any, val) => {
      acc[val.id] = val.options.title;
      return acc;
    },
    { '.': 'Blank' }
  );

  function findUnassignedPanels() {
    const assigned = new Set();
    grid.layout.forEach((row) => {
      row.forEach((col) => assigned.add(col));
    });

    const result = panels.filter((a) => !assigned.has(a.id)).map((a) => a.id);
    return result;
  }

  function getAvailableOptions(ri: number, ci: number) {
    const existing = grid.layout[ri][ci];
    const options = new Set([existing, '.', ...findUnassignedPanels()]);

    const maxRowIndex = grid.layout.length - 1;
    const maxColIndex = grid.layout[0].length - 1;

    if (ri - 1 >= 0) {
      options.add(grid.layout[ri - 1][ci]);
    }
    if (ri + 1 <= maxRowIndex) {
      options.add(grid.layout[ri + 1][ci]);
    }

    if (ci - 1 >= 0) {
      options.add(grid.layout[ri][ci - 1]);
    }
    if (ci + 1 <= maxColIndex) {
      options.add(grid.layout[ri][ci + 1]);
    }

    // TODO: Limit options to valid grid configs - no mixing cols and rows

    return Array.from(options);
  }

  function addRow(place: 'top' | 'bottom') {
    const newGrid = cloneDeep(grid);
    const cols = grid.layout[0].length;

    if (place === 'top') {
      newGrid.layout.unshift(new Array(cols).fill('.'));
      newGrid.rowSizes.unshift('1fr');
    } else {
      newGrid.layout.push(new Array(cols).fill('.'));
      newGrid.rowSizes.push('1fr');
    }

    setGrid(newGrid);
  }

  function addCol(place: 'left' | 'right') {
    const newGrid = cloneDeep(grid);

    if (place === 'left') {
      grid.layout.forEach((row, i) => newGrid.layout[i].unshift('.'));
      newGrid.colSizes.unshift('1fr');
    } else {
      grid.layout.forEach((row, i) => newGrid.layout[i].push('.'));
      newGrid.colSizes.push('1fr');
    }

    setGrid(newGrid);
  }

  function deleteRow(index: number) {
    if (grid.layout.length === 1) {
      return;
    }
    const newGrid = cloneDeep(grid);
    newGrid.layout.splice(index, 1);
    newGrid.rowSizes.splice(index, 1);

    setGrid(newGrid);
  }

  function deleteCol(index: number) {
    if (grid.layout[0].length === 1) {
      return;
    }
    const newGrid = cloneDeep(grid);
    grid.layout.forEach((row, ri) => {
      newGrid.layout[ri].splice(index, 1);
    });
    newGrid.colSizes.splice(index, 1);

    setGrid(newGrid);
  }

  function handleChange(ri: number, ci: number, newVal: string) {
    const newGrid = cloneDeep(grid);
    newGrid.layout[ri][ci] = newVal;

    setGrid(newGrid);
  }

  function handleSizeChange(type: 'row' | 'col', index: number, val: string) {
    const newGrid = cloneDeep(grid);
    const property = type === 'row' ? 'rowSizes' : 'colSizes';
    newGrid[property][index] = val;

    // TODO: Validate sizes

    setGrid(newGrid);
  }

  function handleSubmit(ev: any) {
    ev.preventDefault();
    onSave(grid, true);
  }

  function resetToDefault() {
    const newGrid: GridLayout = {
      rowSizes: ['1fr'],
      colSizes: [],
      layout: [[]],
    };

    panels.forEach((panel) => {
      newGrid.colSizes.push('1fr');
      newGrid.layout[0].push(panel.id);
    });

    setGrid(newGrid);
  }

  const unassignedPanels = findUnassignedPanels();

  return (
    <Dialog
      onDismiss={() => onCancel(originalGrid)}
      aria-label="confirm"
      className={styles.root}
      data-testid={props['data-testid']}
    >
      <h2 className={styles.title}>Configure Grid</h2>
      {unassignedPanels.length > 0 ? (
        <div>
          These panels need to be assigned to the grid before you can save:
          <ul>
            {unassignedPanels.map((a) => (
              <li key={panelNameMap[a]}>{panelNameMap[a]}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <div className={joinClasses(styles.layoutRow, styles.actionRow)}>
            {grid.layout[0]?.map((col, i) => (
              <div key={i} className={styles.sizeCol}>
                <SizeSelect
                  val={grid.colSizes[i]}
                  onChange={(data) => handleSizeChange('col', i, data)}
                />
              </div>
            ))}
          </div>
          {grid.layout.map((row, ri) => {
            return (
              <div key={ri} className={styles.layoutRow}>
                <div className={styles.sizeRow}>
                  <SizeSelect
                    val={grid.rowSizes[ri]}
                    onChange={(data) => handleSizeChange('row', ri, data)}
                  />
                </div>
                {row.map((col, ci) => {
                  return (
                    <div key={ci} className={styles.layoutCol}>
                      <select
                        value={col}
                        onChange={(ev) => handleChange(ri, ci, ev.target.value)}
                      >
                        {getAvailableOptions(ri, ci).map((opt) => (
                          <option key={opt} value={opt}>
                            {panelNameMap[opt]}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
                <IconButton
                  icon={<MdClose />}
                  title="Delete row"
                  type={ControlType.Danger}
                  onClick={() => deleteRow(ri)}
                />
              </div>
            );
          })}
          <div className={joinClasses(styles.layoutRow, styles.actionRow)}>
            {grid.layout[0]?.map((col, i) => (
              <div key={i} className={styles.sizeCol}>
                <IconButton
                  icon={<MdClose />}
                  title="Delete column"
                  type={ControlType.Danger}
                  onClick={() => deleteCol(i)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.compactSizes}>
          {grid.layout.map((row, i) => (
            <div key={i}>
              <span>Row {i + 1}:</span>
              <SizeSelect
                val={grid.rowSizes[i]}
                onChange={(data) => handleSizeChange('row', i, data)}
              />
              <div style={{ flex: 1 }} />
              <IconButton
                icon={<MdClose />}
                title="Delete row"
                type={ControlType.Danger}
                onClick={() => deleteRow(i)}
              />
            </div>
          ))}
          {grid.layout[0]?.map((col, i) => (
            <div key={i}>
              <span>Column {i + 1}:</span>
              <SizeSelect
                val={grid.colSizes[i]}
                onChange={(data) => handleSizeChange('col', i, data)}
              />
              <div style={{ flex: 1 }} />
              <IconButton
                icon={<MdClose />}
                title="Delete column"
                type={ControlType.Danger}
                onClick={() => deleteCol(i)}
              />
            </div>
          ))}
        </div>
        <div className={styles.gridActions}>
          <Button
            location={ControlLocation.Card}
            type={ControlType.Secondary}
            text="Add Column Left"
            onClick={() => addCol('left')}
          />
          <div className={styles.rowActions}>
            <Button
              location={ControlLocation.Card}
              type={ControlType.Secondary}
              text="Add Row Top"
              onClick={() => addRow('top')}
            />
            <Button
              location={ControlLocation.Card}
              type={ControlType.Secondary}
              text="Add Row Bottom"
              onClick={() => addRow('bottom')}
            />
          </div>
          <Button
            location={ControlLocation.Card}
            type={ControlType.Secondary}
            text="Add Column Right"
            onClick={() => addCol('right')}
          />
        </div>
        <div className={styles.actions}>
          <Button
            location={ControlLocation.Card}
            type={ControlType.Danger}
            text="Reset"
            title="Reset grid to a default safe layout"
            onClick={resetToDefault}
          />
          <div style={{ flex: 1 }} />
          <Button
            location={ControlLocation.Card}
            type={ControlType.Secondary}
            text="Cancel"
            title="Restore original grid layout"
            onClick={() => onSave(originalGrid, true)}
          />
          <Button
            location={ControlLocation.Card}
            type={ControlType.Secondary}
            text="Preview"
            title="Apply changes without permanently saving them"
            onClick={() => onSave(grid, false)}
          />
          <Button
            location={ControlLocation.Card}
            type={ControlType.Primary}
            text="Save"
            title="Save grid layout"
            disabled={unassignedPanels.length > 0}
            htmlType="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}
