import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Card, CardProps, defaultCardSettings } from '.';
import {
  defaultPanelSettings,
  PanelContext,
} from '../../contexts/PanelContext';

describe('Card', () => {
  test('render children', () => {
    const { getByText } = render(
      <Card>
        <div>child text</div>
      </Card>
    );

    expect(getByText('child text')).toBeVisible();
  });

  test('displays card setttings', () => {
    const props: CardProps = {
      cardId: 'card1',
      title: 'card title',
      enableSettings: true,
    };

    const { getByTestId, getByDisplayValue } = render(
      <PanelContext.Provider
        value={{
          settings: defaultPanelSettings,
          cardSettingsMap: {
            card1: {
              headerColor: 'headerColor1',
              headerTextColor: 'headerTextColor1',
              cardColor: 'cardColor1',
              cardTextColor: 'cardTextColor1',
            },
          },
          savePanel: () => Promise.resolve(),
          saveCardSettings: () => Promise.resolve(),
        }}
      >
        <Card {...props} />
      </PanelContext.Provider>
    );

    fireEvent.click(getByTestId('btn-settings'));

    expect(getByDisplayValue('headerColor1')).toBeVisible();
    expect(getByDisplayValue('headerTextColor1')).toBeVisible();
    expect(getByDisplayValue('cardColor1')).toBeVisible();
    expect(getByDisplayValue('cardTextColor1')).toBeVisible();
  });

  test('closes card theme setttings', () => {
    const props: CardProps = {
      cardId: 'card1',
      title: 'card title',
      enableSettings: true,
    };

    const { getByTestId, queryByTestId } = render(<Card {...props} />);

    fireEvent.click(getByTestId('btn-settings'));
    expect(getByTestId('dialog-card-settings')).toBeVisible();

    fireEvent.click(getByTestId('btn-close-dialog'));
    expect(queryByTestId('dialog-card-settings')).toBeNull();
  });

  test('changes card setttings', () => {
    const props: CardProps = {
      cardId: 'card1',
      title: 'card title',
      enableSettings: true,
    };

    const contextVal = {
      settings: defaultPanelSettings,
      cardSettingsMap: {
        card1: {
          headerColor: 'headerColor1',
          headerTextColor: 'headerTextColor1',
          cardColor: 'cardColor1',
          cardTextColor: 'cardTextColor1',
        },
      },
      savePanel: jest.fn(),
      saveCardSettings: jest.fn(),
    };

    const { getByTestId, getByDisplayValue } = render(
      <PanelContext.Provider value={contextVal}>
        <Card {...props} />
      </PanelContext.Provider>
    );

    fireEvent.click(getByTestId('btn-settings'));

    fireEvent.change(getByDisplayValue('headerColor1'), {
      target: { value: '#f00' },
    });
    fireEvent.change(getByDisplayValue('headerTextColor1'), {
      target: { value: '#f00' },
    });
    fireEvent.change(getByDisplayValue('cardColor1'), {
      target: { value: '#f00' },
    });
    fireEvent.change(getByDisplayValue('cardTextColor1'), {
      target: { value: '#f00' },
    });

    expect(contextVal.saveCardSettings).toBeCalledTimes(4);
  });

  test('clears card setttings', () => {
    const props: CardProps = {
      cardId: 'card1',
      title: 'card title',
      enableSettings: true,
    };

    const contextVal = {
      settings: defaultPanelSettings,
      cardSettingsMap: {
        card1: {
          title: 'Card1',
          headerColor: 'headerColor1',
          headerTextColor: 'headerTextColor1',
          cardColor: 'cardColor1',
          cardTextColor: 'cardTextColor1',
        },
      },
      savePanel: jest.fn(),
      saveCardSettings: jest.fn(),
    };

    const { getByTestId, getByText } = render(
      <PanelContext.Provider value={contextVal}>
        <Card {...props} />
      </PanelContext.Provider>
    );

    fireEvent.click(getByTestId('btn-settings'));
    fireEvent.click(getByText('Clear Styles'));

    expect(contextVal.saveCardSettings).toBeCalledTimes(1);
    expect(contextVal.saveCardSettings).toBeCalledWith(props.cardId, {
      ...defaultCardSettings,
      title: contextVal.cardSettingsMap.card1.title,
    });
  });
});
