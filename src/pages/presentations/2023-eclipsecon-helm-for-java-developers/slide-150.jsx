import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023, JKubeLogo} from '../../../components';

const Link = ({href, icon, children}) =>
  <a href={href} style={{textDecoration: 'none', color: '#AAA'}}><i className={icon} /> {children}</a>

const Slide150 = () => (
  <EclipseCon2023.TitleTemplate titleBandVisible={false}>
    <h2 style={{fontSize: '8rem', margin: '0 0 4rem', padding: 0, color: '#FAFAFA'}}>Q&A</h2>
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '3rem'}}>
      <Link href='https://github.com/eclipse/jkube' icon='fab fa-github' >github.com/eclipse/jkube</Link>
      <Link href='https://twitter.com/jkubeio' icon='fab fa-twitter'> @jkubeio</Link>
      <Link href='https://www.eclipse.org/jkube' icon='fas fa-home'> www.eclipse.org/jkube</Link>
      <JKubeLogo style={{height: '10rem'}} iconColor='#2285f7' textColor='white' />
    </div>
    <div style={{alignSelf: 'start', padding: '2rem 0 0 1rem', fontSize: '1.5rem'}}>
      <Link href={`https://presentations.marcnuri.com/presentations/${EclipseCon2023.SLUG}/`}>
        https://presentations.marcnuri.com/presentations/{EclipseCon2023.SLUG}
      </Link>
    </div>
  </EclipseCon2023.TitleTemplate>
);

export default slideControls(Slide150,
  `/presentations/${EclipseCon2023.SLUG}/slide-140`,
  `/presentations/${EclipseCon2023.SLUG}/`);
