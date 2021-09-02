import React from 'react'
import ComponentHeader from './component-header';
import myxss from './myxss';

const FormElements = {};

const Label = (props) => {
    let classNames = 'static';
    return(
        <div>
            <ComponentHeader {...props} />
            <label className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(props.data.content) }} />
        </div>
    )
}

const Paragraph =(props) => {
    let classNames = 'static';
    let baseClasses = 'SortableItem rfb-item';

    return (
      <div className={baseClasses}>
        <ComponentHeader {...props} />
        <p className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(props.data.content) }} />
      </div>
    );
}

FormElements.Label = Label;
FormElements.Paragraph = Paragraph;

export default FormElements;
