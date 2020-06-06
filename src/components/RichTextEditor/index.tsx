import { RichUtils, EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';
import React, { useState, useRef, useEffect } from 'react';
import htmlToText from 'html-to-text';
import styled from 'styled-components';

import { insertLinkKeyBinding } from './helpers/editor-helpers';
import InsertLinkModal from './InsertLinkModal';
import { getInsertLinkPlugin } from './plugins/InsertLinkPlugin';
import InlineStyleButtons from './InlineStyleButtons';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  visible?: boolean;
  isValid: boolean;
  minHeight: number;
  maxHeight?: number;
  placeholder?: string;
  removeBorder?: boolean;
  members?: Record<string, any>[];
}

const RichTextEditor: React.FunctionComponent<RichTextEditorProps> = ({
  value,
  onChange,
  visible = true,
  isValid,
  minHeight,
  maxHeight = 400,
  placeholder = '',
  removeBorder = false,
  members = [],
}: RichTextEditorProps) => {
  const [editorState, setEditorState]: any = useState(
    EditorState.createWithContent(stateFromHTML('')),
  );
  const [isFocus, setIsFocus] = useState(false);
  const [visibleInsertLink, setVisibleInsertLink] = useState(false);
  const [currentEntityKey, setCurrentEntityKey] = useState(null);
  const [currentInsertLinkData, setCurrentInsertLinkData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [mentionPlugin] = useState(createMentionPlugin());

  const { MentionSuggestions } = mentionPlugin;

  const editorRef: any = useRef();
  const editorWrapperRef = useRef();
  const urlTextRef = useRef();

  const insertLinkPlugin = getInsertLinkPlugin({
    setCurrentEntityKey,
    setVisibleInsertLink,
    setCurrentInsertLinkData,
    visibleInsertLink,
    urlTextRef,
    setIsEditable,
  });

  const currentStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const isFirstEditorSet = useRef(true);
  useEffect(() => {
    if (htmlToText.fromString(value) && isFirstEditorSet.current) {
      setEditorState(EditorState.createWithContent(stateFromHTML(value)));
      isFirstEditorSet.current = false;
    }
  }, [value]);

  const boxShadow = isValid
    ? !removeBorder
      ? '0 0 0 2px rgba(24, 144, 255, 0.2)'
      : 'none'
    : '0 0 0 2px rgba(245, 34, 45, 0.2)';

  const getBorderColor = (): string => {
    if (removeBorder) {
      return 'transparent';
    } else if (isValid && !isFocus) {
      return '#d9d9d9';
    } else if (isValid && isFocus) {
      return '#40a9ff';
    } else if (!isValid) {
      return '#f5222d';
    }
  };

  const onChangeTrigger = (editorState): void => {
    setEditorState(editorState);

    if (onChange) {
      const htmlDescription = stateToHTML(editorState.getCurrentContent());
      onChange(htmlDescription);
    }
  };

  const onToggle = (e, key, isBlock = false): void => {
    e.preventDefault();

    if (isBlock) {
      onChangeTrigger(RichUtils.toggleBlockType(editorState, key));
      return;
    }
    onChangeTrigger(RichUtils.toggleInlineStyle(editorState, key));
  };

  const handleKeyCommand: any = (command): string => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === 'open-insert-link-modal') {
      setVisibleInsertLink(true);
    }
    if (newState) {
      onChangeTrigger(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <Wrapper
      ref={editorWrapperRef}
      data-cy="richTextEditor"
      borderColor={getBorderColor()}
      boxShadow={isFocus ? boxShadow : 'none'}
      isValid={isValid}
      isFocus={isFocus}
      visible={visible}
    >
      <InsertLinkModal
        visible={visibleInsertLink}
        setVisible={setVisibleInsertLink}
        editorWrapperRef={editorWrapperRef}
        editorState={editorState}
        setEditorState={setEditorState}
        currentEntityKey={currentEntityKey}
        currentInsertLinkData={currentInsertLinkData}
        urlTextRef={urlTextRef}
        isEditable={isEditable}
      />
      <EditorWrapper autoFocus minHeight={minHeight} maxHeight={maxHeight}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          keyBindingFn={insertLinkKeyBinding}
          handleKeyCommand={handleKeyCommand}
          plugins={[mentionPlugin, insertLinkPlugin]}
          onChange={onChangeTrigger}
          onFocus={(): void => setIsFocus(true)}
          onBlur={(): void => setIsFocus(false)}
          textAlignment="left"
          placeholder={
            RichUtils.getCurrentBlockType(editorState) === 'unstyled'
              ? placeholder
              : ''
          }
        />
        <MentionSuggestions
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSearchChange={(): void => {}}
          suggestions={members}
        />
      </EditorWrapper>
      <InlineStyleButtons
        currentStyle={currentStyle}
        editorRef={editorRef}
        blockType={blockType}
        visibleInsertLink={visibleInsertLink}
        onToggle={onToggle}
        setVisibleInsertLink={setVisibleInsertLink}
      />
    </Wrapper>
  );
};

const Wrapper: any = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props: any): string => props.borderColor};
  box-shadow: ${(props: any): string => props.boxShadow};
  transition: all 0.3s;
  background-color: white;
  padding-top: 5px;

  display: ${({ visible }: Record<string, any>): string =>
    visible ? 'block' : 'none'};

  ul,
  ol {
    margin: 0;
    margin-left: 20px;
  }

  .editor-btn {
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .editor-btn-active {
    color: #1890ff;

    &:hover {
      color: #1890ff;
    }
  }
`;

const EditorWrapper: any = styled.div`
  max-height: ${(props: any): string => props.maxHeight}px;
  overflow: auto;

  .DraftEditor-root {
    padding: 4px 11px;
  }

  .public-DraftEditor-content {
    min-height: ${(props: any): string => props.minHeight}px;
    width: 100%;
    line-height: 20px;
  }

  .public-DraftEditorPlaceholder-inner {
    margin-left: 11px;
    color: #bfbfbf;
  }
`;

export const isBlank = (editorState: any): boolean =>
  editorState
    .getCurrentContent()
    .getPlainText()
    .trim().length === 0;

export default RichTextEditor;
