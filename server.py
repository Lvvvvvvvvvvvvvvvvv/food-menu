#!/usr/bin/env python3
"""
点菜小助手 - 本地服务器
运行后在同一 WiFi 下的手机访问显示的地址即可
"""

import http.server
import socketserver
import socket
import os

PORT = 8888

# 切换到脚本所在目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 创建服务器
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
})

# 获取本机 IP
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print("\n" + "="*50)
    print("  🍽️  点菜小助手 - 服务器已启动")
    print("="*50)
    print(f"\n  📱 请在手机浏览器打开:")
    print(f"     http://{local_ip}:{PORT}")
    print(f"\n  🖥️  或在本机打开:")
    print(f"     http://localhost:{PORT}")
    print(f"\n  ⚙️  管理后台(添加菜品):")
    print(f"     http://{local_ip}:{PORT}/admin.html")
    print("\n" + "="*50)
    print("  按 Ctrl+C 停止服务器")
    print("="*50 + "\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n服务器已停止")
