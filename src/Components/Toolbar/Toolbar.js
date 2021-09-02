import React, { useState } from "react";
import ID from "../../UUID";
import ToolbarItem from "./ToolbarItem";
import { useDispatch } from "react-redux";

function Toolbar(props) {
  const dispatch = useDispatch();

  const isDefaultItem = (item) => {
    const keys = Object.keys(item);
    return keys.filter((x) => x !== "element" && x !== "key").length === 0;
  };

  const buildItems = (items, defaultItems) => {
    if (!items) {
      return defaultItems();
    }
    return items.map((x) => {
      let found;
      if (isDefaultItem(x)) {
        found = defaultItems.find(
          (y) => (x.element || x.key) === (y.element || y.key)
        );
      }
      return found || x;
    });
  };

  const _defaultItems = () => {
    return [
      {
        key: "Label",
        name: "Label",
        static: true,
        icon: "fas fa-font",
        content: "<p>Placeholder Text...</p>",
      },
      {
        key: 'Paragraph',
        name: 'Paragraph',
        static: true,
        icon: 'fas fa-paragraph',
        content: 'This is paragraph Text...',
      },
    ];
  };

  const [items, setItems] = useState(() => {
    return buildItems(props.items, _defaultItems);
  });

  const create = (item) => {
    const elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      text: item.name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    };

    if (item.content) { elementOptions.content = item.content; }


    return elementOptions;
  };

  const onClick = (item) => {
    dispatch({ type: "ADD_FORM_DATA", payload: create(item) });
  };
  return (
    <div>
      <h3>Toolbar</h3>
      <ul>
        {items.map((item) => (
          <ToolbarItem
            data={item}
            key={item.key}
            onClick={() => {
              onClick(item);
            }}
            onCreate={create}
          />
        ))}
      </ul>
    </div>
  );
}

export default Toolbar;
