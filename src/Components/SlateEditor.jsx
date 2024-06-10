import React, { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

const SlateEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'paragraph':
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={newValue => onChange(newValue)}>
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default SlateEditor;
