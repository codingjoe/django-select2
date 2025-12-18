Contributing
============

Before you start editing the python code, you will need to make sure
you have binary dependencies installed::

    # Debian
    sudo apt install -y gettext graphviz google-chrome-stable
    # macOS
    brew install -y gettext graphviz google-chrome-stable

You may ran the tests via::

    uv run pytest

Documentation pull requests welcome. The Sphinx documentation can be compiled via::

    uv run sphinx-build -b html docs docs/_build/html

Bug reports welcome, even more so if they include a correct patch.  Much
more so if you start your patch by adding a failing unit test, and correct
the code until zero unit tests fail.

The list of supported Django and Python version can be found in the CI suite setup.
Please make sure to verify that none of the linters or tests failed, before you submit
a patch for review.
