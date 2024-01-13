import { it, expect, describe } from 'vitest'

import React from '../../v1/React.js'

describe('text createElement', ()=>{
  it('return dom structure', ()=>{
    const structure = React.createElement('div', { id: 'app' }, '测试')

    expect(structure).toEqual({
      type: 'div',
      props: {
        id: 'app',
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: '测试',
              children:[]
            }
          }
        ]
      }
    })

  })
})
