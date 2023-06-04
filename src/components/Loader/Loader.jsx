import { Comment } from 'react-loader-spinner'
import PropTypes from 'prop-types';

const Loader = ({className}) => {
  return (
    <Comment
      className={className}
      visible={true}
      height="80"
      width="80"
      ariaLabel="comment-loading"
      wrapperStyle={{marginRight: 'auto', marginLeft: 'auto', marginTop: '30'}}
      wrapperClass="comment-wrapper"
      color="#fff"
      backgroundColor="#4B2A99"
    />
  )
}

export default Loader

Loader.propTypes = {
  className: PropTypes.string,
};