import { Tooltip } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

const TextFormat = {
  Bold: 'BOLD',
  Italic: 'ITALIC',
  Underline: 'UNDERLINE',
  Strikethrough: 'STRIKETHROUGH',
  NumberedList: 'ordered-list-item',
  BulletedList: 'unordered-list-item',
};

interface InlineStyleButtonsProps {
  currentStyle: Record<string, any>;
  editorRef: Record<string, any>;
  blockType: string;
  visibleInsertLink: any;
  onToggle: (
    event: Record<string, any>,
    format: string,
    isBlock?: boolean,
  ) => void;
  setVisibleInsertLink: (isVisible: boolean) => void;
}

const InlineStyleButtons: React.FunctionComponent<InlineStyleButtonsProps> = ({
  currentStyle,
  editorRef,
  blockType,
  visibleInsertLink,
  onToggle,
  setVisibleInsertLink,
}: InlineStyleButtonsProps) => (
  <div>
    <Wrapper>
      <Tooltip title="Bold">
        <BoldOutlined
          onMouseDown={(e: any): void => onToggle(e, TextFormat.Bold)}
          className={`editor-btn ${
            currentStyle.has(TextFormat.Bold) ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Italic">
        <ItalicOutlined
          onMouseDown={(e: any): void => onToggle(e, TextFormat.Italic)}
          className={`editor-btn ${
            currentStyle.has(TextFormat.Italic) ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Underline">
        <UnderlineOutlined
          onMouseDown={(e: any): void => onToggle(e, TextFormat.Underline)}
          className={`editor-btn ${
            currentStyle.has(TextFormat.Underline) ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Strikethrough">
        <StrikethroughOutlined
          onMouseDown={(e: any): void => onToggle(e, TextFormat.Strikethrough)}
          className={`editor-btn ${
            currentStyle.has(TextFormat.Strikethrough)
              ? 'editor-btn-active'
              : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Numbered List">
        <OrderedListOutlined
          onMouseDown={(e: any): void =>
            onToggle(e, TextFormat.NumberedList, true)
          }
          className={`editor-btn ${
            blockType === TextFormat.NumberedList ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Bulleted List">
        <UnorderedListOutlined
          onMouseDown={(e: any): void =>
            onToggle(e, TextFormat.BulletedList, true)
          }
          className={`editor-btn ${
            blockType === TextFormat.BulletedList ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
      <Tooltip title="Insert link">
        <LinkOutlined
          onMouseDown={async (e: any): Promise<void> => {
            if (editorRef && editorRef.current) {
              await editorRef.current.focus();
              setVisibleInsertLink(true);
            }
            e.persist();
          }}
          className={`editor-btn ${
            blockType === visibleInsertLink ? 'editor-btn-active' : ''
          }`}
        />
      </Tooltip>
    </Wrapper>
  </div>
);

const Wrapper = styled.div`
  padding: 11px;
  display: flex;
  align-items: center;
  border-top: 1px solid #d9d9d9;
`;

export default InlineStyleButtons;
