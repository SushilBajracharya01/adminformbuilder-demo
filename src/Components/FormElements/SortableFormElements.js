import SortableElement from './SortabeElement';
import BaseForElements from './index';

const {Label, Paragraph} = BaseForElements;

const FormElements = {};

FormElements.Label = SortableElement(Label);
FormElements.Paragraph = SortableElement(Paragraph);


export default FormElements;
