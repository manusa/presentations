import React, {useLayoutEffect, useRef} from 'react';
import {BugsBunny} from '../../../../components';
import {CLASS_NAME} from '../index';

import '../styles/looney-tunes.scss';

const calcClassName = (element = '') => (`${CLASS_NAME}-looney${element ? `__${element}` : ''}`);

const Ring = ({number}) =>
  <div className={`${calcClassName('ring')} ${calcClassName('ring-'+number)}`} />;

const CurvedText = ({
  text,
  className,
  radius = 100,
}) => {
  const ref = useRef();
  useLayoutEffect(() => {
      $(ref.current).arctext({radius});
      window.addEventListener('resize', () => {
        $(ref.current).arctext('set', {radius});
      });
  }, []);
  return <div ref={ref} className={className}>{text}</div>
}

export const LooneyTunes = ({
  Icon = BugsBunny,
  className = '',
  title = '',
  subtitle = '',
  producer = ''
}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
    </div>
    <Ring number={5}/>
    <Ring number={4}/>
    <Ring number={3}/>
    <Ring number={2}/>
    <Ring number={1}/>
    <div className={`${calcClassName('icon')}`}>
      <Icon />
    </div>
    <CurvedText className={calcClassName('title-fill')} text={title} radius={900} />
    <CurvedText className={calcClassName('title')} text={title} radius={900} />
    <CurvedText className={calcClassName('subtitle')} text={subtitle} radius={1500} />
    <div  className={calcClassName('producer')}>{producer}</div>
  </div>
);

export default () => {};
