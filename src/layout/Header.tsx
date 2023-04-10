import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-centent: flex-between;
  align-items: center;
  padding: 0 20px;
  z-index: 999;
`

export default function Header() {
  return (
    <HeaderWrapper>
      <div>vite性能优化学习 Demo</div>
    </HeaderWrapper>
  )
}
