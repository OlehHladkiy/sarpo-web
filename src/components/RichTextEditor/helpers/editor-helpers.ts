import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

/**
 * Accepts editorState and entityType(optional)
 * @param {Object} editorState
 * @param {string | undefined} entityType
 * @returns {Array} entities.
 */
export const getEditorEntities = (
  editorState: any,
  entityType = null,
): Record<string, any>[] => {
  const content = editorState.getCurrentContent();
  const entities = [];

  content.getBlocksAsArray().forEach(block => {
    // eslint-disable-next-line fp/no-let
    let selectedEntity = null;
    block.findEntityRanges(
      character => {
        if (character.getEntity() !== null) {
          const entity = content.getEntity(character.getEntity());
          if (!entityType || (entityType && entity.getType() === entityType)) {
            selectedEntity = {
              entityKey: character.getEntity(),
              blockKey: block.getKey(),
              entity: content.getEntity(character.getEntity()),
            };
            return true;
          }
        }
        return false;
      },
      (start, end) => {
        entities.push({ ...selectedEntity, start, end });
      },
    );
  });

  return entities;
};

export const insertLinkKeyBinding = (e: any): string => {
  if (e.keyCode === 75 && KeyBindingUtil.hasCommandModifier(e)) {
    return 'open-insert-link-modal';
  }
  return getDefaultKeyBinding(e);
};
