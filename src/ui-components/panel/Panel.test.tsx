import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Panel } from '.';
import {
  AppSettingsContext,
  defaultSettings,
} from '../../contexts/AppSettingsContext';
import { defaultPanelSettings } from '../../contexts/PanelContext';
import { Orientation } from '../../enums/orientation';
import { PanelDisplayType } from '../../enums/panelDisplayType';
import { Panel as PanelType } from '../../models/Panel';
import { Settings } from '../../models/Settings';
import { PanelProps } from './Panel';

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
    <AppSettingsContext.Provider value={settingsContextVal}>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => <div ref={provided.innerRef}>{element}</div>}
        </Droppable>
      </DragDropContext>
    </AppSettingsContext.Provider>
  );
}
describe('Panel', () => {
  test('renders children', () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
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

  test('opens settings dialog on button click', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));

    expect(getByTestId('settings')).toBeVisible();
  });

  test('closes settings dialog on button click', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByTestId('btn-close-dialog'));

    expect(queryByTestId('settings')).toBeNull();
  });

  // TODO: Fix this test
  // test('closes settings on escape key press', async () => {
  //   const props: PanelProps = {
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

  test('select correct settings for props', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(<Panel {...props} />);
    fireEvent.click(getByTestId('btn-settings'));

    expect((getByText('1') as HTMLOptionElement).selected).toBeTruthy();
    expect((getByText('5') as HTMLOptionElement).selected).toBeFalsy();
  });

  test('sets columns', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-columns'), { target: { value: 5 } });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged).toBeCalledWith({
      ...props.panel.options,
      columns: 5,
    });
  });

  test('sets display style', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          ...defaultPanelSettings,
          displayStyle: PanelDisplayType.Default,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-display-style'), {
      target: { value: PanelDisplayType.Cards },
    });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged).toBeCalledWith({
      ...props.panel.options,
      displayStyle: PanelDisplayType.Cards,
    });
  });

  test('sets scroll orientation', async () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          ...defaultPanelSettings,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.change(getByTestId('select-orientation'), {
      target: { value: Orientation.Horizontal },
    });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
    expect(props.onOptionsChanged).toBeCalledWith({
      ...props.panel.options,
      orientation: Orientation.Horizontal,
    });
  });

  test('prompts for delete confirmation', () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Delete Panel'));

    expect(getByText('Click again to confirm')).toBeVisible();
  });

  test('delete needs one click when confirmBeforeDelete is false', () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
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

  test('delete needs two clicks when confirmBeforeDelete is true', () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: {
          title: 'panel title',
          width: 3,
          columns: 1,
          display: PanelDisplayType.Default,
          orientation: Orientation.Vertical,
        },
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
    };

    const { getByText, getByTestId } = renderWithContext(<Panel {...props} />, {
      confirmBeforeDelete: true,
    } as any);

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Delete Panel'));
    fireEvent.click(getByText('Click again to confirm'));

    expect(props.onDeletePanel).toBeCalledTimes(1);
  });

  test('clicking extra button closes settings', () => {
    const props: PanelProps = {
      panel: {
        id: '1',
        options: defaultPanelSettings,
      } as unknown as PanelType,
      onDeletePanel: jest.fn(),
      onOptionsChanged: jest.fn(),
      settings: [
        {
          id: 'actions',
          items: [
            {
              type: 'button',
              key: 'test',
              label: 'Test',
              testId: 'btn-test',
            },
          ],
        },
      ],
    };

    const { getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    fireEvent.click(getByTestId('btn-settings'));
    expect(getByTestId('settings')).toBeVisible();

    fireEvent.click(getByTestId('btn-test'));
    expect(queryByTestId('settings')).toBeNull();
  });
});
