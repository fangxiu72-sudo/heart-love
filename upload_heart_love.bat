@echo off
:: =======================================
:: 一键上传本地项目到 GitHub 并打开 GitHub Pages
:: 适合新仓库，远程内容会被覆盖
:: =======================================

:: --- 配置区 ---
set GITHUB_USERNAME=fangxiu72-sudo
set GITHUB_EMAIL=fangxiu72@gmail.com
set REPO_NAME=heart-love
set PROJECT_PATH=C:\Users\Administrator\Desktop\three-heart-love
:: =======================================

echo 切换到项目目录...
cd /d "%PROJECT_PATH%"

echo 删除旧的 Git 仓库（如果存在）...
rd /s /q .git

echo 初始化新的 Git 仓库...
git init

echo 配置 Git 用户信息...
git config user.name "%GITHUB_USERNAME%"
git config user.email "%GITHUB_EMAIL%"

echo 添加所有文件到 Git...
git add .

echo 提交文件...
git commit -m "Add website files"

echo 创建主分支 main...
git branch -M main

echo 添加远程仓库...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo 强制推送到 GitHub main 分支（覆盖远程内容）...
git push -f origin main

echo.
echo ===========================
echo ✅ 上传完成！
echo 访问仓库网页：
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
set PAGE_URL=https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo GitHub Pages 网页链接: %PAGE_URL%
echo 注意：第一次访问可能需要几分钟刷新网页
echo ===========================
echo.

:: 自动打开网页链接
echo 正在尝试在默认浏览器中打开网页...
start "" "%PAGE_URL%"

pause
