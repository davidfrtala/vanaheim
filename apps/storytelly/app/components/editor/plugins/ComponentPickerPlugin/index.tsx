/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  LexicalEditor,
  TextNode,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  MenuRenderFn,
  useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';

import {
  HeadingIcon,
  PilcrowIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  ContainerIcon,
} from '@radix-ui/react-icons';
import { INSERT_CHAPTER_COMMAND } from '../ChapterPlugin';

import './ComponentPickerPlugin.css';

const alignmentIconMap = {
  left: TextAlignLeftIcon,
  center: TextAlignCenterIcon,
  right: TextAlignRightIcon,
  justify: TextAlignJustifyIcon,
};

class ComponentPickerOption extends MenuOption {
  // What shows up in the editor
  title: string;
  // Icon for display
  icon?: JSX.Element;
  // For extra searching.
  keywords: Array<string>;
  // TBD
  keyboardShortcut?: string;
  // What happens when you select this option?
  onSelect: (queryString: string) => void;

  constructor(
    title: string,
    options: {
      icon?: JSX.Element;
      keywords?: Array<string>;
      keyboardShortcut?: string;
      onSelect: (queryString: string) => void;
    }
  ) {
    super(title);
    this.title = title;
    this.keywords = options.keywords || [];
    this.icon = options.icon;
    this.keyboardShortcut = options.keyboardShortcut;
    this.onSelect = options.onSelect.bind(this);
  }
}

function ComponentPickerMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: ComponentPickerOption;
}) {
  let className = 'item hover:bg-muted text-foreground';
  if (isSelected) {
    className += ' bg-muted';
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={'component-picker-item-' + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  );
}

function getBaseOptions(editor: LexicalEditor) {
  return [
    new ComponentPickerOption('Paragraph', {
      icon: <PilcrowIcon className="h-4 w-4 mr-3" />,
      keywords: ['normal', 'paragraph', 'p', 'text'],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createParagraphNode());
          }
        }),
    }),
    new ComponentPickerOption(`Heading`, {
      icon: <HeadingIcon className="h-4 w-4 mr-3" />,
      keywords: ['heading', 'header', 'h1'],
      onSelect: () =>
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode('h1'));
          }
        }),
    }),
    new ComponentPickerOption('Chapter', {
      icon: <ContainerIcon className="h-4 w-4 mr-3" />,

      keywords: ['chapter'],
      onSelect: () => editor.dispatchCommand(INSERT_CHAPTER_COMMAND, undefined),
    }),
    ...(['left', 'center', 'right', 'justify'] as const).map((alignment) => {
      const IconComponent = alignmentIconMap[alignment];
      return new ComponentPickerOption(`Align ${alignment}`, {
        icon: <IconComponent className="h-4 w-4 mr-3" />,
        keywords: ['align', 'justify', alignment],
        onSelect: () =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
      });
    }),
  ];
}

export default function ComponentPickerMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
    minLength: 0,
  });

  const options = useMemo(() => {
    const baseOptions = getBaseOptions(editor);

    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, 'i');

    return [
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword))
      ),
    ];
  }, [editor, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString);
        closeMenu();
      });
    },
    [editor]
  );

  const menuRenderFn: MenuRenderFn<ComponentPickerOption> = (
    anchorElementRef,
    { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
  ) =>
    anchorElementRef.current && options.length
      ? createPortal(
          <div className="component-picker w-200 fixed bg-background rounded-md border shadow">
            <ul>
              {options.map((option, i: number) => (
                <ComponentPickerMenuItem
                  index={i}
                  isSelected={selectedIndex === i}
                  onClick={() => {
                    setHighlightedIndex(i);
                    selectOptionAndCleanUp(option);
                  }}
                  onMouseEnter={() => {
                    setHighlightedIndex(i);
                  }}
                  key={option.key}
                  option={option}
                />
              ))}
            </ul>
          </div>,
          anchorElementRef.current
        )
      : null;

  return (
    <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={menuRenderFn}
    />
  );
}
