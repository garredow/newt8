import { formatDistanceToNow } from 'date-fns';
import React, { useContext, useMemo } from 'react';
import { GoGitPullRequest } from 'react-icons/go';
import { MdRefresh } from 'react-icons/md';
import { useQuery } from 'react-query';
import {
  PanelContext,
  PanelContextValue,
} from '../../../contexts/PanelContext';
import { ControlType } from '../../../enums/controlType';
import { CardSettings } from '../../../models/CardSettings';
import { ComponentBaseProps } from '../../../models/ComponentBaseProps';
import { IconButton } from '../../../ui-components/button';
import { Card, CardContent, CardFooter } from '../../../ui-components/card';
import { AzureDevOpsPanelSettings } from '../AzureDevOpsPanel';
import { Project, PullRequest } from '../models';
import { AzureDevOps } from '../service';
import { PullRequestRow } from './PullRequestRow';
import styles from './PullRequestsCard.module.css';

type Props = ComponentBaseProps & {
  projects?: Project[];
};

type PullRequestsCardSettings = CardSettings & {
  projectId?: string;
};

type PullRequestsCardData = {
  pullRequests: PullRequest[];
  updatedDate: number;
};

export function PullRequestsCard(props: Props) {
  const { settings: panelSettings, cardSettingsMap } =
    useContext<PanelContextValue<AzureDevOpsPanelSettings>>(PanelContext);

  const cardSettings = useMemo(
    () => cardSettingsMap.pullRequests as PullRequestsCardSettings,
    [cardSettingsMap]
  );

  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useQuery<PullRequestsCardData>(
      ['adoPanel', 'prCard', cardSettings.projectId],
      async () => {
        const result: PullRequestsCardData = {
          pullRequests: [],
          updatedDate: new Date().valueOf(),
        };

        if (!cardSettings.projectId) {
          return result;
        }

        const ado = new AzureDevOps(panelSettings.accessToken);
        result.pullRequests = await ado.getPullRequestsByProject(
          cardSettings.projectId
        );

        return result;
      },
      { enabled: !!panelSettings.accessToken }
    );

  return (
    <Card
      cardId="pullRequests"
      className={styles.root}
      headerIcon={<GoGitPullRequest />}
      defaultTitle="Pull Requests"
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
          ],
        },
      ]}
    >
      <CardContent>
        {data?.pullRequests.map((a) => (
          <PullRequestRow
            key={a.id}
            pullRequest={a}
            onClick={() => console.log('click')}
          />
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
