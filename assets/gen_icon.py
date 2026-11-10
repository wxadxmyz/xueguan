#!/usr/bin/env python3
"""从 icon-book.svg 生成「学贯」主图标三尺寸（512/192/180）。
用法：python3 gen_icon.py
如需换底色/改形状，直接编辑 icon-book.svg 后重跑即可。
"""
import cairosvg
from PIL import Image

SRC = "icon-book.svg"
OUT = {"icon-512.png": 512, "icon-192.png": 192, "apple-touch-icon.png": 180}

for name, size in OUT.items():
    cairosvg.svg2png(url=SRC, write_to=name, output_width=size, output_height=size)
    print(f"generated {name} ({size}x{size})")
