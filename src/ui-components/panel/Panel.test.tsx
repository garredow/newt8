import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Panel } from '.';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { defaultSettings, SettingsContext } from '../../SettingsContext';
import { Settings } from '../../models/Settings';
import { delay } from '../../utilities/delay';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';

function renderWithContext(element: any, settings?: Settings) {
  const settingsContextVal = {
    setSettings: () => Promise.resolve(),
    showSettings: () => {},
    hideSettings: () => {},
    settings: {
      ...defaultSettings,
      ...settings,
    },
  };
  return render(
    <SettingsContext.Provider value={settingsContextVal}>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => <div ref={provided.innerRef}>{element}</div>}
        </Droppable>
      </DragDropContext>
    </SettingsContext.Provider>
  );
}
describe('Panel', () => {
  test('renders children', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText } = renderWithContext(
      <Panel {...props}>
        <div>child text</div>
      </Panel>
    );

    expect(getByText('child text')).toBeVisible();
  });

  test('opens settings on button click', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    await act(async () => {
      fireEvent.click(getByTestId('btn-settings'));
      await delay(500);
    });

    expect(getByTestId('settings')).toBeVisible();
  });

  // TODO: Fix this test
  // test('closes settings on escape key press', async () => {
  //   const props = {
  //     panelId: '1',
  //     panelIndex: 0,
  //     options: {
  //       title: 'panel title',
  //       width: 3,
  //       columns: 1,
  //       display: PanelDisplayType.Default,
  //       orientation: Orientation.Vertical,
  //     },
  //     onDeletePanel: jest.fn(),
  //     onOptionsChanged: jest.fn(),
  //   };

  //   const { container, getByTestId, queryByTestId } = renderWithContext(
  //     <Panel {...props} />
  //   );

  //   expect(queryByTestId('settings')).toBeNull();

  //   await act(async () => {
  //     fireEvent.click(getByTestId('btn-settings'));
  //     await delay(500);
  //   });
  //   expect(getByTestId('settings')).toBeVisible();

  //   fireEvent.keyPress(container, { key: 'Escape' });
  //   await delay(500);
  //   expect(queryByTestId('settings')).toBeNull();
  // });

  test('hide settings button', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      enableSettings: false,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { queryByTestId } = renderWithContext(<Panel {...props} />);

    expect(queryByTestId('btn-settings')).toBeNull();
  });

  test('select correct settings for props', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      enableColumns: true,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(<Panel {...props} />);
    fireEvent.click(getByTestId('btn-settings'));

    expect((getByText('1') as HTMLOptionElement).selected).toBeTruthy();
    expect((getByText('5') as HTMLOptionElement).selected).toBeFalsy();
  });

  test('sets columns', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      enableColumns: true,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-columns'), { target: { value: 5 } });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged.mock.calls[0][0].columns).toEqual(5);
  });

  test('sets title', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('inp-title'), {
      target: { value: 'New Title' },
    });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
  });

  test('renders confirm dialog', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Delete Panel'));

    expect(getByTestId('confirm-delete-panel')).toBeVisible();
  });

  test('not render confirm dialog when setting is false', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />,
      {
        confirmBeforeDelete: false,
      } as any
    );

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Delete Panel'));

    expect(queryByTestId('confirm-delete-panel')).toBeNull();
    expect(props.onDeletePanel).toBeCalledTimes(1);
  });

  test('closes the confirm dialog', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        display: PanelDisplayType.Default,
        orientation: Orientation.Vertical,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    fireEvent.click(getByTestId('btn-settings'));

    fireEvent.click(getByText('Delete Panel'));
    expect(queryByTestId('confirm-delete-panel')).toBeTruthy();

    fireEvent.click(getByText('Cancel'));
    expect(queryByTestId('confirm-delete-panel')).toBeNull();
  });
});
