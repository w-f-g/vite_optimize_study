import { Spin } from "antd";

export function Loading() {
  return (
    <div className="flex-center" style={{height: "100%"}}>
      <Spin />
    </div>
  )
}