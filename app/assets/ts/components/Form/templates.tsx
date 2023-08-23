import { Templates } from '@truelime/react-forms';
import Searchtext from './Fields/Searchtext';
import Phone from './Fields/Phone';

const CustomTemplates = {
  Form: Templates.Form,
  Step: Templates.Step,
  Group: {
    Wrapper: Templates.Group.Wrapper
  },
  Content: Templates.Content,
  Field: {
    Text: Templates.Field.Text,
    Select: Templates.Field.Select,
    Hidden: Templates.Field.Hidden,
    Checkbox: Templates.Field.Checkbox,
    CheckboxGroup: Templates.Field.CheckboxGroup,
    RadioGroup: Templates.Field.RadioGroup,
    TextArea: Templates.Field.TextArea,
    Date: Templates.Field.Date,
    File: Templates.Field.File,
    Searchtext,
    Phone
  }
};

export default CustomTemplates;