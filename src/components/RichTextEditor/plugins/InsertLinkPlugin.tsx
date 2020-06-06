// @flow
import { Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styled from 'styled-components';

const linkStrategy = (
  contentBlock: Record<string, any>,
  callback: Function,
  contentState: Record<string, any>,
): any => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
};

interface DraftLinkProps {
  contentState: Record<string, any>;
  entityKey: string | null;
  children: Record<string, any>;
  setVisibleInsertLink: Function;
  setCurrentEntityKey: Function;
  setCurrentInsertLinkData: Function;
  visibleInsertLink: boolean;
  urlTextRef: any;
  setIsEditable: Function;
}

export const DraftLink: React.FunctionComponent<DraftLinkProps> = ({
  contentState,
  entityKey,
  children,
  setVisibleInsertLink,
  setCurrentEntityKey,
  setCurrentInsertLinkData,
  visibleInsertLink,
  urlTextRef,
  setIsEditable,
}: DraftLinkProps) => {
  const { url } = contentState.getEntity(entityKey).getData();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const handleVisibleChange = (isVisible: boolean): void => {
    setIsPopoverVisible(isVisible);
    setIsEditable(isVisible);
  };
  const onOpenEdit = (): void => {
    setVisibleInsertLink(true);
    setCurrentEntityKey(entityKey);
    setCurrentInsertLinkData({ url });
    setIsPopoverVisible(false);
  };

  return (
    <Popover
      content={
        <PopoverWrapper>
          <CustomLink onClick={(): any => window.open(url, '_blank')}>
            {url}
          </CustomLink>
          <EditButton onClick={onOpenEdit} style={{ marginLeft: 20 }} />
        </PopoverWrapper>
      }
      onVisibleChange={handleVisibleChange}
      visible={!visibleInsertLink && isPopoverVisible}
    >
      <a
        ref={urlTextRef}
        className="link"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={url}
      >
        {children}
      </a>
    </Popover>
  );
};

const EditButton = styled(EditOutlined)`
  cursor: pointer;
  transition: opacity 0.5s, color 0.2s;

  :hover {
    opacity: 0.7;
  }

  :active {
    color: #1890ff;
  }
`;

const PopoverWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
`;

const CustomLink = styled.div`
  cursor: pointer;
  color: #1890ff;
  transition: opacity 0.5s, color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    opacity: 0.7;
  }
`;

export const getInsertLinkPlugin = (props: Record<string, any>): any => ({
  decorators: [
    {
      strategy: linkStrategy,
      component: DraftLink,
      props,
    },
  ],
});
