#!/usr/bin/env python

from __future__ import annotations

import sys
from argparse import ArgumentParser
from typing import Any, ClassVar


class BaseCommand:
    name: ClassVar[str]
    description: ClassVar[str] = ""

    def add_arguments(self, parser: ArgumentParser) -> None:
        pass

    def handle(self, *args: Any, **kwargs: Any) -> None:
        raise NotImplementedError("subclasses of BaseCommand must provide a handle() method")


class CommandRunner:
    commands: list[type[BaseCommand]]
    description: str

    def __init__(self, commands: list[type[BaseCommand]], description: str):
        self.commands = commands
        self.description = description

    def execute(self, args: list[str]) -> None:
        parser = ArgumentParser(description=self.description)
        subparsers = parser.add_subparsers(dest="command", help="Command to run", required=True)
        for command_class in self.commands:
            command_name = getattr(command_class, "name", command_class.__name__.lower())
            subparser = subparsers.add_parser(command_name, description=command_class.description)
            command = command_class()
            command.add_arguments(subparser)
            subparser.set_defaults(func=command.handle)

        parsed_args = parser.parse_args(args)
        subcommand_args = vars(parsed_args).copy()
        subcommand_args.pop("command", None)
        subcommand_args.pop("func", None)
        parsed_args.func(**subcommand_args)


class RunServer(BaseCommand):
    name = "runserver"
    description = "run dev server"

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument("-p", "--port", dest="port", type=int, default=8000)
        parser.add_argument("-H", "--host", dest="host", type=str, default="127.0.0.1")

    def handle(self, port: int, host: str) -> None:
        import uvicorn

        uvicorn.run("app.main:app", reload=True, port=port, host=host)


class Test(BaseCommand):
    name = "test"
    description = "run tests"

    def handle(self) -> None:
        import pytest

        pytest.main(["tests"])


class Typecheck(BaseCommand):
    name = "typecheck"
    description = "typecheck project"

    def handle(self) -> None:
        from mypy.api import run as run_mypy

        run_mypy(["."])


def main(args: list[str]) -> None:
    CommandRunner(
        commands=[RunServer, Test, Typecheck],
        description="Management commands",
    ).execute(args)


def poetry_start() -> None:
    main(["runserver", *sys.argv[1:]])


def poetry_test() -> None:
    main(["test", *sys.argv[1:]])


def poetry_typecheck() -> None:
    main(["typecheck", *sys.argv[1:]])


if __name__ == "__main__":
    main(sys.argv[1:])
