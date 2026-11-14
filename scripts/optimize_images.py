from PIL import Image
import os

images_to_optimize = [
    ('public/assets/campus/cse_lab.jpg', (1920, 1080), 85),
    ('public/assets/campus/canteen.jpg', (1920, 1080), 85),
    ('public/assets/campus/auditorium.jpg', (1920, 1080), 85)
]

for path, max_res, quality in images_to_optimize:
    if os.path.exists(path):
        old_size = os.path.getsize(path) / (1024 * 1024)
        with Image.open(path) as img:
            img = img.convert('RGB')
            # resize if larger than max_res while maintaining aspect ratio
            img.thumbnail(max_res, Image.Resampling.LANCZOS)
            img.save(path, 'JPEG', quality=quality, optimize=True)
        new_size = os.path.getsize(path) / (1024 * 1024)
        print(f"Optimized {path}: {old_size:.2f} MB -> {new_size:.2f} MB")
