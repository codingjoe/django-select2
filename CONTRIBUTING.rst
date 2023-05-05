Contributing
============

Before you start editing the python code, you will need to make sure
you have binary dependencies installed::

    # Debian
    sudo apt install -y gettext graphviz google-chrome-stable
    # macOS
    brew install -y gettext graphviz google-chrome-stable

To install the package and its dependencies for development
including tests dependencies, please do:

    python -m pip install -e .[test]
    
You may ran the tests via::

    python -m pytest

Documentation pull requests welcome. The Sphinx documentation can be compiled via::

    python -m pip install -e .[docs]
    python -m sphinx -W -b doctest -b html docs docs/_build

Bug reports welcome, even more so if they include a correct patch.  Much
more so if you start your patch by adding a failing unit test, and correct
the code until zero unit tests fail.

The list of supported Django and Python version can be found in the CI suite setup.
Please make sure to verify that none of the linters or tests failed, before you submit
a patch for review.
