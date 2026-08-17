from PIL import Image
from pathlib import Path

out = Path(r"D:\Ai-Workspace\LeanMindset-V3\assets\charts")

im2 = Image.open(out / "src-2.png").convert("RGB")
# Chart band below OVERVIEW tabs, only the black app width
im2.crop((21, 124, 492, 282)).save(out / "chart-2.png")

im3 = Image.open(out / "src-3.png").convert("RGB")
im3.crop((8, 0, 366, 205)).save(out / "chart-3.png")

for name in ("chart-2.png", "chart-3.png"):
    im = Image.open(out / name)
    print(name, im.size)
