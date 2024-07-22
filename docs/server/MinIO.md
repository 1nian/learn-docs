### 1.安装基本工具（可跳过）
```
yum install -y wget vim
```

### 2.创建目录
```
mkdir /opt/minio
_______________________________________________________________________________
mkdir /opt/minio/data
```

### 3.进入目录，下载minio
```
cd /opt/minio
_______________________________________________________________________________
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```

### 4.赋予执行权限
```
chmod +x minio
```

### 5.防火墙设置
#### 5.1 开放端口，重启防火墙
```
firewall-cmd --zone=public --add-port=9000/tcp --permanent
_______________________________________________________________________________
systemctl restart firewalld
```

#### 5.2 关闭防火墙
```
systemctl stop firewalld
```

### 6.启动minio
#### 6.1 直接启动
``` 
/opt/minio/minio server /opt/minio/data/
```

#### 6.2 后台启动
```
nohup /opt/minio/minio server /opt/minio/data/
```

#### 6.3 自定义端口启动
```
nohup /opt/minio/minio server ip:指定端口  /opt/minio/data/
```