import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { Panel } from '.';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { defaultSettings, SettingsContext } from '../../SettingsContext';
import { Settings } from '../../models/Settings';
import { delay } from '../../utilities/delay';

function renderWithContext(element: any, settings?: Settings) {
  const settingsContextVal = {
    setSettings: () => Promise.resolve(),
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
        options: {} as any,
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

  test('closes settings on escape key press', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { container, getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    await act(async () => {
      fireEvent.click(getByTestId('btn-settings'));
      await delay(500);
    });
    expect(getByTestId('settings')).toBeVisible();

    fireEvent.keyDown(container, { key: 'Escape' });
    await delay(500);
    expect(queryByTestId('settings')).toBeNull();
  });

  test('hide settings button', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
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
        options: {} as any,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(<Panel {...props} />);
    fireEvent.click(getByTestId('btn-settings'));

    expect((getByText('1') as HTMLOptionElement).selected).toBeTruthy();
    expect((getByText('5') as HTMLOptionElement).selected).toBeFalsy();
    expect((getByText('Medium') as HTMLOptionElement).selected).toBeTruthy();
    expect((getByText('Largest') as HTMLOptionElement).selected).toBeFalsy();
  });

  test('sets columns', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-columns'), { target: { value: 5 } });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged.mock.calls[0][0].columns).toEqual(5);
  });

  test('sets width', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-width'), { target: { value: 1 } });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged.mock.calls[0][0].width).toBe(1);
  });

  test('sets title', async () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.keyDown(getByText(props.options.title), { key: 'Enter' });

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
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Delete'));

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
    fireEvent.click(getByText('Delete'));

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
      },
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    fireEvent.click(getByTestId('btn-settings'));

    fireEvent.click(getByText('Delete'));
    expect(queryByTestId('confirm-delete-panel')).toBeTruthy();

    fireEvent.click(getByText('Cancel'));
    expect(queryByTestId('confirm-delete-panel')).toBeNull();
  });
});
