import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'
import cn from 'classnames'

type ObserverProps = {
  children?: ReactNode,
  className?: string,
  style?: CSSProperties,
  placeholder?: ReactNode,
  options?: IntersectionObserverInit,
  once?: boolean,
  visibleOnce?: () => void,
  visible?: (flag: boolean) => void,
  [key: string]: any,
}

/**
 * 基于 IntersectionObserver 实现的 Observer组件，可以用于实现懒加载功能，如：图片、图表等资源的懒加载。
 * visibleOnce 事件用于监听第一次出现在可视区域的时候，
 * visible 事件用于监听可视状态的改变，前提是 once 设置为 false，
 * placeholder 表示还未出现在可视区域时候的占位元素，如 loading、骨架屏 之类的
 */
export default function Observer(props: ObserverProps) {
  const {
    children,
    style,
    className,
    placeholder,
    options = {},
    once = true,
    visible,
    visibleOnce,
    ...rest
  } = props

  const [isVisible, setIsVisible] = useState(false)
  const obsNode = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let obs = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && !isVisible) {
        setIsVisible(true)
        visibleOnce && visibleOnce()
        if (once) {
          _disconnect()
        }
      }
      visible && visible(target.isIntersecting)
    }, Object.assign({
      threshold: 0.2,
      rootMargin: "0px 17px 0px 0px",
    }, options))
    if (obsNode.current) {
      obs.observe(obsNode.current)
    }
    const _disconnect = () => {
      obs?.disconnect()
      obs = null!
    }
    return () => {
        _disconnect()
    }
  }, [])
  return (
    <div
      {...rest}
      style={style}
      ref={obsNode}
      className={cn(['observer__view', className])}
    >
      {
        isVisible
          ? children
          : placeholder
            || (
              <div>loading...</div>
            )
      }
    </div>
  )
}
