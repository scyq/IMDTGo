# IMDT Go


## 重启这个服务
cd /home/scyq/morethanchat/
sudo pm2 delete all
sudo npm run build
待build完成后，ctrl c取消运行，然后执行：
sudo pm2 start npm --name morethanchat -- run start