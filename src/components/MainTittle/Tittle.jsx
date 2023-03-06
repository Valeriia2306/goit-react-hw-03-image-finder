import { Сaption } from './Tittle.styled';
import PropTypes from 'prop-types';

const Tittle = ({ children }) => {
  return <Сaption>{children}</Сaption>;
};

Tittle.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Tittle;
