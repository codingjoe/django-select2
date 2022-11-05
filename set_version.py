#!/usr/bin/env python3
"""Set the version in NPM's package.json to match the git tag."""
import json

from setuptools_scm import get_version

if __name__ == "__main__":
    with open("package.json", "r+") as f:
        data = json.load(f)
        f.seek(0)
        data["version"] = get_version(root=".", relative_to=__file__)
        json.dump(data, f)
        f.truncate()
