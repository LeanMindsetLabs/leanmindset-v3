from PIL import Image
from pathlib import Path
import collections

out = Path(r"D:\Ai-Workspace\LeanMindset-V3\assets\charts")

def summarize(name, hmin, hmax):
    im = Image.open(out / name).convert("RGB")
    hsv = im.convert("HSV")
    w, h = im.size
    xs, ys = [], []
    for y in range(h):
        for x in range(0, w, 2):
            H, S, V = hsv.getpixel((x, y))
            hn = H * 360 / 255
            if hmin <= hn <= hmax and S > 80 and V > 100:
                xs.append(x)
                ys.append(y)
    if not xs:
        print(name, "no hits", hmin, hmax)
        return
    print(name, f"hue {hmin}-{hmax}", "bbox", min(xs), min(ys), max(xs), max(ys),
          "w", max(xs)-min(xs), "h", max(ys)-min(ys), "img", w, h)

for n in ("chart-2.png", "chart-3.png"):
    print("---", n)
    summarize(n, 40, 70)   # yellow
    summarize(n, 190, 250) # blue
    summarize(n, 80, 160)  # green
    summarize(n, 160, 200) # periwinkle
    summarize(n, 160, 190) # cyan-ish
