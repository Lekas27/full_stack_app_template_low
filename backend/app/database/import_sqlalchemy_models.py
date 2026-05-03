from __future__ import annotations

import importlib
from pathlib import Path


def load_all_models(
    app_root: str | Path = "app",
    package: str = "app",
    models_name: str = "models",
) -> None:
    app_path = Path(app_root)

    for path in app_path.rglob("*"):
        if path.is_file() and path.name == f"{models_name}.py":
            rel_parts = path.relative_to(app_path).with_suffix("").parts
            importlib.import_module(".".join((package, *rel_parts)))
            continue

        if path.is_dir() and path.name == models_name:
            rel_parts = path.relative_to(app_path).parts
            base_module = ".".join((package, *rel_parts))
            for file in sorted(path.iterdir()):
                if file.suffix != ".py" or file.name == "__init__.py":
                    continue
                importlib.import_module(f"{base_module}.{file.stem}")
