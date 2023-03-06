import { ImSearch } from 'react-icons/im';

import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {
  Formik,
  StyleForm as Form,
  FormikError as ErrorMessage,
  Button,
  Label,
  Input,
} from './SearchForm.styled';

const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});
const SearchForm = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={SearchSchema}
      initialValues={{ query: '' }}
      onSubmit={({ query }, actions) => {
        onSubmit(query);
        actions.resetForm();
      }}
    >
      <Form>
        <Button type="submit">
          <Label>Search</Label>
          <ImSearch />
        </Button>
        <Input name="query" placeholder="Search image and photos"></Input>
        <ErrorMessage name="query" />
      </Form>
    </Formik>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
