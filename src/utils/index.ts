type Task = () => Promise<any>

/* 
  参考 https://www.douyin.com/user/MS4wLjABAAAAi2oukRVcHpgD-HbVdzsxE7tYykr91YuIKukR_X_Yy08EFWRQhRrECDF6FvbvT8Xa?modal_id=7207719586697907516
*/
export class Schedule {
  // 任务队列
  tasks: Task[]
  // 最大并发数
  parallelCount: number
  count = 0
  constructor(parallelCount = 4) {
    this.tasks = []
    this.parallelCount = parallelCount
  }

  run() {
    while(this.tasks.length && this.count < this.parallelCount) {
      this.count++
      const task = this.tasks.shift()!
      task()
        .then(() => {
          this.count--
          this.run()
        })
    }
  }
  add(task: Task) {
    this.tasks.push(task)
    this.run()
  }
}
