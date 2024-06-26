import * as React from 'react';

export const KubernetesControlLoopDiagram = ({...props}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    viewBox='-0.5 -0.5 702 338'
    {...props}
  >
    <path
      d='M317.3 254.78c-26.18-9.42-46.74-30.03-56.02-56.15a92.077 92.077 0 0 1 8.15-78.71l-9.09-8.04 51.51-15.87-11.92 52.25-8.28-8.44a64.047 64.047 0 0 0-1.82 50.6c6.38 16.4 19.22 29.49 35.55 36.22l-28.48 6.83Zm25.65 20.1-37.16-38.79 52.11-13.07-2.63 8.65c34.1-3.07 59.88-32.07 58.78-66.13l19.39 18.29 8.48-33.76c5.7 27.92-1.86 56.89-20.49 78.53s-46.24 33.52-74.84 32.21Zm88.07-101.1-38.99-36.57 12.12-3.22c-9.48-14.71-24.56-24.94-41.78-28.35a64.85 64.85 0 0 0-49.51 10.26l6.06-26.73-32.32 10.65c21.32-19.92 50.82-28.69 79.63-23.66 28.81 5.02 53.56 23.24 66.81 49.19l10.7-3.16Z'
      fill='#06c'
      pointerEvents='all'
    />
    <path
      fill='#9cf'
      stroke='#6c8ebf'
      pointerEvents='all'
      d='M0 128h180v90H0z'
    />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 178,
            height: 1,
            paddingTop: 173,
            marginLeft: 1
          }}
        >
          <div
            data-drawio-colors='color: #003366;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 17,
                fontFamily: 'Helvetica',
                color: '#036',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Desired State'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={90}
        y={178}
        fill='#036'
        fontFamily='Helvetica'
        fontSize={17}
        textAnchor='middle'
      >
        {'Desired State'}
      </text>
    </switch>
    <path
      d='M610 218v100q0 10-10 10H100q-10 0-10-10v-89.9'
      fill='none'
      stroke='#66b2ff'
      strokeWidth={3}
      strokeMiterlimit={10}
      pointerEvents='stroke'
    />
    <path
      d='m90 221.35 4.5 9-4.5-2.25-4.5 2.25Z'
      fill='#66b2ff'
      stroke='#66b2ff'
      strokeWidth={3}
      strokeMiterlimit={10}
      pointerEvents='all'
    />
    <path
      fill='#9cf'
      stroke='#6c8ebf'
      pointerEvents='all'
      d='M520 128h180v90H520z'
    />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 178,
            height: 1,
            paddingTop: 173,
            marginLeft: 521
          }}
        >
          <div
            data-drawio-colors='color: #003366;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 17,
                fontFamily: 'Helvetica',
                color: '#036',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Actual State'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={610}
        y={178}
        fill='#036'
        fontFamily='Helvetica'
        fontSize={17}
        textAnchor='middle'
      >
        {'Actual State'}
      </text>
    </switch>
    <path fill='none' pointerEvents='all' d='M360 78h60v30h-60z' />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 58,
            height: 1,
            paddingTop: 93,
            marginLeft: 361
          }}
        >
          <div
            data-drawio-colors='color: #FFFFFF;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 17,
                fontFamily: 'Helvetica',
                color: '#fff',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Observe/Watch'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={390}
        y={98}
        fill='#FFF'
        fontFamily='Helvetica'
        fontSize={17}
        textAnchor='middle'
      >
        {'Observe...'}
      </text>
    </switch>
    <path fill='none' pointerEvents='all' d='M380 198h60v30h-60z' />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 58,
            height: 1,
            paddingTop: 213,
            marginLeft: 381
          }}
        >
          <div
            data-drawio-colors='color: #FFFFFF;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 17,
                fontFamily: 'Helvetica',
                color: '#fff',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Analyze'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={410}
        y={218}
        fill='#FFF'
        fontFamily='Helvetica'
        fontSize={17}
        textAnchor='middle'
      >
        {'Analyze'}
      </text>
    </switch>
    <path fill='none' pointerEvents='all' d='M240 178h60v30h-60z' />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 58,
            height: 1,
            paddingTop: 193,
            marginLeft: 241
          }}
        >
          <div
            data-drawio-colors='color: #FFFFFF;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 17,
                fontFamily: 'Helvetica',
                color: '#fff',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Act/Reconcile'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={270}
        y={198}
        fill='#FFF'
        fontFamily='Helvetica'
        fontSize={17}
        textAnchor='middle'
      >
        {'Act/Rec...'}
      </text>
    </switch>
    <path
      d='M90 128V18q0-10 10-10h500q10 0 10 10v99.9'
      fill='none'
      stroke='#66b2ff'
      strokeWidth={3}
      strokeMiterlimit={10}
      pointerEvents='stroke'
    />
    <path
      d='m610 124.65-4.5-9 4.5 2.25 4.5-2.25Z'
      fill='#66b2ff'
      stroke='#66b2ff'
      strokeWidth={3}
      strokeMiterlimit={10}
      pointerEvents='all'
    />
    <path fill='none' pointerEvents='all' d='M269.8 31h160v30h-160z' />
    <switch transform='translate(-.5 -.5)'>
      <foreignObject
        pointerEvents='none'
        width='100%'
        height='100%'
        requiredFeatures='http://www.w3.org/TR/SVG11/feature#Extensibility'
        style={{
          overflow: 'visible',
          textAlign: 'left'
        }}
      >
        <div
          xmlns='http://www.w3.org/1999/xhtml'
          style={{
            display: 'flex',
            alignItems: 'unsafe center',
            justifyContent: 'unsafe center',
            width: 158,
            height: 1,
            paddingTop: 46,
            marginLeft: 271
          }}
        >
          <div
            data-drawio-colors='color: #FFFFFF;'
            style={{
              boxSizing: 'border-box',
              fontSize: 0,
              textAlign: 'center'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: 20,
                fontFamily: 'Helvetica',
                color: '#fff',
                lineHeight: 1.2,
                pointerEvents: 'all',
                whiteSpace: 'normal',
                overflowWrap: 'normal'
              }}
            >
              {'Control Loop'}
            </div>
          </div>
        </div>
      </foreignObject>
      <text
        x={350}
        y={52}
        fill='#FFF'
        fontFamily='Helvetica'
        fontSize={20}
        textAnchor='middle'
      >
        {'Control Loop'}
      </text>
    </switch>
  </svg>
);
