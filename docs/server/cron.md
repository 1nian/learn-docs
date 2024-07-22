# NestJs模板（cron定时任务）

定时任务允许你按照指定的日期/时间、一定时间间隔或者一定时间后单次执行来调度(`scheduling`)任意代码（方法/函数）。在`Linux`世界中，这经常通过操作系统层面的`cron`包等执行。在`Node.js`应用中，有几个不同的包可以模拟 cron 包的功能。Nest 提供了`@nestjs/schedule`包，其集成了流行的 Node.js 的`node-cron`包

推荐每一个模块建立一个cron文件用于定时任务

如 后台管理 用户管理模块，需定时从其他服务拉取用户

在 `/src/cron-task`目录下建文件 `user-syn.cron.ts`

## 安装

```shell
$ yarn add @nestjs/schedule
```

## 使用

```typescript
//导入module
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
})
export class AppModule {}

//使用装饰器声明定时任务 CronExpression从@nestjs/schedule导出
import { Cron, CronExpression } from '@nestjs/schedule';
@Cron('45 * * * * *') 或  @Cron(CronExpression.EVERY_45_SECONDS)
//间隔装饰器-毫秒为单位
@Interval(10000)
//延时任务-毫秒为单位
@Timeout(5000)
//动态定时任务类 SchedulerRegistry 从 @nestjs/schedule导出
```

## 示例

### 普通定时任务示例

定时通过钉钉API拉取钉钉用户数据

文件目录以及名称 `/src/task-cron/dinguser.cron.ts`

```typescript
/**
* 定时从钉钉拉取用户数据
*/
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService implements OnApplicationBootstrap {
  private readonly logger = new Logger('钉钉相关-定时任务');

  /**
   * init任务 -服务启动或重启时会执行一次
   */
  onApplicationBootstrap() {
    //请求钉钉数据并写入数据库
    this.logger.debug('数据初始化完成');
  }
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCronEveryDayAtMidnight() {
    //每晚12点拉取钉钉数据并写入数据库
    this.logger.debug('每天晚上12点执行...', new Date());
  }
}
```

### 动态定时任务示例

此处以定时开启灯杆灯光为业务示例

文件目录以及名称 `/src/task-cron/pole.cron.ts`

```typescript
/**
 * 动态定时任务示例
 */
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob, CronTime } from 'cron';

@Injectable()
export class UnfixedCron implements OnApplicationBootstrap {
    //导入动态定时任务实例
    constructor(private schedulerRegistry: SchedulerRegistry) {}
    private readonly logger = new Logger('动态定时任务');
    /**
     * init任务 -服务启动或重启时会执行一次
     */
    onApplicationBootstrap() {
        //初始化时读取数据库中定时任务并调用创建定时任务动态加入到定时任务中
        this.logger.debug('数据初始化完成');
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCronEveryDayAtMidnight() {
        this.logger.debug('每天晚上12点执行...', new Date());
    }
    /**
     * 创建一个cron任务
     * @param name 定时任务名称
     * @param cronExpression cron表达式 示例： * * 8 * * *
     */
    createCronJob(name: string, cronExpression: string, cb: CronCommand) {
        const job = new CronJob(cronExpression, cb);
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
    }
    /**
     * 删除一个定时任务
     * @param name 定时任务名称
     */
    deleteCronJob(name: string) {
        this.schedulerRegistry.deleteCronJob(name);
    }
    /**
     * 更新一个定时任务执行时间
     * @param name 定时任务名称
     * @param cronTime 时间
     */
    updateCronJob(name: string, cronTime: CronTime) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.setTime(cronTime);
    }
    /**
     * 停止一个定时任务
     * @param name 定时任务名称
     */
    stopCronJob(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.stop();
    }
    /**
     * 重启一个定时任务
     * @param name 定时任务名称
     */
    restartCronJob(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.start();
    }
    /**
     * 获取一个定时任务上次执行的时间
     * @param name 定时任务名称
     * @returns
     */
    lastDateCronJob(name: string): Date {
        const job = this.schedulerRegistry.getCronJob(name);
        return job.lastDate();
    }
    /**
     * 获取一个定时任务下次执行的时间
     * @param name 定时任务名称
     * @returns
     */
    nextDateCronJob(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        return job.nextDate();
    }
}

```

