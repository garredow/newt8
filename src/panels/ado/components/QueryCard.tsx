import { formatDistanceToNow } from 'date-fns';
import React, { useContext, useMemo } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useQuery } from 'react-query';
import {
  PanelContext,
  PanelContextValue,
} from '../../../contexts/PanelContext';
import { ControlType } from '../../../enums/controlType';
import { CardSettings } from '../../../models/CardSettings';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { openUrl } from '../../../services/browser';
import { IconButton } from '../../../ui-components/button';
import { Card, CardContent, CardFooter } from '../../../ui-components/card';
import { AzureDevOpsPanelSettings } from '../AzureDevOpsPanel';
import { Project, Query, WorkItem } from '../models';
import { AzureDevOps } from '../service';
import styles from './QueryCard.module.css';
import { WorkItemRow } from './WorkItemRow';

type Props = ComponentBaseProps & {
  projects?: Project[];
};

type QueryCardSettings = CardSettings & {
  projectId?: string;
  queryId?: string;
};

type QueryCardData = {
  queries: Query[];
  workItems: WorkItem[];
  updatedDate: number;
};

export function QueryCard(props: Props) {
  const { settings: panelSettings, cardSettingsMap } =
    useContext<PanelContextValue<AzureDevOpsPanelSettings>>(PanelContext);

  const cardSettings = useMemo(
    () => cardSettingsMap.query as QueryCardSettings,
    [cardSettingsMap]
  );

  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useQuery<QueryCardData>(
      ['adoPanel', 'queryCard', cardSettings.projectId, cardSettings.queryId],
      async () => {
        const result: QueryCardData = {
          queries: [],
          workItems: [],
          updatedDate: new Date().valueOf(),
        };

        if (!cardSettings.projectId) {
          return result;
        }

        const ado = new AzureDevOps(panelSettings.accessToken);
        result.queries = await ado.getQueries(cardSettings.projectId);

        if (cardSettings.queryId) {
          result.workItems = await ado.getWorkItemsByQuery(
            cardSettings.projectId,
            cardSettings.queryId
          );
        }

        return result;
      },
      { enabled: !!panelSettings.accessToken }
    );

  return (
    <Card
      cardId="query"
      className={styles.root}
      defaultTitle="Query"
      settings={[
        {
          id: 'config',
          title: 'Config',
          items: [
            {
              type: 'select',
              key: 'projectId',
              label: 'Project',
              helpText: 'Choose which project you want to work with.',
              options: props.projects
                ? [
                    { label: '', value: '' },
                    ...props.projects.map((a) => ({
                      label: a.name,
                      value: a.id,
                    })),
                  ]
                : [],
              testId: 'select-project',
            },
            {
              type: 'select',
              key: 'queryId',
              label: 'Query',
              helpText: 'Choose which query for want executed.',
              options: data?.queries?.map((a) => ({
                label: a.path,
                value: a.id,
              })),
              testId: 'select-query',
            },
          ],
        },
      ]}
    >
      <CardContent>
        {data?.workItems?.map((item) => (
          <section key={item.id}>
            <WorkItemRow workItem={item} onClick={() => openUrl(item.url)} />
            {item.children.map((childItem) => (
              <WorkItemRow
                key={childItem.id}
                className={styles.childRow}
                workItem={childItem}
                onClick={() => openUrl(childItem.url)}
              />
            ))}
          </section>
        ))}
      </CardContent>
      <CardFooter className={styles.footer}>
        {(isLoading || isFetching) && <span>{`Updating...`}</span>}
        {!isLoading && !isFetching && isError && (
          <span>{`Failed to fetch data`}</span>
        )}
        {!isLoading && !isFetching && isSuccess && (
          <span>{`Updated ${formatDistanceToNow(data?.updatedDate!, {
            addSuffix: true,
          })}`}</span>
        )}
        <IconButton
          type={ControlType.Secondary}
          icon={<MdRefresh />}
          title="Refresh data"
          animation="spin"
          size={24}
          forceAnimate={isLoading || isFetching}
          onClick={() => refetch({ cancelRefetch: true })}
        />
      </CardFooter>
    </Card>
  );
}
