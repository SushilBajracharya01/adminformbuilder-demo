import React, { useState } from "react";
import update from "immutability-helper";
import { connect, useDispatch } from "react-redux";
import FormElements from "../FormElements/index";
import SortableFormElements from "../FormElements/SortableFormElements";

const { Label } = FormElements;

function Preview({ parent, formElements, editModeOn }) {
  const [seq, setSeq] = useState(0);
    const dispatch = useDispatch();
  const getDataById = (id) => {
    const { data } = this.state;
    return data.find((x) => x && x.id === id);
  };

  const swapChildren = (data, item, child, col) => {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (
      !(child.col !== undefined && child.col !== col && item.childItems[col])
    ) {
      // No child was assigned yet in both source and target.
      return false;
    }
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[oldCol] = oldId;
    oldItem.col = oldCol;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id;
    child.col = col;
    // store.dispatch("updateOrder", data);
    return true;
  };

  const setAsChild = (item, child, col) => {
    const { data } = this.state;
    if (this.swapChildren(data, item, child, col)) {
      return;
    }
    const oldParent = this.getDataById(child.parentId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id;
    child.col = col;
    // eslint-disable-next-line no-param-reassign
    child.parentId = item.id;
    // eslint-disable-next-line no-param-reassign
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    const list = data.filter((x) => x && x.parentId === item.id);
    const toRemove = list.filter((x) => item.childItems.indexOf(x.id) === -1);
    let newData = data;
    if (toRemove.length) {
      // console.log('toRemove', toRemove);
      newData = data.filter((x) => toRemove.indexOf(x) === -1);
    }
    if (!this.getDataById(child.id)) {
      newData.push(child);
    }
    // store.dispatch("updateOrder", newData);
  };

  const _onDestroy = (item) => {
    if (item.childItems) {
      item.childItems.forEach((x) => {
        const child = this.getDataById(x);
        if (child) {
          //   store.dispatch('delete', child);
        }
      });
    }
    // store.dispatch('delete', item);
  };

  const removeChild = (item, col) => {
    const { data } = this.state;
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    if (oldItem) {
      const newData = data.filter((x) => x !== oldItem);
      // eslint-disable-next-line no-param-reassign
      item.childItems[col] = null;
      // delete oldItem.parentId;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      //   store.dispatch("updateOrder", newData);
      this.setState({ data: newData });
    }
  };

  const saveData = (dragCard, dragIndex, hoverIndex) => {
    const newData = update(formElements, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    });
    dispatch({type:"REORDER_FORM", payload: newData});
  };

  const moveCard = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex, "you");
    const dragCard = formElements[dragIndex];
    saveData(dragCard, dragIndex, hoverIndex);
  };

  const insertCard = (item, hoverIndex, id) => {
    if (id) {
      this.restoreCard(item, id);
    } else {
      formElements.splice(hoverIndex, 0, item);
      saveData(item, hoverIndex, hoverIndex);
    }
  };
  const getElement = (item, index) => {
    if (item.custom) {
      if (!item.component || typeof item.component !== "function") {
        // eslint-disable-next-line no-param-reassign
        item.component = this.props.registry.get(item.key);
      }
    }
    const SortableFormElement = SortableFormElements[item.element];

    if (SortableFormElement === null) {
      return null;
    }
    return (
      <SortableFormElement
        id={item.id}
        seq={seq}
        index={index}
        moveCard={moveCard}
        insertCard={insertCard}
        mutable={false}
        parent={parent}
        editModeOn={editModeOn}
        isDraggable={true}
        key={item.id}
        sortData={item.id}
        data={item}
        getDataById={getDataById}
        setAsChild={setAsChild}
        removeChild={removeChild}
        _onDestroy={_onDestroy}
      />
    );
  };
  return (
    <div>
      Preview
      {formElements.map((element, index) => getElement(element, index))}
      {/* <Label data={{content:"<p>Hello World!</p>"}} editModeOn={editModeOn}/> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  formElements: state.FormData.formElements,
});

export default connect(mapStateToProps, null)(Preview);
