#!/usr/bin/env python3
"""Generate all DB/data formats for the AOV translation only.

Mirrors scripts/generate_all_versions.py but scoped to ('af', 'AOV'), so we don't rebuild
the repo's other ~140 translations. Reuses the repo's generator classes UNCHANGED for the
verse formats, then runs the additive footnote generator.

Run AFTER build_aov_source.py has refreshed sources/af/AOV/AOV.json.
"""

import os
import sys

TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(os.path.dirname(TOOLS_DIR))
sys.path.insert(0, REPO_DIR)    # so `import generators...` resolves
sys.path.insert(0, TOOLS_DIR)   # so `import footnotes_generator` resolves

from generators.sqlite.sqlite_generator import SQLiteGenerator
from generators.json.json_generator import JSONGenerator
from generators.text.csv_generator import CSVGenerator
from generators.text.plaintext_generator import TextGenerator
from generators.text.markdown_generator import MDGenerator

# Some repo generators import optional third-party deps at module load (pymysql for the SQL
# dump, PyYAML for YAML). They aren't needed for the database/API (sqlite/json/csv are). Skip
# any that aren't installed instead of failing the whole build.
try:
    from generators.sql.mysql_generator import MySQLGenerator
except ImportError:
    MySQLGenerator = None
try:
    from generators.text.yaml_generator import YAMLGenerator
except ImportError:
    YAMLGenerator = None

import footnotes_generator

LANGUAGE = "af"
TRANSLATION = "AOV"


def main():
    source_dir = os.path.join(REPO_DIR, "sources")
    format_dir = os.path.join(REPO_DIR, "formats")
    for fmt in ("sql", "sqlite", "csv", "txt", "json", "yaml", "md"):
        os.makedirs(os.path.join(format_dir, fmt), exist_ok=True)

    # SQLite generator INSERTs into IF-NOT-EXISTS tables; remove any prior db so re-runs
    # don't duplicate rows. (The other generators open their output files with 'w'.)
    db_path = os.path.join(format_dir, "sqlite", f"{TRANSLATION}.db")
    if os.path.exists(db_path):
        os.remove(db_path)

    generators = [
        SQLiteGenerator(source_dir, format_dir),   # -> formats/sqlite/AOV.db
        CSVGenerator(source_dir, format_dir),
        TextGenerator(source_dir, format_dir),
        JSONGenerator(source_dir, format_dir),
        MDGenerator(source_dir, format_dir),
    ]
    if MySQLGenerator is not None:
        generators.insert(0, MySQLGenerator(source_dir, format_dir))  # -> formats/sql/AOV.sql
    else:
        print("Skipping SQL dump (pymysql not installed).")
    if YAMLGenerator is not None:
        generators.append(YAMLGenerator(source_dir, format_dir))      # -> formats/yaml/AOV.yaml
    else:
        print("Skipping YAML (PyYAML not installed).")
    for gen in generators:
        gen.generate(LANGUAGE, TRANSLATION)

    # additive footnotes (AOV_footnotes table + json/csv sidecars)
    footnotes_generator.generate()

    print("AOV formats generated.")


if __name__ == "__main__":
    main()
