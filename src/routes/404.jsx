import { Link } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';

export default function Error() {
  return (
    <div className='page-view'>
      <div className='w-full flex justify-center'>
        <Icon icon="bi:wifi-off" width="8em" />
      </div>
      <h2 className='text-center pt-12 pb-6'>Nothing to see here!</h2>
      <p className='text-center'>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}