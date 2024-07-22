
当使用 mongodb-linux-x86_64-rhel70-7.0.4.tgz 文件安装 MongoDB 在 CentOS 上时，请按照以下步骤操作：

下载和解压 MongoDB：
假设您已经有 mongodb-linux-x86_64-rhel70-7.0.4.tgz 文件，请下载并解压到您选择的目录。例如：

```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-7.0.4.tgz

________________________________________________

tar -zxvf mongodb-linux-x86_64-rhel70-7.0.4.tgz
```

将 MongoDB 移至系统目录：
最好将 MongoDB 的二进制文件移动到系统目录。例如，将其移动到 /opt：

```
sudo mv mongodb-linux-x86_64-rhel70-7.0.4 /opt/mongodb
```

创建数据目录：
创建一个目录来存储 MongoDB 数据：

```
sudo mkdir -p /var/lib/mongo
```

创建配置文件：
创建 MongoDB 配置文件，例如在 /etc/mongod.conf：

```
sudo nano /etc/mongod.conf
```
添加以下内容：

```
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
storage:
   dbPath: "/var/lib/mongo"
```
创建 Systemd 服务文件：
在 /etc/systemd/system/mongod.service 创建 MongoDB 的 Systemd 服务文件：

```
sudo nano /etc/systemd/system/mongod.service
```

添加以下内容：

```
[Unit]
Description=MongoDB Database Server
After=network.target

[Service]
ExecStart=/opt/mongodb/bin/mongod --config /etc/mongod.conf
Restart=always
User=root
Group=root
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=mongodb

[Install]
WantedBy=multi-user.target
```
启动和启用 MongoDB 服务：
启动 MongoDB 服务并设置开机自启动：

```
sudo systemctl start mongod
sudo systemctl enable mongod
```

检查 MongoDB 状态：
验证 MongoDB 是否在没有错误的情况下运行：

```
sudo systemctl status mongod
```
现在，MongoDB 应该已经成功安装并在您的 CentOS 系统上运行，使用提供的二进制文件。根据您的具体设置调整路径和配置。如果遇到任何问题，请查看 /var/log/mongodb/mongod.log 中的 MongoDB 日志以获取更多信息