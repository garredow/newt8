import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Panel } from '.';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function renderWithContext(element: any) {
  return render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="test">{(provided) => element}</Droppable>
    </DragDropContext>
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
    };

    const { getByText } = renderWithContext(
      <DragDropContext onDragEnd={() => {}}>
        <Panel {...props}>
          <div>child text</div>
        </Panel>
      </DragDropContext>
    );

    expect(getByText('child text')).toBeVisible();
  });

  test('opens settings on button click', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
      },
    };

    const { getByTestId } = renderWithContext(<Panel {...props} />);

    fireEvent.click(getByTestId('btn-settings'));

    expect(getByTestId('settings')).toBeVisible();
  });

  test('closes settings on escape key press', () => {
    const props = {
      panelId: '1',
      panelIndex: 0,
      options: {
        title: 'panel title',
        width: 3,
        columns: 1,
        options: {} as any,
      },
    };

    const { container, getByTestId, queryByTestId } = renderWithContext(
      <Panel {...props} />
    );

    fireEvent.click(getByTestId('btn-settings'));
    expect(getByTestId('settings')).toBeVisible();

    fireEvent.keyDown(container, { key: 'Escape' });
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
      onOptionsChanged: jest.fn() as any,
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
      onOptionsChanged: jest.fn(),
    };

    const { getByTestId, getByText } = renderWithContext(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => <Panel {...props} />}
        </Droppable>
      </DragDropContext>
    );

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.keyDown(getByText(props.options.title), { key: 'Enter' });

    expect(props.onOptionsChanged).toBeCalledTimes(1);
  });
});
